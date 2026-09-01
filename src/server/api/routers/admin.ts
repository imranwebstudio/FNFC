import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { parsePhoneForStorage, phoneNumberSchema } from "~/lib/phone";
import {
  adminProcedure,
  assertLocationAccess,
  createTRPCRouter,
  superAdminProcedure,
} from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  listUsers: adminProcedure
    .input(
      z
        .object({
          locationId: z.string().cuid().optional(),
          search: z.string().max(80).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const locationId = input?.locationId;

      if (locationId) {
        await assertLocationAccess(
          ctx.db,
          ctx.session.user.id,
          ctx.session.user.role,
          locationId,
        );
      } else if (ctx.session.user.role !== "SUPER_ADMIN") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "locationId required",
        });
      }

      return ctx.db.user.findMany({
        where: {
          ...(locationId ? { locationId } : {}),
          ...(input?.search
            ? {
                OR: [
                  { name: { contains: input.search, mode: "insensitive" } },
                  { email: { contains: input.search, mode: "insensitive" } },
                  {
                    employeeId: {
                      contains: input.search,
                      mode: "insensitive",
                    },
                  },
                ],
              }
            : {}),
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          employeeId: true,
          deskNumber: true,
          buildingNumber: true,
          floorNumber: true,
          locationId: true,
          paymentMode: true,
          balance: true,
          profileComplete: true,
          isBanned: true,
          location: { select: { id: true, name: true } },
          adminLocations: {
            select: { locationId: true, location: { select: { name: true } } },
          },
        },
        orderBy: [{ floorNumber: "asc" }, { deskNumber: "asc" }],
        take: 200,
      });
    }),

  setRole: superAdminProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (
        input.userId === ctx.session.user.id &&
        input.role !== "SUPER_ADMIN"
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot demote yourself",
        });
      }
      return ctx.db.user.update({
        where: { id: input.userId },
        data: { role: input.role },
      });
    }),

  assignLocation: superAdminProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        locationId: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: { id: input.userId },
        data: { role: "ADMIN" },
      });
      return ctx.db.adminLocation.upsert({
        where: {
          userId_locationId: {
            userId: input.userId,
            locationId: input.locationId,
          },
        },
        create: {
          userId: input.userId,
          locationId: input.locationId,
        },
        update: {},
      });
    }),

  removeLocationAssignment: superAdminProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        locationId: z.string().cuid(),
      }),
    )
    .mutation(({ ctx, input }) =>
      ctx.db.adminLocation.delete({
        where: {
          userId_locationId: {
            userId: input.userId,
            locationId: input.locationId,
          },
        },
      }),
    ),

  setBanned: superAdminProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        isBanned: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.userId === ctx.session.user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot ban yourself",
        });
      }
      const target = await ctx.db.user.findUnique({
        where: { id: input.userId },
        select: { role: true },
      });
      if (!target) throw new TRPCError({ code: "NOT_FOUND" });
      if (target.role === "SUPER_ADMIN" && input.isBanned) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot ban a super admin",
        });
      }

      const updated = await ctx.db.user.update({
        where: { id: input.userId },
        data: { isBanned: input.isBanned },
      });

      if (input.isBanned) {
        await ctx.db.session.deleteMany({ where: { userId: input.userId } });
      }

      return updated;
    }),

  setUserPhone: adminProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        phoneNumber: phoneNumberSchema,
      }),
    )
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

      const phoneNumber = parsePhoneForStorage(input.phoneNumber);
      return ctx.db.user.update({
        where: { id: target.id },
        data: { phoneNumber },
        select: { id: true, phoneNumber: true },
      });
    }),
});
