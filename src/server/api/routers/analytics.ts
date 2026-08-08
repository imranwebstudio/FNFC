import { z } from "zod";

import { dhakaDateOnly, dueFromBalance, todayDateString } from "~/lib/datetime";
import {
  adminProcedure,
  assertLocationAccess,
  createTRPCRouter,
} from "~/server/api/trpc";

export const analyticsRouter = createTRPCRouter({
  overview: adminProcedure
    .input(
      z
        .object({
          locationId: z.string().cuid().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const isSuper = ctx.session.user.role === "SUPER_ADMIN";
      let locationIds: string[] | undefined;

      if (input?.locationId) {
        await assertLocationAccess(
          ctx.db,
          ctx.session.user.id,
          ctx.session.user.role,
          input.locationId,
        );
        locationIds = [input.locationId];
      } else if (!isSuper) {
        const links = await ctx.db.adminLocation.findMany({
          where: { userId: ctx.session.user.id },
          select: { locationId: true },
        });
        locationIds = links.map((l) => l.locationId);
      }

      const locationFilter = locationIds
        ? { locationId: { in: locationIds } }
        : {};

      const today = dhakaDateOnly(todayDateString());

      const [
        ordersToday,
        deliveredToday,
        cashPaidToday,
        walletChargedToday,
        activeUsers,
        usersWithDue,
        recentMenus,
      ] = await Promise.all([
        ctx.db.order.count({
          where: {
            ...locationFilter,
            status: { not: "CANCELLED" },
            dailyMenu: { date: today },
          },
        }),
        ctx.db.order.count({
          where: {
            ...locationFilter,
            status: "DELIVERED",
            dailyMenu: { date: today },
          },
        }),
        ctx.db.order.aggregate({
          where: {
            ...locationFilter,
            paymentStatus: "PAID",
            paidAt: { gte: today },
          },
          _sum: { amount: true },
          _count: true,
        }),
        ctx.db.order.aggregate({
          where: {
            ...locationFilter,
            paymentStatus: "WALLET_CHARGED",
            status: { not: "CANCELLED" },
            dailyMenu: { date: today },
          },
          _sum: { amount: true },
          _count: true,
        }),
        ctx.db.user.count({
          where: {
            profileComplete: true,
            ...(locationIds ? { locationId: { in: locationIds } } : {}),
          },
        }),
        ctx.db.user.findMany({
          where: {
            balance: { lt: 0 },
            ...(locationIds ? { locationId: { in: locationIds } } : {}),
          },
          select: { balance: true },
        }),
        ctx.db.dailyMenu.findMany({
          where: {
            ...locationFilter,
            date: today,
            isPublished: true,
          },
          include: {
            _count: {
              select: { orders: { where: { status: { not: "CANCELLED" } } } },
            },
            location: { select: { name: true } },
          },
        }),
      ]);

      const outstandingDue = usersWithDue.reduce(
        (sum, u) => sum + dueFromBalance(u.balance),
        0,
      );

      return {
        ordersToday,
        deliveredToday,
        cashCollectedToday: cashPaidToday._sum.amount ?? 0,
        cashOrdersPaidToday: cashPaidToday._count,
        walletChargedToday: walletChargedToday._sum.amount ?? 0,
        walletOrdersToday: walletChargedToday._count,
        activeUsers,
        usersWithDueCount: usersWithDue.length,
        outstandingDue,
        menusToday: recentMenus.map((m) => ({
          id: m.id,
          title: m.title,
          slot: m.slot,
          locationName: m.location.name,
          orderCount: m._count.orders,
          price: m.price,
        })),
      };
    }),
});
