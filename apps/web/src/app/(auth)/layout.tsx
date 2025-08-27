import { authClient } from "@/lib/auth-client"; // Adjust path as needed
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
   const { data: session } = await authClient.getSession({
      fetchOptions: {
         headers: await headers(),
      },
   });

   if (!session?.user) {
      redirect("/login");
   }

   return <>{children}</>;
}
