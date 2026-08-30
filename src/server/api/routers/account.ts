import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { buildAccountStatement } from "~/lib/build-account-statement";
import {
  adminProcedure,
  assertLocationAccess,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import type { db as DbClient } from "~/server/db";

const orderInclude = {
  dailyMenu: { select: { title: true, slot: true, date: true } },
  location: { select: { name: true } },
  placedBy: { select: { name: true, email: true } },
} as const;

const walletInclude = {
  createdBy: { select: { name: true, email: true } },
} as const;

async function fetchStatementForUser(db: typeof DbClient, userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { balance: true, paymentMode: true },
  });
  if (!user) throw new TRPCError({ code: "NOT_FOUND" });

  const [orders, walletTxs] = await Promise.all([
    db.order.findMany({
      where: { userId },
      include: orderInclude,
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    db.walletTransaction.findMany({
      where: { userId },
      include: walletInclude,
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
  ]);

  return buildAccountStatement({
    balance: user.balance,
    paymentMode: user.paymentMode,
    orders,
    walletTxs,
  });
}

export const accountRouter = createTRPCRouter({
  myStatement: protectedProcedure.query(async ({ ctx }) =>
    fetchStatementForUser(ctx.db, ctx.session.user.id),
  ),

  userStatement: adminProcedure
    .input(z.object({ userId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const target = await ctx.db.user.findUnique({
        where: { id: input.userId },
        select: {
          id: true,
          name: true,
          email: true,
          employeeId: true,
          balance: true,
          paymentMode: true,
          locationId: true,
          location: { select: { name: true } },
        },
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

      const statement = await fetchStatementForUser(ctx.db, input.userId);
      return {
        user: target,
        ...statement,
      };
    }),
});
