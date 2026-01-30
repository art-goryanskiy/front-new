"use client";

import { useMe } from "@/features/auth/api/use-me";
import { useAuthStore } from "@/shared/store/auth-store";

export function AuthInitializer() {
  const user = useAuthStore((state) => state.user);

  // Пропускаем запрос только если уже есть пользователь.
  // `isLoading` не должен блокировать первичную инициализацию из cookie.
  useMe({
    skip: !!user,
  });

  return null;
}
