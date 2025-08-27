import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth";
export async function middleware(request: NextRequest) {
   const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      headers: {
         cookie: request.headers.get("cookie") || "",
      },
   });

   if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/dashboard"], // Apply middleware to specific routes
};
