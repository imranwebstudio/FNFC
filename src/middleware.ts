import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LEGACY_SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
] as const;

const SESSION_COOKIES = [
  "fnfc.session-token",
  "__Secure-fnfc.session-token",
] as const;

function clearLegacyCookies(res: NextResponse) {
  for (const name of LEGACY_SESSION_COOKIES) {
    res.cookies.set(name, "", { path: "/", maxAge: 0 });
  }
}

/**
 * Edge-safe cookie gate only. Do NOT redirect /login → /app based on cookie
 * presence — layouts use full auth() and may send users to /onboarding or
 * /login (invalid session). Cookie→/app caused a 307 loop.
 */
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const hasSessionCookie = SESSION_COOKIES.some((name) =>
    Boolean(req.cookies.get(name)?.value),
  );
  const hasLegacyCookie = LEGACY_SESSION_COOKIES.some((name) =>
    Boolean(req.cookies.get(name)?.value),
  );

  const isProtected =
    path === "/app" ||
    path.startsWith("/app/") ||
    path === "/onboarding" ||
    path.startsWith("/onboarding/") ||
    path === "/admin" ||
    path.startsWith("/admin/") ||
    path === "/super-admin" ||
    path.startsWith("/super-admin/");

  if (isProtected && !hasSessionCookie) {
    const url = new URL("/", req.url);
    url.searchParams.set("callbackUrl", path);
    const res = NextResponse.redirect(url);
    if (hasLegacyCookie) clearLegacyCookies(res);
    return res;
  }

  const res = NextResponse.next();
  if (hasLegacyCookie) clearLegacyCookies(res);
  return res;
}

export const config = {
  matcher: [
    "/app",
    "/app/:path*",
    "/onboarding",
    "/onboarding/:path*",
    "/admin",
    "/admin/:path*",
    "/super-admin",
    "/super-admin/:path*",
  ],
};
