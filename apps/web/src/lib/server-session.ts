import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth";
import { cookies } from "next/headers";

const getServerSession = async (): Promise<Session | null> => {
   try {
      const cookieHeader = (await cookies()).toString();
      const { data } = await betterFetch<Session>("/api/auth/get-session", {
         baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
         headers: {
            cookie: cookieHeader,
         },
      });
      return data;
   } catch (error) {
      console.error(error);
      return null;
   }
};

export default getServerSession;
