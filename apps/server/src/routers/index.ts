import { user } from "@/db/schema/auth";
import { protectedProcedure, publicProcedure, router } from "../lib/trpc";

export const appRouter = router({
   healthCheck: publicProcedure.query(() => {
      return "OK";
   }),
   privateData: protectedProcedure.query(({ ctx }) => {
      return {
         message: "This is private",
         user: ctx.session,
      };
   }),
   testDb: protectedProcedure.query(async ({ ctx }) => {
      const data = await ctx.db.select().from(user);
      return {
         users: data,
      };
   }),
});
export type AppRouter = typeof appRouter;
