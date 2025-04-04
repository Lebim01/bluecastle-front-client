import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { authMe } from "./services/user";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token) {
    if (req.nextUrl.pathname == "/login") {
      await authMe(token.accessToken);
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    const isPublicRoute =
      req.nextUrl.pathname.startsWith("/img") ||
      req.nextUrl.pathname.startsWith("/public") ||
      req.nextUrl.pathname.startsWith("/forgot_password");
    const isLogin = req.nextUrl.pathname == "/login";
    const isSignup = req.nextUrl.pathname.startsWith("/signup/");
    const isLanding = req.nextUrl.pathname.startsWith("/landing");
    if (!isPublicRoute && !isSignup && !isLogin && !isLanding) {
      if (req.nextUrl.pathname == "/")
        return NextResponse.redirect(new URL("/landing", req.url));
      else return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*.mp4).*)"],
};
