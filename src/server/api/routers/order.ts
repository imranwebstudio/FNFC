import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { formatInTimeZone } from "date-fns-tz";

import {
  dayArchiveAt,
  dhakaDateOnly,
  getOrderWindow,
  normalizeCutoffTime,
  todayDateString,
} from "~/lib/datetime";
import {
  adminProcedure,
  assertLocationAccess,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  chargeWalletForOrder,
  shouldChargeWallet,
} from "~/server/order-payment";
import { deleteOrderRecord } from "~/server/delete-order";

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
        if (shouldChargeWallet(user)) {
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
          await chargeWalletForOrder(tx, {
            userId: user.id,
            amount: menu.price,
            orderId: order.id,
            note: `Order: ${menu.title}`,
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

  /** Admin places an order for a member (e.g. phone request). Bypasses cutoff. */
  createForUser: adminProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        dailyMenuId: z.string().cuid(),
        note: z.string().max(300).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const target = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });
      if (!target?.profileComplete || !target.locationId) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Member must complete their profile first",
        });
      }

      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        target.locationId,
      );

      const menu = await ctx.db.dailyMenu.findUnique({
        where: { id: input.dailyMenuId },
        include: { location: true },
      });
      if (!menu?.isPublished) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Menu not found" });
      }
      if (menu.locationId !== target.locationId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Meal is not for this member's office",
        });
      }

      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        menu.locationId,
      );

      if (menu.slot === "DINNER" && !menu.location.dinnerEnabled) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Dinner is not offered at this office right now",
        });
      }

      const menuDate = formatInTimeZone(menu.date, "UTC", "yyyy-MM-dd");
      if (menuDate < todayDateString()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot place admin orders for past meal days",
        });
      }

      const existing = await ctx.db.order.findFirst({
        where: {
          userId: target.id,
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
              ? "Member already ordered this meal"
              : `Member already ordered a ${menu.slot.toLowerCase()} for this day`,
        });
      }

      const placedById = ctx.session.user.id;
      const note =
        input.note?.trim() ||
        undefined;

      return ctx.db.$transaction(async (tx) => {
        if (shouldChargeWallet(target)) {
          const order = await tx.order.create({
            data: {
              userId: target.id,
              dailyMenuId: menu.id,
              locationId: menu.locationId,
              amount: menu.price,
              note,
              status: "PLACED",
              paymentStatus: "WALLET_CHARGED",
              placedById,
            },
          });
          await chargeWalletForOrder(tx, {
            userId: target.id,
            amount: menu.price,
            orderId: order.id,
            createdById: placedById,
            note: `Admin order: ${menu.title}`,
          });
          return order;
        }

        return tx.order.create({
          data: {
            userId: target.id,
            dailyMenuId: menu.id,
            locationId: menu.locationId,
            amount: menu.price,
            note,
            status: "PLACED",
            paymentStatus: "UNPAID",
            placedById,
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
          placedBy: {
            select: { id: true, name: true, email: true },
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
        include: { user: true, dailyMenu: true },
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

      return ctx.db.$transaction(async (tx) => {
        if (shouldChargeWallet(order.user)) {
          await chargeWalletForOrder(tx, {
            userId: order.userId,
            amount: order.amount,
            orderId: order.id,
            createdById: ctx.session.user.id,
            note: `Order: ${order.dailyMenu.title}`,
          });
          return tx.order.update({
            where: { id: order.id },
            data: { paymentStatus: "WALLET_CHARGED" },
          });
        }

        return tx.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: "PAID",
            paidAt: new Date(),
          },
        });
      });
    }),

  /** Fix cash-paid orders that should have deducted prepaid balance. */
  repairWalletCharge: adminProcedure
    .input(z.object({ orderId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.orderId },
        include: { user: true, dailyMenu: true },
      });
      if (!order) throw new TRPCError({ code: "NOT_FOUND" });

      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        order.locationId,
      );

      if (order.paymentStatus !== "PAID") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only cash-paid orders can be repaired",
        });
      }

      const existingCharge = await ctx.db.walletTransaction.findFirst({
        where: { orderId: order.id, type: "CHARGE" },
      });
      if (existingCharge) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Order already has a wallet charge",
        });
      }

      return ctx.db.$transaction(async (tx) => {
        await chargeWalletForOrder(tx, {
          userId: order.userId,
          amount: order.amount,
          orderId: order.id,
          createdById: ctx.session.user.id,
          note: `Order: ${order.dailyMenu.title}`,
        });
        return tx.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: "WALLET_CHARGED",
            paidAt: null,
          },
        });
      });
    }),

  deleteByAdmin: adminProcedure
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

      await ctx.db.$transaction(async (tx) => {
        await deleteOrderRecord(tx, order);
      });

      return { ok: true };
    }),

  deleteUserHistory: adminProcedure
    .input(z.object({ userId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const target = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });
      if (!target) throw new TRPCError({ code: "NOT_FOUND" });

      if (ctx.session.user.role !== "SUPER_ADMIN") {
        if (!target.locationId) {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        await assertLocationAccess(
          ctx.db,
          ctx.session.user.id,
          ctx.session.user.role,
          target.locationId,
        );
      }

      const orders = await ctx.db.order.findMany({
        where: { userId: input.userId },
      });

      if (orders.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No orders to delete",
        });
      }

      await ctx.db.$transaction(async (tx) => {
        for (const order of orders) {
          await deleteOrderRecord(tx, order);
        }
      });

      return { deleted: orders.length };
    }),
});
