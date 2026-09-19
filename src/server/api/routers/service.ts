import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  dhakaDateOnly,
  formatMenuDateLabel,
  getOrderWindow,
  todayDateString,
} from "~/lib/datetime";
import { type db as DbClient } from "~/server/db";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const DEFAULT_DAY_OFF_MESSAGE =
  "We're taking the day off today. Please check back tomorrow for delicious meals!";

type Db = typeof DbClient;

export async function isServiceDayOff(db: Db, dateStr: string) {
  const row = await db.serviceDayOff.findUnique({
    where: { date: dhakaDateOnly(dateStr) },
    select: { message: true },
  });
  if (!row) return null;
  return {
    message: row.message?.trim() || DEFAULT_DAY_OFF_MESSAGE,
  };
}

export async function assertNotDayOff(db: Db, dateStr: string) {
  const off = await isServiceDayOff(db, dateStr);
  if (off) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: off.message,
    });
  }
}

export const serviceRouter = createTRPCRouter({
  dayOffStatus: protectedProcedure
    .input(
      z
        .object({
          date: z.string().regex(dateRegex).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const dateStr = input?.date ?? todayDateString();
      const off = await isServiceDayOff(ctx.db, dateStr);
      return {
        date: dateStr,
        dateLabel: formatMenuDateLabel(dateStr),
        isOff: Boolean(off),
        message: off?.message ?? DEFAULT_DAY_OFF_MESSAGE,
      };
    }),

  adminDayOffTarget: adminProcedure.query(async ({ ctx }) => {
    const window = getOrderWindow(new Date(), "14:00");
    const dateStr = window.orderDate;
    const off = await isServiceDayOff(ctx.db, dateStr);
    return {
      date: dateStr,
      dateLabel: formatMenuDateLabel(dateStr),
      rolledOver: window.rolledOver,
      isOff: Boolean(off),
      message: off?.message ?? DEFAULT_DAY_OFF_MESSAGE,
    };
  }),

  setDayOff: adminProcedure
    .input(
      z.object({
        date: z.string().regex(dateRegex),
        off: z.boolean(),
        message: z.string().max(280).optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const date = dhakaDateOnly(input.date);
      if (!input.off) {
        await ctx.db.serviceDayOff.deleteMany({ where: { date } });
        return {
          date: input.date,
          isOff: false as const,
          message: DEFAULT_DAY_OFF_MESSAGE,
        };
      }

      const message = input.message?.trim() || DEFAULT_DAY_OFF_MESSAGE;
      const row = await ctx.db.serviceDayOff.upsert({
        where: { date },
        create: { date, message },
        update: { message },
      });

      return {
        date: input.date,
        isOff: true as const,
        message: row.message ?? DEFAULT_DAY_OFF_MESSAGE,
      };
    }),
});
