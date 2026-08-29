import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { formatInTimeZone } from "date-fns-tz";

import { getCloudinaryUploadSignature } from "~/lib/cloudinary";
import {
  dayArchiveAt,
  dhakaDateOnly,
  enumerateDateRange,
  getOrderWindow,
  ORDER_ROLLOVER_TIME,
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

async function upsertOneDaily(
  db: Db,
  input: {
    locationId: string;
    date: string;
    slot: "LUNCH" | "DINNER";
    title: string;
    description?: string | null;
    price: number;
    imageUrl?: string | null;
    catalogItemId?: string | null;
    isPublished: boolean;
  },
) {
  const date = dhakaDateOnly(input.date);
  const cutoffAt = dayArchiveAt(input.date);

  return db.dailyMenu.upsert({
    where: {
      locationId_date_slot: {
        locationId: input.locationId,
        date,
        slot: input.slot,
      },
    },
    create: {
      locationId: input.locationId,
      date,
      slot: input.slot,
      title: input.title,
      description: input.description ?? undefined,
      price: input.price,
      imageUrl: input.imageUrl ?? undefined,
      catalogItemId: input.catalogItemId ?? undefined,
      cutoffAt,
      isPublished: input.isPublished,
    },
    update: {
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

/**
 * For each location: if a slot has no DailyMenu for dateStr, materialize from
 * active WeekdayMenu. Existing DailyMenus (explicit publish) are left alone.
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
          select: { id: true },
        })
      : locationIds.map((id) => ({ id }));

  if (locations.length === 0) return;

  const ids = locations.map((l) => l.id);

  const [existing, templates] = await Promise.all([
    db.dailyMenu.findMany({
      where: { locationId: { in: ids }, date },
      select: { locationId: true, slot: true },
    }),
    db.weekdayMenu.findMany({
      where: {
        locationId: { in: ids },
        weekday,
        isActive: true,
      },
    }),
  ]);

  const existingKeys = new Set(
    existing.map((m) => `${m.locationId}:${m.slot}`),
  );

  for (const t of templates) {
    const key = `${t.locationId}:${t.slot}`;
    if (existingKeys.has(key)) continue;
    await upsertOneDaily(db, {
      locationId: t.locationId,
      date: dateStr,
      slot: t.slot,
      title: t.title,
      description: t.description,
      price: t.price,
      imageUrl: t.imageUrl,
      catalogItemId: t.catalogItemId,
      isPublished: true,
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
        orderBy: [{ weekday: "asc" }, { slot: "asc" }],
      });
    }),

  weekdayUpsert: adminProcedure
    .input(
      z.object({
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

      return ctx.db.weekdayMenu.upsert({
        where: {
          locationId_weekday_slot: {
            locationId: input.locationId,
            weekday: input.weekday,
            slot: input.slot,
          },
        },
        create: {
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
        update: {
          title: input.title,
          description: input.description,
          price: input.price,
          imageUrl: input.imageUrl,
          catalogItemId: input.catalogItemId,
          isActive: input.isActive,
        },
      });
    }),

  weekdayClear: adminProcedure
    .input(
      z.object({
        locationId: z.string().cuid(),
        weekday: weekdayEnum,
        slot: z.enum(["LUNCH", "DINNER"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        input.locationId,
      );

      await ctx.db.weekdayMenu.deleteMany({
        where: {
          locationId: input.locationId,
          weekday: input.weekday,
          slot: input.slot,
        },
      });
      return { ok: true as const };
    }),

  orderWindow: protectedProcedure.query(() => getOrderWindow()),

  todayForUser: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        location: { select: { id: true, name: true } },
        adminLocations: { select: { locationId: true } },
      },
    });
    if (!user?.profileComplete) {
      return {
        menus: [],
        locationName: null as string | null,
        locationId: null as string | null,
        scope: "none" as const,
        window: getOrderWindow(),
      };
    }

    const window = getOrderWindow();
    const date = dhakaDateOnly(window.orderDate);
    let locationIds: string[] | "all" = [];
    let locationFilter: { locationId?: string | { in: string[] } } = {};
    let scope: "own" | "admin" | "all" = "own";

    if (user.role === "SUPER_ADMIN") {
      locationFilter = {};
      locationIds = "all";
      scope = "all";
    } else if (user.role === "ADMIN") {
      const ids = new Set<string>(
        user.adminLocations.map((a) => a.locationId),
      );
      if (user.locationId) ids.add(user.locationId);
      const list = Array.from(ids);
      locationFilter = { locationId: { in: list } };
      locationIds = list;
      scope = "admin";
    } else if (user.locationId) {
      locationFilter = { locationId: user.locationId };
      locationIds = [user.locationId];
      scope = "own";
    } else {
      return {
        menus: [],
        locationName: null,
        locationId: null,
        scope: "none" as const,
        window,
      };
    }

    await ensureMenusForDate(ctx.db, locationIds, window.orderDate);

    const menus = await ctx.db.dailyMenu.findMany({
      where: {
        ...locationFilter,
        date,
        isPublished: true,
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
      orderBy: [{ location: { name: "asc" } }, { slot: "asc" }],
    });

    const now = new Date();
    return {
      locationName: user.location?.name ?? null,
      locationId: user.locationId,
      scope,
      window,
      menus: menus.map((m) => {
        const menuDateStr = formatInTimeZone(m.date, "UTC", "yyyy-MM-dd");
        const cutoff = m.cutoffAt ?? dayArchiveAt(menuDateStr);
        return {
          ...m,
          menuDate: menuDateStr,
          effectiveCutoffAt: cutoff,
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
        orderBy: { slot: "asc" },
      });
    }),

  upsertDaily: adminProcedure
    .input(
      z.object({
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
          await upsertOneDaily(ctx.db, {
            locationId: input.locationId,
            date: d,
            slot: input.slot,
            title: input.title,
            description: input.description,
            price: input.price,
            imageUrl: input.imageUrl,
            catalogItemId: input.catalogItemId,
            isPublished: input.isPublished,
          }),
        );
      }

      return {
        count: results.length,
        startDate: dates[0],
        endDate: dates[dates.length - 1],
        rolloverNote: `Orders close at ${ORDER_ROLLOVER_TIME} Asia/Dhaka each day; after that, employees order for the next day.`,
        menus: results,
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
