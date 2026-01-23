"use client";

import { useMe } from "@/features/auth/api/use-me";
import { useAuthStore } from "@/shared/store/auth-store";

export function AuthInitializer() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Пропускаем запрос если уже есть пользователь
  useMe({
    skip: !!user || isLoading,
  });

  return null;
}
