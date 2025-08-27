"use client";
import { useEffect, useCallback, type ReactNode, useState } from "react";
import Loader from "./loader";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
   children: ReactNode;
   fallback?: ReactNode;
   redirectTo?: string;
   redirectOptions?: {
      replace?: boolean;
      state?: Record<string, unknown>;
   };
}

export function LoadingScreen() {
   return (
      <div
         className="flex w-full h-screen items-center justify-center"
         role="status"
         aria-live="polite"
         aria-label="Loading authentication status"
      >
         <Loader />
      </div>
   );
}

export function AuthGuard({
   children,
   fallback = <LoadingScreen />,
   redirectTo = "/login",
   redirectOptions = { replace: true },
}: AuthGuardProps) {
   const { data: session, isPending, error } = authClient.useSession();
   const router = useRouter();
   const [hasAttemptedRedirect, setHasAttemptedRedirect] = useState(false);

   // Memoize redirect handler
   const handleRedirect = useCallback(() => {
      if (hasAttemptedRedirect) return;

      setHasAttemptedRedirect(true);
      router.replace("/login");
   }, [router, redirectTo, redirectOptions, hasAttemptedRedirect]);

   useEffect(() => {
      // Handle auth error
      if (error) {
         console.error("Authentication error:", error);
         handleRedirect();
         return;
      }

      // Handle unauthenticated state
      if (!session && !isPending && !hasAttemptedRedirect) {
         handleRedirect();
      }
   }, [session, isPending, error, handleRedirect, hasAttemptedRedirect]);

   // Early return for error state
   if (error) {
      return (
         <div
            role="alert"
            aria-live="assertive"
            className="flex w-full h-screen items-center justify-center p-4"
         >
            <p className="text-red-600">Authentication error. Redirecting...</p>
         </div>
      );
   }

   if (isPending) {
      return <>{fallback}</>;
   }

   if (!session) {
      return null;
   }

   return <>{children}</>;
}
