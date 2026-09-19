import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { type JWT } from "next-auth/jwt";
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

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    profileComplete?: boolean;
    paymentMode?: PaymentMode;
    balance?: number;
    locationId?: string | null;
    lastSynced?: number;
    banned?: boolean;
  }
}

const googleConfigured =
  Boolean(env.AUTH_GOOGLE_ID) && Boolean(env.AUTH_GOOGLE_SECRET);

/** How often JWT sessions re-read role/balance from Postgres (ms). */
const SESSION_REFRESH_MS = 5 * 60 * 1000;

async function loadUserClaims(userId: string) {
  try {
    return await db.user.findUnique({
      where: { id: userId },
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
        FROM "User" WHERE id = ${userId} LIMIT 1
      `;
      return rows[0] ?? null;
    } catch (rawErr) {
      console.error("[auth] session raw lookup failed", rawErr);
      return null;
    }
  }
}

async function applyClaimsToToken(token: JWT, userId: string): Promise<JWT> {
  let dbUser = await loadUserClaims(userId);
  if (!dbUser) {
    return { ...token, banned: true };
  }

  if (
    env.SUPER_ADMIN_EMAIL &&
    dbUser.email?.toLowerCase() === env.SUPER_ADMIN_EMAIL.toLowerCase() &&
    dbUser.role !== "SUPER_ADMIN"
  ) {
    await db.user.update({
      where: { id: dbUser.id },
      data: { role: "SUPER_ADMIN" },
    });
    dbUser = { ...dbUser, role: "SUPER_ADMIN" };
  }

  if (dbUser.isBanned) {
    return { ...token, banned: true };
  }

  return {
    ...token,
    sub: dbUser.id,
    role: dbUser.role,
    profileComplete: dbUser.profileComplete,
    paymentMode: dbUser.paymentMode,
    balance: dbUser.balance,
    locationId: dbUser.locationId,
    lastSynced: Date.now(),
    banned: false,
  };
}

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
  // JWT avoids a Session-table round-trip on every RSC/tRPC request (huge on Vercel→Neon).
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  // New cookie name so leftover database-session tokens aren't parsed as JWTs
  // (that caused JWTSessionError: Invalid Compact JWE after the strategy switch).
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-fnfc.session-token"
          : "fnfc.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
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
        const rows = await db.$queryRaw<Array<{ isBanned: boolean }>>`
          SELECT "isBanned" FROM "User" WHERE id = ${user.id} LIMIT 1
        `;
        if (rows[0]?.isBanned) return false;
      } catch (err) {
        console.error("[auth] signIn ban check failed", err);
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      const userId = user?.id ?? token.sub;
      if (!userId) return token;

      const needsRefresh =
        Boolean(user) ||
        trigger === "update" ||
        token.banned === true ||
        // Keep reading DB until onboarding finishes so redirects don't loop.
        !token.profileComplete ||
        !token.lastSynced ||
        Date.now() - token.lastSynced > SESSION_REFRESH_MS;

      if (!needsRefresh) return token;
      return applyClaimsToToken(token, userId);
    },
    async session({ session, token }) {
      if (token.banned || !token.sub) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub ?? "",
            role: "USER" as Role,
            profileComplete: false,
            paymentMode: "CASH" as PaymentMode,
            balance: 0,
            locationId: null,
          },
          expires: new Date(0).toISOString(),
        };
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role ?? "USER",
          profileComplete: token.profileComplete ?? false,
          paymentMode: token.paymentMode ?? "CASH",
          balance: token.balance ?? 0,
          locationId: token.locationId ?? null,
        },
      };
    },
  },
} satisfies NextAuthConfig;
