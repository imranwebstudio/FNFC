import { TRPCError } from "@trpc/server";
import { z } from "zod";

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
        defaultCutoffTime: z.string().regex(cutoffRegex).default("11:00"),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.location.create({
        data: {
          name: input.name,
          address: input.address,
          defaultCutoffTime: input.defaultCutoffTime,
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
      return ctx.db.location.update({
        where: { id: input.locationId },
        data: { defaultCutoffTime: input.defaultCutoffTime },
      });
    }),
});
