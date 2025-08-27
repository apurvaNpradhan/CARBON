"use client";

import { authClient } from "../../../lib/auth-client";
export default function UserProfile() {
   const { data: session, isPending } = authClient.useSession();

   if (isPending) return <div>Loading...</div>;
   if (!session?.user) return <div>Not authenticated</div>; // Though server check already handles this

   return <div>Welcome, {session.user.name}</div>;
}
