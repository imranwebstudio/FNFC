import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { formatInTimeZone } from "date-fns-tz";

import {
  dayArchiveAt,
  dhakaDateOnly,
  normalizeCutoffTime,
  normalizeDinnerCutoffTime,
  slotCutoffAt,
  todayDateString,
} from "~/lib/datetime";
import {
  adminProcedure,
  createTRPCRouter,
  superAdminProcedure,
} from "~/server/api/trpc";

const cutoffRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const locationRouter = createTRPCRouter({
  list: adminProcedure.query(async ({ ctx }) => {
    const includeManagers = {
      adminLocations: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              isBanned: true,
            },
          },
        },
        orderBy: { user: { name: "asc" as const } },
      },
    };

    if (ctx.session.user.role === "SUPER_ADMIN") {
      return ctx.db.location.findMany({
        orderBy: { name: "asc" },
        include: includeManagers,
      });
    }
    return ctx.db.location.findMany({
      where: {
        adminLocations: { some: { userId: ctx.session.user.id } },
      },
      orderBy: { name: "asc" },
      include: includeManagers,
    });
  }),

  create: superAdminProcedure
    .input(
      z.object({
        name: z.string().min(1).max(120),
        address: z.string().max(240).optional(),
        defaultCutoffTime: z.string().regex(cutoffRegex).default("14:00"),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.location.create({
        data: {
          name: input.name,
          address: input.address,
          defaultCutoffTime: normalizeCutoffTime(input.defaultCutoffTime),
        },
      }),
    ),

  update: superAdminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        name: z.string().min(1).max(120).optional(),
        address: z.string().max(240).nullable().optional(),
        defaultCutoffTime: z.string().regex(cutoffRegex).optional(),
        isActive: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      try {
        return await ctx.db.location.update({ where: { id }, data });
      } catch {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
    }),

  setCutoff: adminProcedure
    .input(
      z.object({
        locationId: z.string().cuid(),
        /** Lunch cutoff */
        defaultCutoffTime: z.string().regex(cutoffRegex),
        /** Dinner cutoff — optional; keeps existing when omitted */
        dinnerCutoffTime: z.string().regex(cutoffRegex).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "SUPER_ADMIN") {
        const link = await ctx.db.adminLocation.findUnique({
          where: {
            userId_locationId: {
              userId: ctx.session.user.id,
              locationId: input.locationId,
            },
          },
        });
        if (!link) throw new TRPCError({ code: "FORBIDDEN" });
      }

      const lunchCutoff = normalizeCutoffTime(input.defaultCutoffTime);
      const today = todayDateString();

      const existing = await ctx.db.location.findUnique({
        where: { id: input.locationId },
        select: { dinnerCutoffTime: true, dinnerEnabled: true },
      });
      if (!existing) throw new TRPCError({ code: "NOT_FOUND" });

      const dinnerCutoff = normalizeDinnerCutoffTime(
        input.dinnerCutoffTime ?? existing.dinnerCutoffTime,
      );

      const location = await ctx.db.location.update({
        where: { id: input.locationId },
        data: {
          defaultCutoffTime: lunchCutoff,
          dinnerCutoffTime: dinnerCutoff,
        },
      });

      const menus = await ctx.db.dailyMenu.findMany({
        where: {
          locationId: input.locationId,
          date: { gte: dhakaDateOnly(today) },
        },
        select: { id: true, date: true, slot: true },
      });

      const lunchByDate = new Map<string, string[]>();
      const dinnerByDate = new Map<string, string[]>();
      for (const m of menus) {
        const dateStr = formatInTimeZone(m.date, "UTC", "yyyy-MM-dd");
        const map = m.slot === "DINNER" ? dinnerByDate : lunchByDate;
        const list = map.get(dateStr) ?? [];
        list.push(m.id);
        map.set(dateStr, list);
      }

      const locCutoffs = {
        defaultCutoffTime: lunchCutoff,
        dinnerCutoffTime: dinnerCutoff,
        dinnerEnabled: existing.dinnerEnabled,
      };

      await Promise.all([
        ...[...lunchByDate.entries()].map(([dateStr, ids]) =>
          ctx.db.dailyMenu.updateMany({
            where: { id: { in: ids } },
            data: { cutoffAt: dayArchiveAt(dateStr, lunchCutoff) },
          }),
        ),
        ...[...dinnerByDate.entries()].map(([dateStr, ids]) =>
          ctx.db.dailyMenu.updateMany({
            where: { id: { in: ids } },
            data: {
              cutoffAt: slotCutoffAt(dateStr, "DINNER", locCutoffs),
            },
          }),
        ),
      ]);

      return location;
    }),

  setDinnerEnabled: adminProcedure
    .input(
      z.object({
        locationId: z.string().cuid(),
        dinnerEnabled: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "SUPER_ADMIN") {
        const link = await ctx.db.adminLocation.findUnique({
          where: {
            userId_locationId: {
              userId: ctx.session.user.id,
              locationId: input.locationId,
            },
          },
        });
        if (!link) throw new TRPCError({ code: "FORBIDDEN" });
      }

      return ctx.db.location.update({
        where: { id: input.locationId },
        data: { dinnerEnabled: input.dinnerEnabled },
      });
    }),

  /** Permanently remove a deactivated office and its menus/orders. */
  delete: superAdminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const location = await ctx.db.location.findUnique({
        where: { id: input.id },
        select: { id: true, name: true, isActive: true },
      });
      if (!location) throw new TRPCError({ code: "NOT_FOUND" });
      if (location.isActive) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Deactivate the location before deleting it",
        });
      }

      await ctx.db.$transaction(async (tx) => {
        // User.locationId has no onDelete — clear home-office links first.
        await tx.user.updateMany({
          where: { locationId: input.id },
          data: { locationId: null },
        });
        await tx.location.delete({ where: { id: input.id } });
      });

      return { ok: true as const, name: location.name };
    }),
});
