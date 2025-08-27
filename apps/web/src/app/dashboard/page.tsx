import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default async function Dashboard() {
   const session = await authClient.getSession();
   if (!session) {
      redirect("/login");
   }

   return (
      <div>
         <h1>Dashboard</h1>
      </div>
   );
}
