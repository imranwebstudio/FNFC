import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { formatInTimeZone } from "date-fns-tz";

import {
  dayArchiveAt,
  dhakaDateOnly,
  normalizeCutoffTime,
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
    if (ctx.session.user.role === "SUPER_ADMIN") {
      return ctx.db.location.findMany({ orderBy: { name: "asc" } });
    }
    return ctx.db.location.findMany({
      where: {
        adminLocations: { some: { userId: ctx.session.user.id } },
      },
      orderBy: { name: "asc" },
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
        defaultCutoffTime: z.string().regex(cutoffRegex),
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

      const cutoffTime = normalizeCutoffTime(input.defaultCutoffTime);
      const today = todayDateString();

      const location = await ctx.db.location.update({
        where: { id: input.locationId },
        data: { defaultCutoffTime: cutoffTime },
      });

      // Group by calendar day so we can updateMany (avoids long interactive
      // transactions that time out on Neon when many future menus exist).
      const menus = await ctx.db.dailyMenu.findMany({
        where: {
          locationId: input.locationId,
          date: { gte: dhakaDateOnly(today) },
        },
        select: { id: true, date: true },
      });

      const idsByDate = new Map<string, string[]>();
      for (const m of menus) {
        const dateStr = formatInTimeZone(m.date, "UTC", "yyyy-MM-dd");
        const list = idsByDate.get(dateStr) ?? [];
        list.push(m.id);
        idsByDate.set(dateStr, list);
      }

      await Promise.all(
        [...idsByDate.entries()].map(([dateStr, ids]) =>
          ctx.db.dailyMenu.updateMany({
            where: { id: { in: ids } },
            data: { cutoffAt: dayArchiveAt(dateStr, cutoffTime) },
          }),
        ),
      );

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
