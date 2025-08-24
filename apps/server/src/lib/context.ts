import type { Context as HonoContext } from "hono";
import { createAuth } from "./auth";
import { db } from "@/db";
import type { Session, User } from "better-auth";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const auth = createAuth();
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });
  const user = session?.user;
  return {
    session,
    user,
    db,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
