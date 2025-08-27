import { AuthGuard } from "@/components/auth-guard";
import type { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
   return <AuthGuard>{children}</AuthGuard>;
}
