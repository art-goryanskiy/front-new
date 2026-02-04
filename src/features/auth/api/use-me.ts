import { UserEntity } from "@/shared/api/generated/graphql";
import { ME } from "@/shared/api/queries/auth";
import { useAuthStore } from "@/shared/store/auth-store";
import { useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useRef } from "react";

const ME_RETRY_DELAY_MS = 1500;

export function useMe(options?: { skip?: boolean }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const user = useAuthStore((state) => state.user);

  const skip = useMemo(() => options?.skip || false, [options?.skip]);

  const { data, loading, error, refetch } = useQuery<{
    me: UserEntity | null;
  }>(ME, {
    errorPolicy: "ignore",
    // Важно для корректной авторизации: "cache-first" может держать устаревший `me`.
    // Один сетевой запрос при старте, затем можно жить из кеша.
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    skip,
    notifyOnNetworkStatusChange: false,
  });

  const meUser = useMemo(() => data?.me || null, [data?.me]);

  // Используем ref для отслеживания предыдущего значения user
  const previousUserRef = useRef<UserEntity | null | undefined>(
    undefined
  );
  const hasRetriedRef = useRef(false);
  const refetchCalledRef = useRef(false);

  // Повторный запрос при первой неудаче (таймаут cookie, холодный старт сервера)
  useEffect(() => {
    if (skip) return;
    if (loading || meUser) return;
    if (!error && data !== undefined) return; // Успешный ответ (me: null) — не ретраим
    if (hasRetriedRef.current) return;

    hasRetriedRef.current = true;
    setLoading(true); // Держим skeleton до завершения retry
    const timer = setTimeout(() => {
      refetchCalledRef.current = true;
      refetch();
    }, ME_RETRY_DELAY_MS);
    return () => clearTimeout(timer);
  }, [skip, loading, meUser, error, data, refetch, setLoading]);

  useEffect(() => {
    if (skip) {
      // Если запрос пропущен и нет пользователя, сбрасываем user
      if (!user && previousUserRef.current !== null) {
        setUser(null);
        previousUserRef.current = null;
      }
      // Сбрасываем isLoading только когда скипаем из-за уже имеющегося user.
      // Иначе другой useMe (например AuthInitializer) ещё грузит — не гасим флаг.
      if (user) {
        setLoading(false);
      }
      return;
    }

    // Сбрасываем isLoading когда запрос завершается (но не при ожидании retry)
    const awaitingRetry =
      hasRetriedRef.current &&
      !refetchCalledRef.current &&
      !meUser &&
      (error || !data);
    if (!loading && !awaitingRetry) {
      setLoading(false);
    }

    // Обновляем user только если значение действительно изменилось
    if (meUser && previousUserRef.current !== meUser) {
      setUser(meUser);
      previousUserRef.current = meUser;
    } else if (
      !meUser &&
      !loading &&
      (error || !data) &&
      previousUserRef.current !== null
    ) {
      setUser(null);
      previousUserRef.current = null;
    }
    // Убираем setUser из зависимостей, так как он стабилен из Zustand
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meUser, error, loading, data, skip]);

  return {
    user: meUser || user,
    loading: skip ? false : loading,
    error,
  };
}
