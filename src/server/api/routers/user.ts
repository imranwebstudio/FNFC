import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  formatPhoneForStorage,
  isValidPhoneNumber,
  normalizePhoneNumber,
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
    };
  }),

  onboardingOptions: protectedProcedure.query(async ({ ctx }) => {
    const [locations, users] = await Promise.all([
      ctx.db.location.findMany({
        where: { isActive: true },
        select: { name: true },
        orderBy: { name: "asc" },
      }),
      ctx.db.user.findMany({
        where: { profileComplete: true },
        select: {
          employeeId: true,
          phoneNumber: true,
          deskNumber: true,
          buildingNumber: true,
          floorNumber: true,
        },
        take: 500,
      }),
    ]);

    return {
      locations: uniqueSorted(locations.map((l) => l.name)),
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
        phoneNumber: z
          .string()
          .min(1, "Phone number is required")
          .max(20)
          .refine((v) => isValidPhoneNumber(v), {
            message: "Enter a valid Bangladesh mobile number (e.g. 01712345678)",
          }),
        deskNumber: z.string().min(1).max(32),
        buildingNumber: z.string().min(1).max(64),
        floorNumber: z.string().min(1).max(32),
        /** Office / site name — select existing or type a new one */
        locationName: z.string().min(1).max(120),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const locationName = input.locationName.trim();
      const phoneNumber = formatPhoneForStorage(normalizePhoneNumber(input.phoneNumber));

      let location = await ctx.db.location.findFirst({
        where: {
          isActive: true,
          name: { equals: locationName, mode: "insensitive" },
        },
      });

      if (!location) {
        location = await ctx.db.location.create({
          data: {
            name: locationName,
            defaultCutoffTime: "14:00",
          },
        });
      }

      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          employeeId: input.employeeId.trim(),
          phoneNumber,
          deskNumber: input.deskNumber.trim(),
          buildingNumber: input.buildingNumber.trim(),
          floorNumber: input.floorNumber.trim(),
          locationId: location.id,
          profileComplete: true,
        },
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
