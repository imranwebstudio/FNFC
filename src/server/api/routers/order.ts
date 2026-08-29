import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { formatInTimeZone } from "date-fns-tz";

import {
  dayArchiveAt,
  dhakaDateOnly,
  getOrderWindow,
  normalizeCutoffTime,
} from "~/lib/datetime";
import {
  adminProcedure,
  assertLocationAccess,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        dailyMenuId: z.string().cuid(),
        note: z.string().max(300).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });
      if (!user?.profileComplete || !user.locationId) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Complete your profile first",
        });
      }

      const menu = await ctx.db.dailyMenu.findUnique({
        where: { id: input.dailyMenuId },
        include: { location: true },
      });
      if (!menu?.isPublished) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Menu not found" });
      }
      if (menu.locationId !== user.locationId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Menu is for another location",
        });
      }

      if (menu.slot === "DINNER" && !menu.location.dinnerEnabled) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Dinner is not offered at your office right now",
        });
      }

      const cutoffTime = normalizeCutoffTime(menu.location.defaultCutoffTime);
      const window = getOrderWindow(new Date(), cutoffTime);
      const menuDate = formatInTimeZone(menu.date, "UTC", "yyyy-MM-dd");
      if (menuDate !== window.orderDate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: window.rolledOver
            ? `Today's lunch closed at ${cutoffTime}. You can only order for tomorrow now.`
            : "This menu is not available for ordering right now",
        });
      }

      const cutoff =
        menu.cutoffAt ?? dayArchiveAt(menuDate, cutoffTime);
      if (new Date() > cutoff) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Ordering closed at ${cutoffTime} (Asia/Dhaka)`,
        });
      }

      const existing = await ctx.db.order.findFirst({
        where: {
          userId: user.id,
          status: { not: "CANCELLED" },
          dailyMenu: {
            locationId: menu.locationId,
            date: menu.date,
            slot: menu.slot,
          },
        },
      });
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message:
            existing.dailyMenuId === menu.id
              ? "You already ordered this meal"
              : `You already ordered a ${menu.slot.toLowerCase()} for this day — cancel it first to switch`,
        });
      }

      return ctx.db.$transaction(async (tx) => {
        if (user.paymentMode === "WALLET") {
          const updated = await tx.user.update({
            where: { id: user.id },
            data: { balance: { decrement: menu.price } },
          });
          const order = await tx.order.create({
            data: {
              userId: user.id,
              dailyMenuId: menu.id,
              locationId: menu.locationId,
              amount: menu.price,
              note: input.note,
              status: "PLACED",
              paymentStatus: "WALLET_CHARGED",
            },
          });
          await tx.walletTransaction.create({
            data: {
              userId: user.id,
              type: "CHARGE",
              amount: -menu.price,
              balanceAfter: updated.balance,
              orderId: order.id,
              note: `Order: ${menu.title}`,
            },
          });
          return order;
        }

        return tx.order.create({
          data: {
            userId: user.id,
            dailyMenuId: menu.id,
            locationId: menu.locationId,
            amount: menu.price,
            note: input.note,
            status: "PLACED",
            paymentStatus: "UNPAID",
          },
        });
      });
    }),

  cancel: protectedProcedure
    .input(z.object({ orderId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.orderId },
        include: { dailyMenu: { include: { location: true } } },
      });
      if (!order || order.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (order.status !== "PLACED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only placed orders can be cancelled",
        });
      }

      const menuDate = formatInTimeZone(order.dailyMenu.date, "UTC", "yyyy-MM-dd");
      const cutoffTime = normalizeCutoffTime(
        order.dailyMenu.location.defaultCutoffTime,
      );
      const cutoff =
        order.dailyMenu.cutoffAt ?? dayArchiveAt(menuDate, cutoffTime);
      if (new Date() > cutoff) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot cancel after cutoff",
        });
      }

      return ctx.db.$transaction(async (tx) => {
        if (order.paymentStatus === "WALLET_CHARGED") {
          const updated = await tx.user.update({
            where: { id: order.userId },
            data: { balance: { increment: order.amount } },
          });
          await tx.walletTransaction.create({
            data: {
              userId: order.userId,
              type: "ADJUSTMENT",
              amount: order.amount,
              balanceAfter: updated.balance,
              orderId: order.id,
              note: "Order cancelled — refund to wallet",
            },
          });
        }
        return tx.order.update({
          where: { id: order.id },
          data: {
            status: "CANCELLED",
            paymentStatus:
              order.paymentStatus === "WALLET_CHARGED"
                ? "WALLET_CHARGED"
                : order.paymentStatus,
          },
        });
      });
    }),

  listMine: protectedProcedure
    .input(z.object({ limit: z.number().int().min(1).max(50).default(20) }).optional())
    .query(({ ctx, input }) =>
      ctx.db.order.findMany({
        where: { userId: ctx.session.user.id },
        include: {
          dailyMenu: true,
          location: true,
        },
        orderBy: { createdAt: "desc" },
        take: input?.limit ?? 20,
      }),
    ),

  listForAdmin: adminProcedure
    .input(
      z.object({
        locationId: z.string().cuid().optional(),
        dailyMenuId: z.string().cuid().optional(),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let locationFilter: { locationId?: string | { in: string[] } } = {};

      if (input.locationId) {
        await assertLocationAccess(
          ctx.db,
          ctx.session.user.id,
          ctx.session.user.role,
          input.locationId,
        );
        locationFilter = { locationId: input.locationId };
      } else if (ctx.session.user.role !== "SUPER_ADMIN") {
        const links = await ctx.db.adminLocation.findMany({
          where: { userId: ctx.session.user.id },
          select: { locationId: true },
        });
        const ids = links.map((l) => l.locationId);
        if (ids.length === 0) return [];
        locationFilter = { locationId: { in: ids } };
      }

      return ctx.db.order.findMany({
        where: {
          ...locationFilter,
          status: { not: "CANCELLED" },
          ...(input.dailyMenuId
            ? { dailyMenuId: input.dailyMenuId }
            : input.date
              ? {
                  dailyMenu: {
                    date: dhakaDateOnly(input.date),
                  },
                }
              : {}),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              employeeId: true,
              deskNumber: true,
              buildingNumber: true,
              floorNumber: true,
              paymentMode: true,
              balance: true,
            },
          },
          dailyMenu: true,
          location: { select: { id: true, name: true } },
        },
        orderBy: [
          { location: { name: "asc" } },
          { user: { floorNumber: "asc" } },
          { user: { deskNumber: "asc" } },
        ],
      });
    }),

  markDelivered: adminProcedure
    .input(z.object({ orderId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.orderId },
      });
      if (!order) throw new TRPCError({ code: "NOT_FOUND" });

      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        order.locationId,
      );

      if (order.status === "CANCELLED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Order is cancelled",
        });
      }

      return ctx.db.order.update({
        where: { id: order.id },
        data: {
          status: "DELIVERED",
          deliveredAt: new Date(),
        },
      });
    }),

  confirmCashPayment: adminProcedure
    .input(z.object({ orderId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.orderId },
      });
      if (!order) throw new TRPCError({ code: "NOT_FOUND" });

      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        order.locationId,
      );

      if (order.paymentStatus !== "UNPAID") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Order is not unpaid cash",
        });
      }

      return ctx.db.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: "PAID",
          paidAt: new Date(),
        },
      });
    }),
});
