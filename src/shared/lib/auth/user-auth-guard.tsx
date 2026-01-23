"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  useAuthStatus,
  useAuthUser,
} from "@/shared/store/auth-store";
import { useMe } from "@/features/auth/api/use-me";
import { AuthGuardLoading } from "./components/auth-guard-loading";
import { AUTH_GUARD_ROUTES } from "./constants/auth-guard-constants";
import { saveReturnUrl } from "./utils/auth-redirect-utils";

export function UserAuthGuard({
  children,
  redirectTo = "login", // "login" | "home"
}: {
  children: React.ReactNode;
  redirectTo?: "login" | "home";
}) {
  const { isAuthenticated, isLoading } = useAuthStatus();
  const user = useAuthUser();
  const router = useRouter();
  const pathname = usePathname();

  // Пропускаем запрос только если уже есть пользователь
  // Не используем isLoading в условии skip, чтобы избежать цикла
  const { loading } = useMe({ skip: !!user });

  const isChecking = isLoading || loading;

  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      // Сохраняем текущий URL перед редиректом (только если редирект на логин)
      if (pathname && redirectTo === "login") {
        saveReturnUrl(pathname);
      }

      // Используем replace для немедленного редиректа без добавления в историю
      const redirectPath =
        redirectTo === "login"
          ? AUTH_GUARD_ROUTES.login
          : AUTH_GUARD_ROUTES.home;

      router.replace(redirectPath);
    }
  }, [isAuthenticated, isChecking, router, pathname, redirectTo]);

  // Показываем загрузку во время проверки или если не аутентифицирован (редирект в процессе)
  if (isChecking || !isAuthenticated) {
    return <AuthGuardLoading />;
  }

  return <>{children}</>;
}
