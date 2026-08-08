import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge-safe cookie gate only. Do NOT redirect /login → /app based on cookie
 * presence — layouts use full auth() and may send users to /onboarding or
 * /login (invalid session). Cookie→/app caused a 307 loop.
 */
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const sessionToken =
    req.cookies.get("authjs.session-token")?.value ??
    req.cookies.get("__Secure-authjs.session-token")?.value;

  const hasSessionCookie = Boolean(sessionToken);
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
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
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
