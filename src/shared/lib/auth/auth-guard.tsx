"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  useAuthStatus,
  useAuthUser,
} from "@/shared/store/auth-store";
import { useMe } from "@/features/auth/api/use-me";
import { AuthGuardLoading } from "./components/auth-guard-loading";
import { AUTH_GUARD_ROUTES } from "./constants/auth-guard-constants";

export const AuthGuard = memo(function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isAdmin, isLoading } = useAuthStatus();
  const user = useAuthUser();
  const router = useRouter();
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { loading } = useMe({ skip: !!user });

  const isChecking = useMemo(
    () => isLoading || loading,
    [isLoading, loading]
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[AuthGuard]", { isChecking, isAuthenticated, isAdmin, user: !!user });
    }
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = null;
    }

    if (!isChecking && !isAuthenticated) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[AuthGuard] → redirect to login (not authenticated)");
      }
      redirectTimeoutRef.current = setTimeout(() => {
        router.replace(AUTH_GUARD_ROUTES.login);
      }, 300);
    } else if (!isChecking && !isAdmin) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[AuthGuard] → redirect to home (not admin)");
      }
      redirectTimeoutRef.current = setTimeout(() => {
        router.replace(AUTH_GUARD_ROUTES.home);
      }, 300);
    }

    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
        redirectTimeoutRef.current = null;
      }
    };
  }, [isAuthenticated, isAdmin, isChecking, router, user]);

  if (isChecking || !isAuthenticated || !isAdmin) {
    return <AuthGuardLoading />;
  }

  return <>{children}</>;
});
