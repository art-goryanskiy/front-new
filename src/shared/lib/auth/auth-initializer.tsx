"use client";

import { useMe } from "@/features/auth/api/use-me";
import { useAuthStore } from "@/shared/store/auth-store";

export function AuthInitializer() {
  const user = useAuthStore((state) => state.user);

  // Пропускаем запрос только если уже есть пользователь с профилем.
  // После логина Login возвращает user без profile; если Me тогда упал — в сторе
  // остаётся user без profile.avatar, и аватар не показывается до перезагрузки.
  useMe({
    skip: !!(user?.profile),
  });

  return null;
}
