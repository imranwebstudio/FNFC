import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  parsePhoneForStorage,
  phoneNumberSchema,
} from "~/lib/phone";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

function uniqueSorted(values: Array<string | null | undefined>) {
  return Array.from(
    new Set(
      values
        .map((v) => v?.trim())
        .filter((v): v is string => Boolean(v)),
    ),
  ).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        location: true,
        adminLocations: { include: { location: true } },
      },
    });
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    return {
      ...user,
      due: Math.max(0, -user.balance),
      /** True once a catering zone is set (office selection or admin) */
      zoneAssigned: Boolean(user.locationId),
    };
  }),

  onboardingOptions: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      where: { profileComplete: true },
      select: {
        employeeId: true,
        phoneNumber: true,
        deskNumber: true,
        buildingNumber: true,
        floorNumber: true,
        locationLabel: true,
      },
      take: 500,
    });

    return {
      /** Free-text address suggestions (not the catering zone) */
      locations: uniqueSorted(users.map((u) => u.locationLabel)),
      employeeIds: uniqueSorted(users.map((u) => u.employeeId)),
      phoneNumbers: uniqueSorted(users.map((u) => u.phoneNumber)),
      deskNumbers: uniqueSorted(users.map((u) => u.deskNumber)),
      buildingNumbers: uniqueSorted(users.map((u) => u.buildingNumber)),
      floorNumbers: uniqueSorted(users.map((u) => u.floorNumber)),
    };
  }),

  completeProfile: protectedProcedure
    .input(
      z.object({
        employeeId: z.string().min(1).max(64),
        phoneNumber: phoneNumberSchema,
        deskNumber: z.string().min(1).max(32),
        /** Active office from Staff locations — also sets catering zone */
        locationId: z.string().cuid(),
        floorNumber: z.string().min(1).max(32),
        /** Free-text street / desk address detail */
        locationName: z.string().min(1).max(120),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const locationLabel = input.locationName.trim();
      const phoneNumber = parsePhoneForStorage(input.phoneNumber);

      const office = await ctx.db.location.findFirst({
        where: { id: input.locationId, isActive: true },
        select: { id: true, name: true },
      });
      if (!office) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Select a valid office / building from the list",
        });
      }

      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          employeeId: input.employeeId.trim(),
          phoneNumber,
          deskNumber: input.deskNumber.trim(),
          buildingNumber: office.name,
          floorNumber: input.floorNumber.trim(),
          locationLabel,
          locationId: office.id,
          profileComplete: true,
        },
      });
    }),

  updatePhone: protectedProcedure
    .input(z.object({ phoneNumber: phoneNumberSchema }))
    .mutation(async ({ ctx, input }) => {
      const phoneNumber = parsePhoneForStorage(input.phoneNumber);
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { phoneNumber },
        select: { phoneNumber: true },
      });
    }),

  listLocationsPublic: protectedProcedure.query(({ ctx }) =>
    ctx.db.location.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, address: true },
    }),
  ),
});
