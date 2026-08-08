import { adminRouter } from "~/server/api/routers/admin";
import { analyticsRouter } from "~/server/api/routers/analytics";
import { locationRouter } from "~/server/api/routers/location";
import { menuRouter } from "~/server/api/routers/menu";
import { orderRouter } from "~/server/api/routers/order";
import { userRouter } from "~/server/api/routers/user";
import { walletRouter } from "~/server/api/routers/wallet";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  location: locationRouter,
  menu: menuRouter,
  order: orderRouter,
  wallet: walletRouter,
  admin: adminRouter,
  analytics: analyticsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
