import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "~/env";
import { db } from "~/server/db";
import type { PaymentMode, Role } from "../../../generated/prisma";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      profileComplete: boolean;
      paymentMode: PaymentMode;
      balance: number;
      locationId: string | null;
    } & DefaultSession["user"];
  }
}

const googleConfigured =
  Boolean(env.AUTH_GOOGLE_ID) && Boolean(env.AUTH_GOOGLE_SECRET);

export const authConfig = {
  providers: [
    ...(googleConfigured
      ? [
          GoogleProvider({
            clientId: env.AUTH_GOOGLE_ID!,
            clientSecret: env.AUTH_GOOGLE_SECRET!,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
  ],
  adapter: PrismaAdapter(db) as NextAuthConfig["adapter"],
  pages: {
    signIn: "/",
  },
  events: {
    async createUser({ user }) {
      if (
        env.SUPER_ADMIN_EMAIL &&
        user.email?.toLowerCase() === env.SUPER_ADMIN_EMAIL.toLowerCase()
      ) {
        await db.user.update({
          where: { id: user.id },
          data: { role: "SUPER_ADMIN" },
        });
      }
    },
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.id) return true;
      try {
        // Raw SQL so a stale Prisma client can't break Google login
        const rows = await db.$queryRaw<Array<{ isBanned: boolean }>>`
          SELECT "isBanned" FROM "User" WHERE id = ${user.id} LIMIT 1
        `;
        if (rows[0]?.isBanned) return false;
      } catch (err) {
        console.error("[auth] signIn ban check failed", err);
      }
      return true;
    },
    async session({ session, user }) {
      let dbUser: {
        id: string;
        role: Role;
        profileComplete: boolean;
        paymentMode: PaymentMode;
        balance: number;
        locationId: string | null;
        email: string | null;
        isBanned: boolean;
      } | null = null;

      try {
        dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            role: true,
            profileComplete: true,
            paymentMode: true,
            balance: true,
            locationId: true,
            email: true,
            isBanned: true,
          },
        });
      } catch (err) {
        console.error("[auth] session user lookup failed", err);
        try {
          const rows = await db.$queryRaw<
            Array<{
              id: string;
              role: Role;
              profileComplete: boolean;
              paymentMode: PaymentMode;
              balance: number;
              locationId: string | null;
              email: string | null;
              isBanned: boolean;
            }>
          >`
            SELECT id, role, "profileComplete", "paymentMode", balance, "locationId", email, "isBanned"
            FROM "User" WHERE id = ${user.id} LIMIT 1
          `;
          dbUser = rows[0] ?? null;
        } catch (rawErr) {
          console.error("[auth] session raw lookup failed", rawErr);
        }
      }

      if (dbUser?.isBanned) {
        await db.session
          .deleteMany({ where: { userId: user.id } })
          .catch(() => undefined);
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
            role: "USER" as Role,
            profileComplete: false,
            paymentMode: "CASH" as PaymentMode,
            balance: 0,
            locationId: null,
          },
        };
      }

      if (
        dbUser &&
        env.SUPER_ADMIN_EMAIL &&
        dbUser.email?.toLowerCase() === env.SUPER_ADMIN_EMAIL.toLowerCase() &&
        dbUser.role !== "SUPER_ADMIN"
      ) {
        await db.user.update({
          where: { id: dbUser.id },
          data: { role: "SUPER_ADMIN" },
        });
        dbUser.role = "SUPER_ADMIN";
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: dbUser?.role ?? "USER",
          profileComplete: dbUser?.profileComplete ?? false,
          paymentMode: dbUser?.paymentMode ?? "CASH",
          balance: dbUser?.balance ?? 0,
          locationId: dbUser?.locationId ?? null,
        },
      };
    },
  },
} satisfies NextAuthConfig;
