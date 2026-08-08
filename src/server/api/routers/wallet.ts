import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { dueFromBalance } from "~/lib/datetime";
import {
  adminProcedure,
  assertLocationAccess,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const walletRouter = createTRPCRouter({
  summary: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { balance: true, paymentMode: true },
    });
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    return {
      balance: user.balance,
      due: dueFromBalance(user.balance),
      paymentMode: user.paymentMode,
    };
  }),

  listMine: protectedProcedure
    .input(z.object({ limit: z.number().int().min(1).max(100).default(30) }).optional())
    .query(({ ctx, input }) =>
      ctx.db.walletTransaction.findMany({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: "desc" },
        take: input?.limit ?? 30,
      }),
    ),

  deposit: adminProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        amount: z.number().int().positive(),
        note: z.string().max(300).optional(),
        asDuePayment: z.boolean().default(false),
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

      return ctx.db.$transaction(async (tx) => {
        const updated = await tx.user.update({
          where: { id: target.id },
          data: {
            balance: { increment: input.amount },
            paymentMode: "WALLET",
          },
        });
        return tx.walletTransaction.create({
          data: {
            userId: target.id,
            type: input.asDuePayment ? "DUE_PAYMENT" : "DEPOSIT",
            amount: input.amount,
            balanceAfter: updated.balance,
            createdById: ctx.session.user.id,
            note: input.note,
          },
        });
      });
    }),

  setPaymentMode: adminProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
        paymentMode: z.enum(["CASH", "WALLET"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const target = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });
      if (!target) throw new TRPCError({ code: "NOT_FOUND" });

      if (ctx.session.user.role !== "SUPER_ADMIN" && target.locationId) {
        await assertLocationAccess(
          ctx.db,
          ctx.session.user.id,
          ctx.session.user.role,
          target.locationId,
        );
      }

      return ctx.db.user.update({
        where: { id: input.userId },
        data: { paymentMode: input.paymentMode },
      });
    }),
});
