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
        todayOrders,
        publishedMenus,
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
        ctx.db.order.findMany({
          where: {
            ...locationFilter,
            status: { not: "CANCELLED" },
            dailyMenu: { date: today },
          },
          select: {
            quantity: true,
            amount: true,
            dailyMenu: {
              select: {
                title: true,
                slot: true,
                price: true,
                location: { select: { name: true } },
              },
            },
          },
        }),
        ctx.db.dailyMenu.findMany({
          where: {
            ...locationFilter,
            date: today,
            isPublished: true,
            skipped: false,
          },
          select: {
            title: true,
            slot: true,
            price: true,
            location: { select: { name: true } },
          },
        }),
      ]);

      const outstandingDue = usersWithDue.reduce(
        (sum, u) => sum + dueFromBalance(u.balance),
        0,
      );

      type PackRow = {
        title: string;
        slot: string;
        quantity: number;
        orderCount: number;
        amount: number;
        price: number;
        locations: string[];
      };

      const packMap = new Map<string, PackRow>();

      function packKey(slot: string, title: string) {
        return `${slot}|${title.trim().toLowerCase()}`;
      }

      for (const m of publishedMenus) {
        const key = packKey(m.slot, m.title);
        const existing = packMap.get(key);
        if (!existing) {
          packMap.set(key, {
            title: m.title.trim(),
            slot: m.slot,
            quantity: 0,
            orderCount: 0,
            amount: 0,
            price: m.price,
            locations: [m.location.name],
          });
        } else if (!existing.locations.includes(m.location.name)) {
          existing.locations.push(m.location.name);
        }
      }

      let portionsToday = 0;
      for (const o of todayOrders) {
        const title = o.dailyMenu.title.trim();
        const key = packKey(o.dailyMenu.slot, title);
        const row =
          packMap.get(key) ??
          ({
            title,
            slot: o.dailyMenu.slot,
            quantity: 0,
            orderCount: 0,
            amount: 0,
            price: o.dailyMenu.price,
            locations: [] as string[],
          } satisfies PackRow);
        row.quantity += o.quantity;
        row.orderCount += 1;
        row.amount += o.amount;
        portionsToday += o.quantity;
        const locName = o.dailyMenu.location.name;
        if (!row.locations.includes(locName)) row.locations.push(locName);
        packMap.set(key, row);
      }

      const packByItem = Array.from(packMap.values()).sort((a, b) => {
        if (b.quantity !== a.quantity) return b.quantity - a.quantity;
        return a.title.localeCompare(b.title);
      });

      return {
        ordersToday,
        portionsToday,
        deliveredToday,
        cashCollectedToday: cashPaidToday._sum.amount ?? 0,
        cashOrdersPaidToday: cashPaidToday._count,
        walletChargedToday: walletChargedToday._sum.amount ?? 0,
        walletOrdersToday: walletChargedToday._count,
        activeUsers,
        usersWithDueCount: usersWithDue.length,
        outstandingDue,
        /** @deprecated use packByItem — kept for older clients */
        menusToday: packByItem.map((m, i) => ({
          id: `${m.slot}-${i}`,
          title: m.title,
          slot: m.slot,
          locationName:
            m.locations.length === 1
              ? m.locations[0]!
              : `${m.locations.length} offices`,
          orderCount: m.quantity,
          price: m.price,
        })),
        packByItem,
      };
    }),

  /** Who ordered a given dish today — for packing / distribution. */
  packItemOrders: adminProcedure
    .input(
      z.object({
        title: z.string().min(1).max(160),
        slot: z.enum(["LUNCH", "DINNER"]),
        locationId: z.string().cuid().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const isSuper = ctx.session.user.role === "SUPER_ADMIN";
      let locationIds: string[] | undefined;

      if (input.locationId) {
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

      const today = dhakaDateOnly(todayDateString());
      const titleNorm = input.title.trim().toLowerCase();

      const orders = await ctx.db.order.findMany({
        where: {
          ...(locationIds ? { locationId: { in: locationIds } } : {}),
          status: { not: "CANCELLED" },
          dailyMenu: {
            date: today,
            slot: input.slot,
          },
        },
        select: {
          id: true,
          quantity: true,
          amount: true,
          status: true,
          note: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              employeeId: true,
              phoneNumber: true,
              deskNumber: true,
              floorNumber: true,
              buildingNumber: true,
              locationLabel: true,
              location: { select: { id: true, name: true } },
            },
          },
          location: { select: { id: true, name: true } },
          dailyMenu: { select: { title: true, slot: true, price: true } },
        },
        orderBy: [{ locationId: "asc" }, { createdAt: "asc" }],
      });

      const rows = orders.filter(
        (o) => o.dailyMenu.title.trim().toLowerCase() === titleNorm,
      );

      return {
        title: input.title.trim(),
        slot: input.slot,
        totalPortions: rows.reduce((s, o) => s + o.quantity, 0),
        orders: rows.map((o) => ({
          id: o.id,
          quantity: o.quantity,
          amount: o.amount,
          status: o.status,
          note: o.note,
          zoneName: o.location.name,
          user: {
            id: o.user.id,
            name: o.user.name,
            email: o.user.email,
            employeeId: o.user.employeeId,
            phoneNumber: o.user.phoneNumber,
            deskNumber: o.user.deskNumber,
            floorNumber: o.user.floorNumber,
            buildingNumber: o.user.buildingNumber,
            locationLabel: o.user.locationLabel,
            zoneName: o.user.location?.name ?? null,
          },
        })),
      };
    }),
});
