import { authClient } from "@/lib/auth-client";
import getServerSession from "@/lib/server-session";
import { redirect } from "next/navigation";

export default async function Dashboard() {
   //    const { data: session, isPending } = authClient.useSession();
   const session = await getServerSession();
   if (!session) {
      redirect("/login");
   }

   //    const privateData = useQuery(trpc.privateData.queryOptions());

   return (
      <div>
         <h1>Dashboard</h1>
      </div>
   );
}
