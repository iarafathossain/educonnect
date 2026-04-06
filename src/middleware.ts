import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import { PUBLIC_ROUTES, ROOT } from "./lib/route";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { auth } = NextAuth(authConfig as any);

export default auth((req) => {
  const { nextUrl } = req;

  if (nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const isAuthenticated = req.auth;

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  if (!isAuthenticated && !isPublicRoute) {
    const url = nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|api).*)", "/"],
  runtime: "nodejs",
};
