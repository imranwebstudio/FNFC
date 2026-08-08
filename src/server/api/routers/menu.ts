import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { getCloudinaryUploadSignature } from "~/lib/cloudinary";
import {
  cutoffFromTime,
  dhakaDateOnly,
  todayDateString,
} from "~/lib/datetime";
import {
  adminProcedure,
  assertLocationAccess,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

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
      };
    }

    const date = dhakaDateOnly(todayDateString());
    let locationFilter: { locationId?: string | { in: string[] } } = {};
    let scope: "own" | "admin" | "all" = "own";

    if (user.role === "SUPER_ADMIN") {
      // Super admins see every published meal today so publish is verifiable
      locationFilter = {};
      scope = "all";
    } else if (user.role === "ADMIN") {
      const ids = new Set<string>(
        user.adminLocations.map((a) => a.locationId),
      );
      if (user.locationId) ids.add(user.locationId);
      locationFilter = { locationId: { in: Array.from(ids) } };
      scope = "admin";
    } else if (user.locationId) {
      locationFilter = { locationId: user.locationId };
      scope = "own";
    } else {
      return {
        menus: [],
        locationName: null,
        locationId: null,
        scope: "none" as const,
      };
    }

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

    return {
      locationName: user.location?.name ?? null,
      locationId: user.locationId,
      scope,
      menus: menus.map((m) => {
        const cutoff =
          m.cutoffAt ??
          cutoffFromTime(todayDateString(), m.location.defaultCutoffTime);
        return {
          ...m,
          effectiveCutoffAt: cutoff,
          isPastCutoff: new Date() > cutoff,
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
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
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
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
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

      const date = dhakaDateOnly(input.date);
      const cutoffAt = input.cutoffTime
        ? cutoffFromTime(input.date, input.cutoffTime)
        : null;

      return ctx.db.dailyMenu.upsert({
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
          description: input.description,
          price: input.price,
          imageUrl: input.imageUrl ?? undefined,
          catalogItemId: input.catalogItemId ?? undefined,
          cutoffAt: cutoffAt ?? undefined,
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
