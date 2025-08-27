import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index.js";
import * as schema from "../db/schema/auth.js";
import { nextCookies } from "better-auth/next-js";
export const auth = betterAuth({
   database: drizzleAdapter(db, {
      provider: "pg",

      schema: schema,
   }),
   plugins: [nextCookies()],
   trustedOrigins: [process.env.CORS_ORIGIN || ""],
   emailAndPassword: {
      enabled: true,
   },
   advanced: {
      defaultCookieAttributes: {
         sameSite: "none",
         secure: true,
         httpOnly: true,
      },
   },
});
