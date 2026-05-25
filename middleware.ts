// middleware.ts — project root (same level as app/, package.json)
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify }                  from "jose";

const SECRET      = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET ?? "fallback-secret-change-this"
);
const COOKIE_NAME = "admin_session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page through
  if (pathname === "/admin/login") {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      try {
        await jwtVerify(token, SECRET);
        return NextResponse.redirect(new URL("/admin", req.url));
      } catch {
        // invalid token — let through to login
      }
    }
    return NextResponse.next();
  }

  // Protect all /admin/* routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL("/admin/login", req.url));
      response.cookies.set(COOKIE_NAME, "", { maxAge: 0 });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};