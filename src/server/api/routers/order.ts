import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { formatInTimeZone } from "date-fns-tz";

import {
  dhakaDateOnly,
  latestBrowseDate,
  locationCutoffForSlot,
  orderableDateForSlot,
  slotCutoffAt,
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
  isOneTimeCustomer,
  isRegularCustomer,
} from "~/server/order-payment";
import { deleteOrderRecord } from "~/server/delete-order";
import { orderQuantitySchema } from "~/lib/order-quantity";
import { assertNotDayOff } from "~/server/api/routers/service";

const quantityInput = z
  .number()
  .int()
  .min(orderQuantitySchema.min)
  .max(orderQuantitySchema.max)
  .default(1);

export const orderRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        dailyMenuId: z.string().cuid(),
        quantity: quantityInput,
        note: z.string().max(300).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });
      if (!user?.profileComplete) {
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
      // Assigned zone → only that zone's menus. Unassigned → any office.
      if (user.locationId && menu.locationId !== user.locationId) {
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

      const cutoffTime = locationCutoffForSlot(menu.location, menu.slot);
      const earliest = orderableDateForSlot(new Date(), {
        defaultCutoffTime: menu.location.defaultCutoffTime,
        dinnerCutoffTime: menu.location.dinnerCutoffTime,
        dinnerEnabled: menu.location.dinnerEnabled,
        slot: menu.slot,
      });
      const menuDate = formatInTimeZone(menu.date, "UTC", "yyyy-MM-dd");
      await assertNotDayOff(ctx.db, menuDate);
      if (menuDate < earliest) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `This ${menu.slot.toLowerCase()} is closed (cutoff ${cutoffTime}). Pick a later day.`,
        });
      }
      if (menuDate > latestBrowseDate()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "That date is too far ahead to order",
        });
      }

      const cutoff = slotCutoffAt(menuDate, menu.slot, menu.location);
      if (new Date() > cutoff) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Ordering closed at ${cutoffTime} (Asia/Dhaka)`,
        });
      }

      const existing = await ctx.db.order.findFirst({
        where: {
          userId: user.id,
          dailyMenuId: menu.id,
          status: { not: "CANCELLED" },
        },
      });
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "You already ordered this meal",
        });
      }

      const totalAmount = menu.price * input.quantity;

      return ctx.db.order.create({
        data: {
          userId: user.id,
          dailyMenuId: menu.id,
          locationId: menu.locationId,
          quantity: input.quantity,
          amount: totalAmount,
          note: input.note,
          status: "PLACED",
          paymentStatus: "UNPAID",
        },
      });
    }),

  /** Admin places an order for a member (e.g. phone request). Bypasses cutoff. */
  createForUser: adminProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        dailyMenuId: z.string().cuid(),
        quantity: quantityInput,
        note: z.string().max(300).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const target = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });
      if (!target?.profileComplete) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Member must complete their profile first",
        });
      }

      const menu = await ctx.db.dailyMenu.findUnique({
        where: { id: input.dailyMenuId },
        include: { location: true },
      });
      if (!menu?.isPublished) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Menu not found" });
      }

      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        menu.locationId,
      );

      if (target.locationId && menu.locationId !== target.locationId) {
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
      await assertNotDayOff(ctx.db, menuDate);
      if (menuDate < todayDateString()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot place admin orders for past meal days",
        });
      }

      const existing = await ctx.db.order.findFirst({
        where: {
          userId: target.id,
          dailyMenuId: menu.id,
          status: { not: "CANCELLED" },
        },
      });
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Member already ordered this meal",
        });
      }

      const placedById = ctx.session.user.id;
      const note = input.note?.trim() || undefined;
      const totalAmount = menu.price * input.quantity;

      return ctx.db.order.create({
        data: {
          userId: target.id,
          dailyMenuId: menu.id,
          locationId: menu.locationId,
          quantity: input.quantity,
          amount: totalAmount,
          note,
          status: "PLACED",
          paymentStatus: "UNPAID",
          placedById,
        },
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
      const cutoff = slotCutoffAt(
        menuDate,
        order.dailyMenu.slot,
        order.dailyMenu.location,
      );
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
              customerType: true,
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

  /**
   * Swap an unpaid order (or part of its quantity) to another published meal
   * same office + day. Recalculates amount from the new unit price.
   * Partial swaps split the order so each meal can differ.
   */
  changeMeal: adminProcedure
    .input(
      z.object({
        orderId: z.string().cuid(),
        dailyMenuId: z.string().cuid(),
        /** How many units to move; defaults to the full order quantity */
        quantity: z
          .number()
          .int()
          .min(1)
          .max(orderQuantitySchema.max)
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.orderId },
        include: { dailyMenu: true },
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
          message: "Cancelled orders cannot be changed",
        });
      }

      if (
        order.paymentStatus === "PAID" ||
        order.paymentStatus === "WALLET_CHARGED"
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Cannot change meal after payment — settle or adjust the account first",
        });
      }

      const swapQty = input.quantity ?? order.quantity;
      if (swapQty > order.quantity) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Order only has ${order.quantity} meal${order.quantity === 1 ? "" : "s"}`,
        });
      }

      if (input.dailyMenuId === order.dailyMenuId) {
        return {
          order,
          split: false as const,
          swappedQuantity: 0,
        };
      }

      const menu = await ctx.db.dailyMenu.findUnique({
        where: { id: input.dailyMenuId },
        include: { location: true },
      });
      if (!menu?.isPublished || menu.skipped) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Menu not found" });
      }
      if (menu.locationId !== order.locationId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Substitute must be at the same office",
        });
      }

      const orderDate = formatInTimeZone(
        order.dailyMenu.date,
        "UTC",
        "yyyy-MM-dd",
      );
      const menuDate = formatInTimeZone(menu.date, "UTC", "yyyy-MM-dd");
      if (orderDate !== menuDate) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Substitute must be for the same meal day",
        });
      }

      if (menu.slot === "DINNER" && !menu.location.dinnerEnabled) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Dinner is not offered at this office right now",
        });
      }

      return ctx.db.$transaction(async (tx) => {
        const existing = await tx.order.findFirst({
          where: {
            userId: order.userId,
            dailyMenuId: menu.id,
            status: { not: "CANCELLED" },
            NOT: { id: order.id },
          },
        });

        if (
          existing &&
          (existing.paymentStatus === "PAID" ||
            existing.paymentStatus === "WALLET_CHARGED")
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message:
              "Member already has a paid order for that meal — cannot merge",
          });
        }

        const applyToTarget = async (qty: number) => {
          if (existing) {
            const nextQty = existing.quantity + qty;
            return tx.order.update({
              where: { id: existing.id },
              data: {
                quantity: nextQty,
                amount: menu.price * nextQty,
                status:
                  order.status === "DELIVERED" || existing.status === "DELIVERED"
                    ? "DELIVERED"
                    : existing.status,
                deliveredAt: existing.deliveredAt ?? order.deliveredAt,
              },
              include: { dailyMenu: true },
            });
          }
          return tx.order.create({
            data: {
              userId: order.userId,
              dailyMenuId: menu.id,
              locationId: order.locationId,
              quantity: qty,
              amount: menu.price * qty,
              note: order.note,
              status: order.status,
              paymentStatus: order.paymentStatus,
              placedById: order.placedById,
              deliveredAt: order.deliveredAt,
            },
            include: { dailyMenu: true },
          });
        };

        if (swapQty === order.quantity) {
          if (existing) {
            const updated = await applyToTarget(swapQty);
            await tx.order.delete({ where: { id: order.id } });
            return {
              order: updated,
              split: false as const,
              swappedQuantity: swapQty,
            };
          }

          const updated = await tx.order.update({
            where: { id: order.id },
            data: {
              dailyMenuId: menu.id,
              amount: menu.price * order.quantity,
            },
            include: { dailyMenu: true },
          });
          return {
            order: updated,
            split: false as const,
            swappedQuantity: swapQty,
          };
        }

        const remain = order.quantity - swapQty;
        await tx.order.update({
          where: { id: order.id },
          data: {
            quantity: remain,
            amount: order.dailyMenu.price * remain,
          },
        });

        const updated = await applyToTarget(swapQty);
        return {
          order: updated,
          split: true as const,
          swappedQuantity: swapQty,
        };
      });
    }),

  chargeWallet: adminProcedure
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

      if (!isRegularCustomer(order.user)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Charge Wallet is only for regular customers",
        });
      }
      if (order.status !== "DELIVERED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Deliver the order before charging the wallet",
        });
      }
      if (order.paymentStatus !== "UNPAID") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Order is not unpaid",
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
          data: { paymentStatus: "WALLET_CHARGED" },
        });
      });
    }),

  confirmCashPayment: adminProcedure
    .input(z.object({ orderId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.orderId },
        include: { user: true },
      });
      if (!order) throw new TRPCError({ code: "NOT_FOUND" });

      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        order.locationId,
      );

      if (!isOneTimeCustomer(order.user)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cash payment is only for one-time customers",
        });
      }
      if (order.status !== "DELIVERED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Deliver the order before confirming cash",
        });
      }
      if (order.paymentStatus !== "UNPAID" && order.paymentStatus !== "DUE") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Order is not unpaid or due",
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

  markDue: adminProcedure
    .input(z.object({ orderId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.orderId },
        include: { user: true },
      });
      if (!order) throw new TRPCError({ code: "NOT_FOUND" });

      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        order.locationId,
      );

      if (!isOneTimeCustomer(order.user)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Due is only for one-time customers",
        });
      }
      if (order.status !== "DELIVERED") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Deliver the order before marking due",
        });
      }
      if (order.paymentStatus !== "UNPAID") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Order is not unpaid",
        });
      }

      return ctx.db.order.update({
        where: { id: order.id },
        data: { paymentStatus: "DUE" },
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
