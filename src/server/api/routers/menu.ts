import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { formatInTimeZone } from "date-fns-tz";

import { getCloudinaryUploadSignature } from "~/lib/cloudinary";
import {
  dayArchiveAt,
  dhakaDateOnly,
  enumerateDateRange,
  getOrderWindow,
  normalizeCutoffTime,
  todayDateString,
  weekdayFromDateString,
  WEEKDAYS,
} from "~/lib/datetime";
import {
  adminProcedure,
  assertLocationAccess,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import type { db as DbClient } from "~/server/db";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const weekdayEnum = z.enum(WEEKDAYS);
type Db = typeof DbClient;

async function resolveCutoff(
  db: Db,
  locationId: string,
  dateStr: string,
  cutoffTime?: string,
) {
  const cutoffHm =
    cutoffTime ??
    (
      await db.location.findUnique({
        where: { id: locationId },
        select: { defaultCutoffTime: true },
      })
    )?.defaultCutoffTime;
  return dayArchiveAt(dateStr, normalizeCutoffTime(cutoffHm));
}

/** Create a new daily meal option, or update an existing one by id. */
async function saveDailyMenu(
  db: Db,
  input: {
    id?: string;
    locationId: string;
    date: string;
    slot: "LUNCH" | "DINNER";
    title: string;
    description?: string | null;
    price: number;
    imageUrl?: string | null;
    catalogItemId?: string | null;
    isPublished: boolean;
    cutoffTime?: string;
    sourceWeekdayMenuId?: string | null;
  },
) {
  const date = dhakaDateOnly(input.date);
  const cutoffAt = await resolveCutoff(
    db,
    input.locationId,
    input.date,
    input.cutoffTime,
  );

  if (input.id) {
    return db.dailyMenu.update({
      where: { id: input.id },
      data: {
        slot: input.slot,
        title: input.title,
        description: input.description,
        price: input.price,
        imageUrl: input.imageUrl,
        catalogItemId: input.catalogItemId,
        cutoffAt,
        isPublished: input.isPublished,
      },
    });
  }

  return db.dailyMenu.create({
    data: {
      locationId: input.locationId,
      date,
      slot: input.slot,
      title: input.title,
      description: input.description ?? undefined,
      price: input.price,
      imageUrl: input.imageUrl ?? undefined,
      catalogItemId: input.catalogItemId ?? undefined,
      sourceWeekdayMenuId: input.sourceWeekdayMenuId ?? undefined,
      cutoffAt,
      isPublished: input.isPublished,
    },
  });
}

/**
 * Materialize each active WeekdayMenu into a DailyMenu for dateStr when
 * that template has not yet been copied for the day.
 */
async function ensureMenusForDate(
  db: Db,
  locationIds: string[] | "all",
  dateStr: string,
) {
  const weekday = weekdayFromDateString(dateStr);
  const date = dhakaDateOnly(dateStr);

  const locations =
    locationIds === "all"
      ? await db.location.findMany({
          where: { isActive: true },
          select: { id: true, defaultCutoffTime: true, dinnerEnabled: true },
        })
      : await db.location.findMany({
          where: { id: { in: locationIds } },
          select: { id: true, defaultCutoffTime: true, dinnerEnabled: true },
        });

  if (locations.length === 0) return;

  const ids = locations.map((l) => l.id);
  const cutoffByLoc = new Map(
    locations.map((l) => [l.id, normalizeCutoffTime(l.defaultCutoffTime)]),
  );
  const dinnerByLoc = new Map(
    locations.map((l) => [l.id, l.dinnerEnabled]),
  );

  const [existing, templates] = await Promise.all([
    db.dailyMenu.findMany({
      where: {
        locationId: { in: ids },
        date,
        sourceWeekdayMenuId: { not: null },
      },
      select: { sourceWeekdayMenuId: true },
    }),
    db.weekdayMenu.findMany({
      where: {
        locationId: { in: ids },
        weekday,
        isActive: true,
      },
    }),
  ]);

  const already = new Set(
    existing
      .map((m) => m.sourceWeekdayMenuId)
      .filter((id): id is string => Boolean(id)),
  );

  for (const t of templates) {
    if (already.has(t.id)) continue;
    if (t.slot === "DINNER" && !dinnerByLoc.get(t.locationId)) continue;
    await saveDailyMenu(db, {
      locationId: t.locationId,
      date: dateStr,
      slot: t.slot,
      title: t.title,
      description: t.description,
      price: t.price,
      imageUrl: t.imageUrl,
      catalogItemId: t.catalogItemId,
      isPublished: true,
      cutoffTime: cutoffByLoc.get(t.locationId),
      sourceWeekdayMenuId: t.id,
    });
  }
}

export const menuRouter = createTRPCRouter({
  catalogList: adminProcedure
    .input(
      z
        .object({
          includeInactive: z.boolean().default(false),
        })
        .optional(),
    )
    .query(({ ctx, input }) =>
      ctx.db.mealCatalog.findMany({
        where: input?.includeInactive ? undefined : { isActive: true },
        orderBy: [{ isActive: "desc" }, { name: "asc" }],
      }),
    ),

  catalogCreate: adminProcedure
    .input(
      z.object({
        name: z.string().min(1).max(120),
        description: z.string().max(500).optional(),
        imageUrl: z.string().url().optional(),
        defaultPrice: z.number().int().positive(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.mealCatalog.create({ data: input }),
    ),

  catalogUpdate: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        name: z.string().min(1).max(120).optional(),
        description: z.string().max(500).nullable().optional(),
        imageUrl: z.string().url().nullable().optional(),
        defaultPrice: z.number().int().positive().optional(),
        isActive: z.boolean().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.mealCatalog.update({ where: { id }, data });
    }),

  weekdayList: adminProcedure
    .input(z.object({ locationId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        input.locationId,
      );
      return ctx.db.weekdayMenu.findMany({
        where: { locationId: input.locationId },
        orderBy: [
          { weekday: "asc" },
          { slot: "asc" },
          { createdAt: "asc" },
        ],
      });
    }),

  weekdayUpsert: adminProcedure
    .input(
      z.object({
        id: z.string().cuid().optional(),
        locationId: z.string().cuid(),
        weekday: weekdayEnum,
        slot: z.enum(["LUNCH", "DINNER"]),
        title: z.string().min(1).max(160),
        description: z.string().max(500).optional().nullable(),
        price: z.number().int().positive(),
        imageUrl: z.string().url().optional().nullable(),
        catalogItemId: z.string().cuid().optional().nullable(),
        isActive: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        input.locationId,
      );

      if (input.slot === "DINNER") {
        const loc = await ctx.db.location.findUnique({
          where: { id: input.locationId },
          select: { dinnerEnabled: true },
        });
        if (!loc?.dinnerEnabled) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Dinner is turned off for this office — enable Dinner on the Menu page first",
          });
        }
      }

      if (input.id) {
        const existing = await ctx.db.weekdayMenu.findUnique({
          where: { id: input.id },
        });
        if (!existing || existing.locationId !== input.locationId) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }
        return ctx.db.weekdayMenu.update({
          where: { id: input.id },
          data: {
            weekday: input.weekday,
            slot: input.slot,
            title: input.title,
            description: input.description,
            price: input.price,
            imageUrl: input.imageUrl,
            catalogItemId: input.catalogItemId,
            isActive: input.isActive,
          },
        });
      }

      return ctx.db.weekdayMenu.create({
        data: {
          locationId: input.locationId,
          weekday: input.weekday,
          slot: input.slot,
          title: input.title,
          description: input.description ?? undefined,
          price: input.price,
          imageUrl: input.imageUrl ?? undefined,
          catalogItemId: input.catalogItemId ?? undefined,
          isActive: input.isActive,
        },
      });
    }),

  weekdayClear: adminProcedure
    .input(
      z.object({
        id: z.string().cuid().optional(),
        locationId: z.string().cuid(),
        weekday: weekdayEnum.optional(),
        slot: z.enum(["LUNCH", "DINNER"]).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        input.locationId,
      );

      if (input.id) {
        const existing = await ctx.db.weekdayMenu.findUnique({
          where: { id: input.id },
        });
        if (!existing || existing.locationId !== input.locationId) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }
        await ctx.db.weekdayMenu.delete({ where: { id: input.id } });
        return { ok: true as const };
      }

      if (!input.weekday || !input.slot) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "id or weekday+slot required",
        });
      }

      await ctx.db.weekdayMenu.deleteMany({
        where: {
          locationId: input.locationId,
          weekday: input.weekday,
          slot: input.slot,
        },
      });
      return { ok: true as const };
    }),

  orderWindow: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: { location: { select: { defaultCutoffTime: true } } },
    });
    return getOrderWindow(
      new Date(),
      normalizeCutoffTime(user?.location?.defaultCutoffTime),
    );
  }),

  todayForUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        location: {
          select: { id: true, name: true, defaultCutoffTime: true },
        },
        adminLocations: { select: { locationId: true } },
      },
    });

    const ownCutoff = normalizeCutoffTime(user?.location?.defaultCutoffTime);
    const ownWindow = getOrderWindow(new Date(), ownCutoff);

    if (!user?.profileComplete) {
      return {
        menus: [],
        locationName: null as string | null,
        locationId: null as string | null,
        scope: "none" as const,
        window: ownWindow,
      };
    }

    let locationIds: string[] | "all" = [];
    let scope: "own" | "admin" | "all" = "own";

    if (user.role === "SUPER_ADMIN") {
      locationIds = "all";
      scope = "all";
    } else if (user.role === "ADMIN") {
      const ids = new Set<string>(
        user.adminLocations.map((a) => a.locationId),
      );
      if (user.locationId) ids.add(user.locationId);
      locationIds = Array.from(ids);
      scope = "admin";
    } else if (user.locationId) {
      locationIds = [user.locationId];
      scope = "own";
    } else {
      return {
        menus: [],
        locationName: null,
        locationId: null,
        scope: "none" as const,
        window: ownWindow,
      };
    }

    const locations =
      locationIds === "all"
        ? await ctx.db.location.findMany({
            where: { isActive: true },
            select: {
              id: true,
              defaultCutoffTime: true,
              dinnerEnabled: true,
            },
          })
        : await ctx.db.location.findMany({
            where: { id: { in: locationIds } },
            select: {
              id: true,
              defaultCutoffTime: true,
              dinnerEnabled: true,
            },
          });

    // Each office may roll over at a different time — materialize the
    // orderable date for that office, then fetch only matching menus.
    const menusByLoc = [];

    for (const loc of locations) {
      const cutoffHm = normalizeCutoffTime(loc.defaultCutoffTime);
      const window = getOrderWindow(new Date(), cutoffHm);
      await ensureMenusForDate(ctx.db, [loc.id], window.orderDate);
      const date = dhakaDateOnly(window.orderDate);
      const rows = await ctx.db.dailyMenu.findMany({
        where: {
          locationId: loc.id,
          date,
          isPublished: true,
          ...(loc.dinnerEnabled ? {} : { slot: { not: "DINNER" as const } }),
        },
        include: {
          location: true,
          orders: {
            where: {
              userId: user.id,
              status: { not: "CANCELLED" },
            },
            take: 1,
          },
        },
        orderBy: { slot: "asc" },
      });
      menusByLoc.push(...rows);
    }

    menusByLoc.sort((a, b) => {
      const byName = a.location.name.localeCompare(b.location.name);
      if (byName !== 0) return byName;
      return a.slot.localeCompare(b.slot);
    });

    const now = new Date();

    return {
      locationName: user.location?.name ?? null,
      locationId: user.locationId,
      scope,
      window: ownWindow,
      menus: menusByLoc.map((m) => {
        const menuDateStr = formatInTimeZone(m.date, "UTC", "yyyy-MM-dd");
        const locCutoff = normalizeCutoffTime(m.location.defaultCutoffTime);
        const cutoff =
          m.cutoffAt ?? dayArchiveAt(menuDateStr, locCutoff);
        return {
          ...m,
          menuDate: menuDateStr,
          effectiveCutoffAt: cutoff,
          cutoffTime: locCutoff,
          isPastCutoff: now > cutoff,
          myOrder: m.orders[0] ?? null,
          orders: undefined,
        };
      }),
    };
  }),

  listDaily: adminProcedure
    .input(
      z.object({
        locationId: z.string().cuid(),
        date: z.string().regex(dateRegex).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        input.locationId,
      );
      const dateStr = input.date ?? todayDateString();
      await ensureMenusForDate(ctx.db, [input.locationId], dateStr);
      return ctx.db.dailyMenu.findMany({
        where: {
          locationId: input.locationId,
          date: dhakaDateOnly(dateStr),
        },
        include: {
          _count: {
            select: { orders: { where: { status: { not: "CANCELLED" } } } },
          },
        },
        orderBy: [{ slot: "asc" }, { createdAt: "asc" }],
      });
    }),

  upsertDaily: adminProcedure
    .input(
      z.object({
        id: z.string().cuid().optional(),
        locationId: z.string().cuid(),
        date: z.string().regex(dateRegex),
        /** Inclusive end date for multi-day publish (week / month). Defaults to `date`. */
        endDate: z.string().regex(dateRegex).optional(),
        slot: z.enum(["LUNCH", "DINNER"]),
        title: z.string().min(1).max(160),
        description: z.string().max(500).optional(),
        price: z.number().int().positive(),
        imageUrl: z.string().url().optional().nullable(),
        catalogItemId: z.string().cuid().optional().nullable(),
        cutoffTime: z
          .string()
          .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .optional()
          .nullable(),
        isPublished: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        input.locationId,
      );

      const loc = await ctx.db.location.findUnique({
        where: { id: input.locationId },
        select: { defaultCutoffTime: true, dinnerEnabled: true },
      });
      if (input.slot === "DINNER" && !loc?.dinnerEnabled) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Dinner is turned off for this office — enable Dinner on the Menu page first",
        });
      }

      const cutoffTime = normalizeCutoffTime(
        input.cutoffTime ?? loc?.defaultCutoffTime,
      );

      // Update a single existing meal option
      if (input.id) {
        const existing = await ctx.db.dailyMenu.findUnique({
          where: { id: input.id },
        });
        if (!existing || existing.locationId !== input.locationId) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }
        const menu = await saveDailyMenu(ctx.db, {
          id: input.id,
          locationId: input.locationId,
          date: input.date,
          slot: input.slot,
          title: input.title,
          description: input.description,
          price: input.price,
          imageUrl: input.imageUrl,
          catalogItemId: input.catalogItemId,
          isPublished: input.isPublished,
          cutoffTime,
        });
        return {
          count: 1,
          startDate: input.date,
          endDate: input.date,
          rolloverNote: `Orders close at ${cutoffTime} Asia/Dhaka each day; after that, employees order for the next day.`,
          menus: [menu],
        };
      }

      const end = input.endDate ?? input.date;
      let dates: string[];
      try {
        dates = enumerateDateRange(input.date, end);
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: e instanceof Error ? e.message : "Invalid date range",
        });
      }
      if (dates.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "End date must be on or after start date",
        });
      }

      const results = [];
      for (const d of dates) {
        results.push(
          await saveDailyMenu(ctx.db, {
            locationId: input.locationId,
            date: d,
            slot: input.slot,
            title: input.title,
            description: input.description,
            price: input.price,
            imageUrl: input.imageUrl,
            catalogItemId: input.catalogItemId,
            isPublished: input.isPublished,
            cutoffTime,
          }),
        );
      }

      return {
        count: results.length,
        startDate: dates[0],
        endDate: dates[dates.length - 1],
        rolloverNote: `Orders close at ${cutoffTime} Asia/Dhaka each day; after that, employees order for the next day.`,
        menus: results,
      };
    }),

  deleteDaily: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        locationId: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        input.locationId,
      );
      const existing = await ctx.db.dailyMenu.findUnique({
        where: { id: input.id },
        include: {
          _count: {
            select: { orders: { where: { status: { not: "CANCELLED" } } } },
          },
        },
      });
      if (!existing || existing.locationId !== input.locationId) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      if (existing._count.orders > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot delete a meal that already has orders — unpublish instead",
        });
      }
      await ctx.db.dailyMenu.delete({ where: { id: input.id } });
      return { ok: true as const };
    }),

  /** Published meals for an office on a date (defaults to that office's orderable day). */
  optionsForLocation: adminProcedure
    .input(
      z.object({
        locationId: z.string().cuid(),
        date: z.string().regex(dateRegex).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        input.locationId,
      );

      const loc = await ctx.db.location.findUnique({
        where: { id: input.locationId },
        select: {
          id: true,
          name: true,
          defaultCutoffTime: true,
          dinnerEnabled: true,
        },
      });
      if (!loc) throw new TRPCError({ code: "NOT_FOUND" });

      const cutoffHm = normalizeCutoffTime(loc.defaultCutoffTime);
      const window = getOrderWindow(new Date(), cutoffHm);
      const dateStr = input.date ?? window.orderDate;

      if (dateStr < todayDateString()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Meal date cannot be in the past",
        });
      }

      await ensureMenusForDate(ctx.db, [input.locationId], dateStr);

      const menus = await ctx.db.dailyMenu.findMany({
        where: {
          locationId: input.locationId,
          date: dhakaDateOnly(dateStr),
          isPublished: true,
          ...(loc.dinnerEnabled ? {} : { slot: { not: "DINNER" as const } }),
        },
        orderBy: [{ slot: "asc" }, { createdAt: "asc" }],
      });

      return {
        locationId: loc.id,
        locationName: loc.name,
        date: dateStr,
        window,
        menus: menus.map((m) => ({
          ...m,
          menuDate: formatInTimeZone(m.date, "UTC", "yyyy-MM-dd"),
        })),
      };
    }),

  cloudinarySignature: adminProcedure.query(() => {
    try {
      return getCloudinaryUploadSignature();
    } catch {
      throw new TRPCError({
        code: "PRECONDITION_FAILED",
        message: "Cloudinary is not configured",
      });
    }
  }),
});
