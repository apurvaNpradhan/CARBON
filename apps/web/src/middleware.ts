import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname;
   const publicPaths = ["/", "/login", "/forgot-password"];
   const apiPaths = "/api";
   const cookies = getSessionCookie(request);
   if (path.startsWith(apiPaths)) {
      return NextResponse.next();
   }
   if (!cookies && !publicPaths.includes(path)) {
      return NextResponse.redirect(new URL("/login", request.url));
   }
   return NextResponse.next();
}

export const config = {
   runtime: "nodejs",
   matcher: ["/dashboard"],
};
