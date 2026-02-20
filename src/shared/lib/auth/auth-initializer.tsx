"use client";

import { useEffect, useRef } from "react";
import { useMe } from "@/features/auth/api/use-me";
import { useAuthStore } from "@/shared/store/auth-store";
import type { UserEntity } from "@/shared/api/generated/graphql";
import type { InitialAuthState } from "@/shared/store/auth-store";

export function AuthInitializer({
  initialAuth,
}: {
  initialAuth?: InitialAuthState;
} = {}) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const hydratedRef = useRef(false);

  // Гидрация стора из SSR: один раз при монте выставляем user и isLoading: false.
  // Минимальный user (id, email, role) достаточен для цен и isAdmin; useMe потом подставит полный профиль.
  useEffect(() => {
    if (!initialAuth || hydratedRef.current) return;
    hydratedRef.current = true;
    setUser(initialAuth.user as UserEntity | null);
    setLoading(false);
  }, [initialAuth, setUser, setLoading]);

  // Пропускаем запрос только если уже есть пользователь с профилем.
  // После логина Login возвращает user без profile; если Me тогда упал — в сторе
  // остаётся user без profile.avatar, и аватар не показывается до перезагрузки.
  useMe({
    skip: !!user?.profile,
  });

  return null;
}
