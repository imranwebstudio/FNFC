import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { formatInTimeZone } from "date-fns-tz";

import { getCloudinaryUploadSignature } from "~/lib/cloudinary";
import {
  dayArchiveAt,
  dhakaDateOnly,
  earliestOrderableDate,
  enumerateDateRange,
  getOrderWindow,
  getServiceOrderWindow,
  latestBrowseDate,
  locationCutoffForSlot,
  normalizeCutoffTime,
  orderableDateForSlot,
  slotCutoffAt,
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
import { isServiceDayOff } from "~/server/api/routers/service";
import type { db as DbClient } from "~/server/db";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const weekdayEnum = z.enum(WEEKDAYS);
type Db = typeof DbClient;

async function resolveCutoff(
  db: Db,
  locationId: string,
  dateStr: string,
  slot: "LUNCH" | "DINNER" = "LUNCH",
  cutoffTime?: string,
) {
  const loc = await db.location.findUnique({
    where: { id: locationId },
    select: {
      defaultCutoffTime: true,
      dinnerCutoffTime: true,
      dinnerEnabled: true,
    },
  });
  const location = {
    defaultCutoffTime: loc?.defaultCutoffTime ?? "14:00",
    dinnerCutoffTime: loc?.dinnerCutoffTime,
    dinnerEnabled: loc?.dinnerEnabled ?? false,
  };
  if (cutoffTime) {
    // Explicit override still uses same calendar day unless dinner is overnight
    if (slot === "DINNER") {
      return slotCutoffAt(dateStr, "DINNER", {
        ...location,
        dinnerCutoffTime: cutoffTime,
      });
    }
    return dayArchiveAt(dateStr, normalizeCutoffTime(cutoffTime));
  }
  return slotCutoffAt(dateStr, slot, location);
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
    input.slot,
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
          select: {
            id: true,
            defaultCutoffTime: true,
            dinnerCutoffTime: true,
            dinnerEnabled: true,
          },
        })
      : await db.location.findMany({
          where: { id: { in: locationIds } },
          select: {
            id: true,
            defaultCutoffTime: true,
            dinnerCutoffTime: true,
            dinnerEnabled: true,
          },
        });

  if (locations.length === 0) return;

  const ids = locations.map((l) => l.id);
  const dinnerByLoc = new Map(
    locations.map((l) => [l.id, l.dinnerEnabled]),
  );
  const locById = new Map(locations.map((l) => [l.id, l]));

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

  const rows = templates
    .filter((t) => {
      if (already.has(t.id)) return false;
      if (t.slot === "DINNER" && !dinnerByLoc.get(t.locationId)) return false;
      return true;
    })
    .map((t) => {
      const loc = locById.get(t.locationId);
      const location = {
        defaultCutoffTime: loc?.defaultCutoffTime ?? "14:00",
        dinnerCutoffTime: loc?.dinnerCutoffTime,
        dinnerEnabled: loc?.dinnerEnabled ?? false,
      };
      return {
        locationId: t.locationId,
        date,
        slot: t.slot,
        title: t.title,
        description: t.description,
        price: t.price,
        imageUrl: t.imageUrl,
        catalogItemId: t.catalogItemId,
        isPublished: true,
        skipped: false,
        cutoffAt: slotCutoffAt(dateStr, t.slot, location),
        sourceWeekdayMenuId: t.id,
      };
    });

  if (rows.length > 0) {
    await db.dailyMenu.createMany({ data: rows, skipDuplicates: true });
  }
}

/** Push weekday template edits onto already-materialized daily rows (today+). */
async function syncWeekdayToDailyMenus(
  db: Db,
  weekdayMenuId: string,
  data: {
    slot: "LUNCH" | "DINNER";
    title: string;
    description?: string | null;
    price: number;
    imageUrl?: string | null;
    catalogItemId?: string | null;
    isActive: boolean;
  },
) {
  const fromDate = dhakaDateOnly(todayDateString());
  if (!data.isActive) {
    await db.dailyMenu.updateMany({
      where: {
        sourceWeekdayMenuId: weekdayMenuId,
        date: { gte: fromDate },
        skipped: false,
      },
      data: { skipped: true, isPublished: false },
    });
    return;
  }

  await db.dailyMenu.updateMany({
    where: {
      sourceWeekdayMenuId: weekdayMenuId,
      date: { gte: fromDate },
      skipped: false,
    },
    data: {
      slot: data.slot,
      title: data.title,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      catalogItemId: data.catalogItemId,
      isPublished: true,
    },
  });
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
        /** When creating (no id), also create the same option at these offices. */
        locationIds: z.array(z.string().cuid()).min(1).optional(),
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
        const updated = await ctx.db.weekdayMenu.update({
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
        await syncWeekdayToDailyMenus(ctx.db, updated.id, {
          slot: input.slot,
          title: input.title,
          description: input.description,
          price: input.price,
          imageUrl: input.imageUrl,
          catalogItemId: input.catalogItemId,
          isActive: input.isActive,
        });
        return { count: 1, menus: [updated] };
      }

      const targetIds = Array.from(
        new Set(input.locationIds?.length ? input.locationIds : [input.locationId]),
      );

      for (const locId of targetIds) {
        await assertLocationAccess(
          ctx.db,
          ctx.session.user.id,
          ctx.session.user.role,
          locId,
        );
      }

      const locMeta = await ctx.db.location.findMany({
        where: { id: { in: targetIds } },
        select: { id: true, dinnerEnabled: true, isActive: true, name: true },
      });
      const metaById = new Map(locMeta.map((l) => [l.id, l]));

      const created = [];
      const skipped: string[] = [];
      for (const locId of targetIds) {
        const meta = metaById.get(locId);
        if (!meta) {
          skipped.push(locId);
          continue;
        }
        if (input.slot === "DINNER" && !meta.dinnerEnabled) {
          skipped.push(meta.name);
          continue;
        }
        created.push(
          await ctx.db.weekdayMenu.create({
            data: {
              locationId: locId,
              weekday: input.weekday,
              slot: input.slot,
              title: input.title,
              description: input.description ?? undefined,
              price: input.price,
              imageUrl: input.imageUrl ?? undefined,
              catalogItemId: input.catalogItemId ?? undefined,
              isActive: input.isActive,
            },
          }),
        );
      }

      if (created.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            input.slot === "DINNER"
              ? "Dinner is off at the selected offices — enable Dinner first"
              : "No offices to save to",
        });
      }

      return {
        count: created.length,
        skippedDinner: skipped,
        menus: created,
      };
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

      const fromDate = dhakaDateOnly(todayDateString());

      if (input.id) {
        const existing = await ctx.db.weekdayMenu.findUnique({
          where: { id: input.id },
        });
        if (!existing || existing.locationId !== input.locationId) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }
        await ctx.db.dailyMenu.updateMany({
          where: {
            sourceWeekdayMenuId: existing.id,
            date: { gte: fromDate },
          },
          data: { skipped: true, isPublished: false },
        });
        await ctx.db.weekdayMenu.delete({ where: { id: input.id } });
        return { ok: true as const };
      }

      if (!input.weekday || !input.slot) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "id or weekday+slot required",
        });
      }

      const templates = await ctx.db.weekdayMenu.findMany({
        where: {
          locationId: input.locationId,
          weekday: input.weekday,
          slot: input.slot,
        },
        select: { id: true },
      });
      const templateIds = templates.map((t) => t.id);
      if (templateIds.length > 0) {
        await ctx.db.dailyMenu.updateMany({
          where: {
            sourceWeekdayMenuId: { in: templateIds },
            date: { gte: fromDate },
          },
          data: { skipped: true, isPublished: false },
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

  /**
   * Copy existing weekday template(s) from one office onto other offices.
   * Use for meals created before multi-location save existed.
   */
  weekdayCopyToLocations: adminProcedure
    .input(
      z.object({
        sourceLocationId: z.string().cuid(),
        /** Offices to receive a copy (source is ignored if included). */
        locationIds: z.array(z.string().cuid()).min(1),
        /** If set, copy only this template; otherwise the whole weekly schedule. */
        weekdayMenuId: z.string().cuid().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        input.sourceLocationId,
      );

      const targetIds = Array.from(
        new Set(
          input.locationIds.filter((id) => id !== input.sourceLocationId),
        ),
      );
      if (targetIds.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Pick at least one other office",
        });
      }

      for (const locId of targetIds) {
        await assertLocationAccess(
          ctx.db,
          ctx.session.user.id,
          ctx.session.user.role,
          locId,
        );
      }

      const sources = input.weekdayMenuId
        ? await ctx.db.weekdayMenu.findMany({
            where: {
              id: input.weekdayMenuId,
              locationId: input.sourceLocationId,
            },
          })
        : await ctx.db.weekdayMenu.findMany({
            where: { locationId: input.sourceLocationId, isActive: true },
          });

      if (sources.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: input.weekdayMenuId
            ? "Menu option not found"
            : "No weekly meals at this office to copy",
        });
      }

      const locMeta = await ctx.db.location.findMany({
        where: { id: { in: targetIds } },
        select: { id: true, name: true, dinnerEnabled: true },
      });
      const metaById = new Map(locMeta.map((l) => [l.id, l]));

      let created = 0;
      let skippedExisting = 0;
      const skippedDinner: string[] = [];

      for (const src of sources) {
        for (const locId of targetIds) {
          const meta = metaById.get(locId);
          if (!meta) continue;
          if (src.slot === "DINNER" && !meta.dinnerEnabled) {
            if (!skippedDinner.includes(meta.name)) {
              skippedDinner.push(meta.name);
            }
            continue;
          }

          // Don't duplicate the same title on the same weekday+slot
          const already = await ctx.db.weekdayMenu.findFirst({
            where: {
              locationId: locId,
              weekday: src.weekday,
              slot: src.slot,
              title: { equals: src.title, mode: "insensitive" },
              isActive: true,
            },
            select: { id: true },
          });
          if (already) {
            skippedExisting += 1;
            continue;
          }

          await ctx.db.weekdayMenu.create({
            data: {
              locationId: locId,
              weekday: src.weekday,
              slot: src.slot,
              title: src.title,
              description: src.description,
              price: src.price,
              imageUrl: src.imageUrl,
              catalogItemId: src.catalogItemId,
              isActive: src.isActive,
            },
          });
          created += 1;
        }
      }

      // Materialize for each office's current orderable day so Today updates now
      const now = new Date();
      await Promise.all(
        targetIds.map(async (locId) => {
          const meta = metaById.get(locId);
          if (!meta) return;
          const loc = await ctx.db.location.findUnique({
            where: { id: locId },
            select: {
              defaultCutoffTime: true,
              dinnerCutoffTime: true,
              dinnerEnabled: true,
            },
          });
          const window = getServiceOrderWindow(now, {
            defaultCutoffTime: loc?.defaultCutoffTime ?? "14:00",
            dinnerCutoffTime: loc?.dinnerCutoffTime,
            dinnerEnabled: loc?.dinnerEnabled,
          });
          await ensureMenusForDate(ctx.db, [locId], window.orderDate);
          if (loc?.dinnerEnabled) {
            const lunchDate = orderableDateForSlot(now, {
              defaultCutoffTime: loc.defaultCutoffTime,
              dinnerCutoffTime: loc.dinnerCutoffTime,
              dinnerEnabled: true,
              slot: "LUNCH",
            });
            if (lunchDate !== window.orderDate) {
              await ensureMenusForDate(ctx.db, [locId], lunchDate);
            }
          }
        }),
      );

      return {
        created,
        skippedExisting,
        skippedDinner,
        sourceCount: sources.length,
        officeCount: targetIds.length,
      };
    }),

  /**
   * Copy published daily meals for a date from one office to others
   * (one-offs that aren't weekday templates).
   */
  dailyCopyToLocations: adminProcedure
    .input(
      z.object({
        sourceLocationId: z.string().cuid(),
        locationIds: z.array(z.string().cuid()).min(1),
        date: z.string().regex(dateRegex),
        dailyMenuId: z.string().cuid().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertLocationAccess(
        ctx.db,
        ctx.session.user.id,
        ctx.session.user.role,
        input.sourceLocationId,
      );

      const targetIds = Array.from(
        new Set(
          input.locationIds.filter((id) => id !== input.sourceLocationId),
        ),
      );
      if (targetIds.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Pick at least one other office",
        });
      }

      for (const locId of targetIds) {
        await assertLocationAccess(
          ctx.db,
          ctx.session.user.id,
          ctx.session.user.role,
          locId,
        );
      }

      const date = dhakaDateOnly(input.date);
      const sources = await ctx.db.dailyMenu.findMany({
        where: {
          locationId: input.sourceLocationId,
          date,
          skipped: false,
          ...(input.dailyMenuId ? { id: input.dailyMenuId } : {}),
        },
      });

      if (sources.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No meals on this date at the source office",
        });
      }

      const locRows = await ctx.db.location.findMany({
        where: { id: { in: targetIds } },
        select: {
          id: true,
          name: true,
          dinnerEnabled: true,
          defaultCutoffTime: true,
          dinnerCutoffTime: true,
        },
      });
      const locById = new Map(locRows.map((l) => [l.id, l]));

      let created = 0;
      let skippedExisting = 0;
      const skippedDinner: string[] = [];

      for (const src of sources) {
        for (const locId of targetIds) {
          const office = locById.get(locId);
          if (!office) continue;
          if (src.slot === "DINNER" && !office.dinnerEnabled) {
            if (!skippedDinner.includes(office.name)) {
              skippedDinner.push(office.name);
            }
            continue;
          }

          const already = await ctx.db.dailyMenu.findFirst({
            where: {
              locationId: locId,
              date,
              slot: src.slot,
              title: { equals: src.title, mode: "insensitive" },
              skipped: false,
            },
            select: { id: true },
          });
          if (already) {
            skippedExisting += 1;
            continue;
          }

          await saveDailyMenu(ctx.db, {
            locationId: locId,
            date: input.date,
            slot: src.slot,
            title: src.title,
            description: src.description,
            price: src.price,
            imageUrl: src.imageUrl,
            catalogItemId: src.catalogItemId,
            isPublished: src.isPublished,
            cutoffTime: locationCutoffForSlot(office, src.slot),
            // Don't link to source weekday template — this is a dated copy
            sourceWeekdayMenuId: null,
          });
          created += 1;
        }
      }

      return {
        created,
        skippedExisting,
        skippedDinner,
        sourceCount: sources.length,
        officeCount: targetIds.length,
      };
    }),

  orderWindow: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        location: {
          select: {
            defaultCutoffTime: true,
            dinnerCutoffTime: true,
            dinnerEnabled: true,
          },
        },
      },
    });
    const lunchCutoff = normalizeCutoffTime(user?.location?.defaultCutoffTime);
    const dinnerCutoff = locationCutoffForSlot(
      {
        defaultCutoffTime: lunchCutoff,
        dinnerCutoffTime: user?.location?.dinnerCutoffTime,
      },
      "DINNER",
    );
    const dinnerEnabled = Boolean(user?.location?.dinnerEnabled);
    const service = getServiceOrderWindow(new Date(), {
      defaultCutoffTime: lunchCutoff,
      dinnerCutoffTime: dinnerCutoff,
      dinnerEnabled,
    });
    const lunch = getOrderWindow(new Date(), lunchCutoff);
    const dinner = {
      ...getOrderWindow(new Date(), dinnerCutoff),
      orderDate: orderableDateForSlot(new Date(), {
        defaultCutoffTime: lunchCutoff,
        dinnerCutoffTime: dinnerCutoff,
        dinnerEnabled,
        slot: "DINNER",
      }),
    };
    return {
      ...service,
      lunchCutoffTime: lunchCutoff,
      dinnerCutoffTime: dinnerCutoff,
      dinnerEnabled,
      lunchWindow: lunch,
      dinnerWindow: dinner,
    };
  }),

  todayForUser: protectedProcedure
    .input(
      z
        .object({
          /**
           * Browse a single calendar day (both slots).
           * Omit for live ordering: lunch/dinner each use their own orderable date.
           */
          date: z.string().regex(dateRegex).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        location: {
          select: {
            id: true,
            name: true,
            defaultCutoffTime: true,
            dinnerCutoffTime: true,
            dinnerEnabled: true,
          },
        },
        adminLocations: { select: { locationId: true } },
      },
    });

    const now = new Date();
    const ownCutoff = normalizeCutoffTime(user?.location?.defaultCutoffTime);
    const ownDinnerCutoff = locationCutoffForSlot(
      {
        defaultCutoffTime: ownCutoff,
        dinnerCutoffTime: user?.location?.dinnerCutoffTime,
      },
      "DINNER",
    );
    const ownDinnerEnabled = Boolean(user?.location?.dinnerEnabled);
    const ownLocCutoffs = {
      defaultCutoffTime: ownCutoff,
      dinnerCutoffTime: ownDinnerCutoff,
      dinnerEnabled: ownDinnerEnabled,
    };
    const ownWindow = getServiceOrderWindow(now, ownLocCutoffs);
    const liveLunchDate = orderableDateForSlot(now, {
      ...ownLocCutoffs,
      slot: "LUNCH",
    });
    const liveDinnerDate = orderableDateForSlot(now, {
      ...ownLocCutoffs,
      slot: "DINNER",
    });
    const ownDinnerWindow = {
      ...getOrderWindow(now, ownDinnerCutoff),
      orderDate: liveDinnerDate,
    };
    const minDate = earliestOrderableDate(now, ownLocCutoffs);
    const maxDate = latestBrowseDate(now);

    const requested = input?.date;
    const browsing =
      Boolean(requested) &&
      requested! >= minDate &&
      requested! <= maxDate;
    const selectedDate = browsing ? requested! : ownWindow.orderDate;
    const mode = browsing ? ("date" as const) : ("live" as const);

    const empty = {
      menus: [] as never[],
      locationName: null as string | null,
      locationId: null as string | null,
      scope: "none" as const,
      window: ownWindow,
      dinnerWindow: ownDinnerWindow,
      selectedDate,
      lunchDate: browsing ? selectedDate : liveLunchDate,
      dinnerDate: browsing ? selectedDate : liveDinnerDate,
      mode,
      minDate,
      maxDate,
      dayOff: null as null | { active: true; message: string; date: string },
    };

    if (!user?.profileComplete) {
      return empty;
    }

    // Day-off only blocks browse of that day, or live when the service day is off.
    const dayOffCheckDate = browsing ? selectedDate : ownWindow.orderDate;
    const dayOff = await isServiceDayOff(ctx.db, dayOffCheckDate);
    if (dayOff) {
      return {
        ...empty,
        locationName: user.location?.name ?? null,
        locationId: user.locationId,
        scope: "own" as const,
        dayOff: {
          active: true as const,
          message: dayOff.message,
          date: dayOffCheckDate,
        },
      };
    }

    let locationIds: string[] | "all" = [];
    let scope: "own" | "admin" | "all" = "own";

    if (user.locationId) {
      locationIds = [user.locationId];
      scope = "own";
    } else if (user.role === "ADMIN" && user.adminLocations.length > 0) {
      locationIds = user.adminLocations.map((a) => a.locationId);
      scope = "admin";
    } else {
      locationIds = "all";
      scope = "all";
    }

    const locations =
      locationIds === "all"
        ? await ctx.db.location.findMany({
            where: { isActive: true },
            select: {
              id: true,
              defaultCutoffTime: true,
              dinnerCutoffTime: true,
              dinnerEnabled: true,
            },
          })
        : await ctx.db.location.findMany({
            where: { id: { in: locationIds } },
            select: {
              id: true,
              defaultCutoffTime: true,
              dinnerCutoffTime: true,
              dinnerEnabled: true,
            },
          });

    const datesToEnsure = new Set<string>();
    if (browsing) {
      datesToEnsure.add(selectedDate);
    } else {
      for (const loc of locations) {
        datesToEnsure.add(
          orderableDateForSlot(now, { ...loc, slot: "LUNCH" }),
        );
        if (loc.dinnerEnabled) {
          datesToEnsure.add(
            orderableDateForSlot(now, { ...loc, slot: "DINNER" }),
          );
        }
      }
    }

    await Promise.all(
      [...datesToEnsure].map((d) =>
        ensureMenusForDate(
          ctx.db,
          locations.map((l) => l.id),
          d,
        ),
      ),
    );

    const menusByLoc = (
      await Promise.all(
        locations.map(async (loc) => {
          if (browsing) {
            return ctx.db.dailyMenu.findMany({
              where: {
                locationId: loc.id,
                date: dhakaDateOnly(selectedDate),
                isPublished: true,
                skipped: false,
                ...(loc.dinnerEnabled
                  ? {}
                  : { slot: { not: "DINNER" as const } }),
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
              orderBy: [{ slot: "asc" }, { createdAt: "asc" }],
            });
          }

          const lunchDate = orderableDateForSlot(now, {
            ...loc,
            slot: "LUNCH",
          });
          const lunchMenus = await ctx.db.dailyMenu.findMany({
            where: {
              locationId: loc.id,
              date: dhakaDateOnly(lunchDate),
              slot: "LUNCH",
              isPublished: true,
              skipped: false,
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
            orderBy: { createdAt: "asc" },
          });

          if (!loc.dinnerEnabled) return lunchMenus;

          const dinnerDate = orderableDateForSlot(now, {
            ...loc,
            slot: "DINNER",
          });
          const dinnerMenus = await ctx.db.dailyMenu.findMany({
            where: {
              locationId: loc.id,
              date: dhakaDateOnly(dinnerDate),
              slot: "DINNER",
              isPublished: true,
              skipped: false,
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
            orderBy: { createdAt: "asc" },
          });

          return [...lunchMenus, ...dinnerMenus];
        }),
      )
    ).flat();

    menusByLoc.sort((a, b) => {
      const slotOrder = a.slot.localeCompare(b.slot);
      if (slotOrder !== 0) return slotOrder;
      const byName = a.location.name.localeCompare(b.location.name);
      if (byName !== 0) return byName;
      return a.title.localeCompare(b.title);
    });

    let menusForUser = menusByLoc;
    if (!user.locationId && scope === "all") {
      menusForUser = [...menusByLoc].sort((a, b) => {
        const aOrdered = a.orders.length > 0 ? 0 : 1;
        const bOrdered = b.orders.length > 0 ? 0 : 1;
        return aOrdered - bOrdered;
      });
      const seen = new Set<string>();
      menusForUser = menusForUser.filter((m) => {
        const key = `${m.slot}|${m.title.trim().toLowerCase()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      menusForUser.sort((a, b) => a.slot.localeCompare(b.slot));
    }

    return {
      locationName: user.location?.name ?? null,
      locationId: user.locationId,
      scope,
      window: ownWindow,
      dinnerWindow: ownDinnerWindow,
      selectedDate,
      lunchDate: browsing ? selectedDate : liveLunchDate,
      dinnerDate: browsing ? selectedDate : liveDinnerDate,
      mode,
      minDate,
      maxDate,
      dayOff: null as null | { active: true; message: string; date: string },
      menus: menusForUser.map((m) => {
        const menuDateStr = formatInTimeZone(m.date, "UTC", "yyyy-MM-dd");
        const locCutoff = locationCutoffForSlot(m.location, m.slot);
        const cutoff = slotCutoffAt(menuDateStr, m.slot, {
          defaultCutoffTime: m.location.defaultCutoffTime,
          dinnerCutoffTime: m.location.dinnerCutoffTime,
          dinnerEnabled: m.location.dinnerEnabled,
        });
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
          skipped: false,
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
        /** When creating (no id), also publish at these offices. */
        locationIds: z.array(z.string().cuid()).min(1).optional(),
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
        select: {
          defaultCutoffTime: true,
          dinnerCutoffTime: true,
          dinnerEnabled: true,
        },
      });
      if (input.slot === "DINNER" && !loc?.dinnerEnabled) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Dinner is turned off for this office — enable Dinner on the Menu page first",
        });
      }

      const cutoffTime = normalizeCutoffTime(
        input.cutoffTime ??
          (loc
            ? locationCutoffForSlot(loc, input.slot)
            : undefined),
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
          officeCount: 1,
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

      const targetIds = Array.from(
        new Set(input.locationIds?.length ? input.locationIds : [input.locationId]),
      );

      for (const locId of targetIds) {
        await assertLocationAccess(
          ctx.db,
          ctx.session.user.id,
          ctx.session.user.role,
          locId,
        );
      }

      const locRows = await ctx.db.location.findMany({
        where: { id: { in: targetIds } },
        select: {
          id: true,
          name: true,
          defaultCutoffTime: true,
          dinnerCutoffTime: true,
          dinnerEnabled: true,
        },
      });
      const locById = new Map(locRows.map((l) => [l.id, l]));

      const results = [];
      const skippedDinner: string[] = [];
      for (const locId of targetIds) {
        const office = locById.get(locId);
        if (!office) continue;
        if (input.slot === "DINNER" && !office.dinnerEnabled) {
          skippedDinner.push(office.name);
          continue;
        }
        const officeCutoff = normalizeCutoffTime(
          input.cutoffTime ?? locationCutoffForSlot(office, input.slot),
        );
        for (const d of dates) {
          results.push(
            await saveDailyMenu(ctx.db, {
              locationId: locId,
              date: d,
              slot: input.slot,
              title: input.title,
              description: input.description,
              price: input.price,
              imageUrl: input.imageUrl,
              catalogItemId: input.catalogItemId,
              isPublished: input.isPublished,
              cutoffTime: officeCutoff,
            }),
          );
        }
      }

      if (results.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            input.slot === "DINNER"
              ? "Dinner is off at the selected offices — enable Dinner first"
              : "No meals published",
        });
      }

      const officeCount = new Set(results.map((m) => m.locationId)).size;

      return {
        count: results.length,
        officeCount,
        skippedDinner,
        startDate: dates[0],
        endDate: dates[dates.length - 1],
        rolloverNote: `Orders close at each office's cutoff Asia/Dhaka; after that, employees order for the next day.`,
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

      // Weekday-sourced rows are recreated by ensureMenusForDate unless we keep
      // a skipped placeholder for that template+date.
      if (existing.sourceWeekdayMenuId) {
        await ctx.db.dailyMenu.update({
          where: { id: input.id },
          data: { skipped: true, isPublished: false },
        });
      } else {
        await ctx.db.dailyMenu.delete({ where: { id: input.id } });
      }
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
          dinnerCutoffTime: true,
          dinnerEnabled: true,
        },
      });
      if (!loc) throw new TRPCError({ code: "NOT_FOUND" });

      const window = getServiceOrderWindow(new Date(), loc);
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
          skipped: false,
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
