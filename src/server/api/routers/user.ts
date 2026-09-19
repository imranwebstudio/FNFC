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
      /** True once an admin has assigned a catering zone */
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
      /** Suggestions only — free-text location is never forced to a zone */
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
        buildingNumber: z.string().min(1).max(64),
        floorNumber: z.string().min(1).max(32),
        /** Free-text office / address — admin assigns the catering zone later */
        locationName: z.string().min(1).max(120),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const locationLabel = input.locationName.trim();
      const phoneNumber = parsePhoneForStorage(input.phoneNumber);

      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          employeeId: input.employeeId.trim(),
          phoneNumber,
          deskNumber: input.deskNumber.trim(),
          buildingNumber: input.buildingNumber.trim(),
          floorNumber: input.floorNumber.trim(),
          locationLabel,
          // Do not auto-create Location / assign zone — admin does that
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
