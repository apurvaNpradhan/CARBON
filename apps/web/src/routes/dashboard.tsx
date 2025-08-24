import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard")({
   component: RouteComponent,
   loader: async ({ context }) => {
      await context.queryClient.prefetchQuery(context.trpc.testDb.queryOptions());
   },
});

function RouteComponent() {
   const navigate = Route.useNavigate();
   const trpc = useTRPC();
   const { data: session, isPending } = authClient.useSession();
   const privateData = useQuery(trpc.privateData.queryOptions());
   const usersData = useQuery(trpc.testDb.queryOptions());

   useEffect(() => {
      if (!session && !isPending) {
         navigate({
            to: "/login",
         });
      }
   }, [session, isPending]);

   if (isPending) {
      return <div>Loading...</div>;
   }

   return (
      <div>
         <h1>Dashboard</h1>
         <p>Welcome {session?.user.name}</p>
         <p>privateData: {privateData.data?.message}</p>
         {usersData.data?.users.map((c) => {
            return <div>{c.email}</div>;
         })}
      </div>
   );
}
