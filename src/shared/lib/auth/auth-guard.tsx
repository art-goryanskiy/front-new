"use client";

import { memo, useEffect, useMemo } from "react";
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

  const { loading } = useMe({ skip: !!user || isLoading });

  const isChecking = useMemo(
    () => isLoading || loading,
    [isLoading, loading]
  );

  useEffect(() => {
    if (!isChecking) {
      if (!isAuthenticated) {
        router.push(AUTH_GUARD_ROUTES.login);
      } else if (!isAdmin) {
        router.push(AUTH_GUARD_ROUTES.home);
      }
    }
  }, [isAuthenticated, isAdmin, isChecking, router]);

  if (isChecking) {
    return <AuthGuardLoading />;
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
});
