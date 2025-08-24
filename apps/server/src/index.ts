import { env } from "cloudflare:workers";
import { trpcServer } from "@hono/trpc-server";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { createAuth } from "./lib/auth";

const app = new Hono();
let authInstance: ReturnType<typeof createAuth> | null = null;
app.use(logger());
app.use(
   "/*",
   cors({
      origin: env.CORS_ORIGIN || "",
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      credentials: true,
   })
);

app.on(["POST", "GET"], "/api/auth/**", async (c) => {
   if (!authInstance) {
      authInstance = createAuth();
   }
   return authInstance.handler(c.req.raw);
});

app.use(
   "/trpc/*",
   trpcServer({
      router: appRouter,
      createContext: (_opts, context) => {
         return createContext({ context });
      },
   })
);

app.get("/", (c) => {
   return c.text("OK");
});

export default app;
