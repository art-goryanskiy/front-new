import { UserEntity } from "@/shared/api/generated/graphql";
import { ME } from "@/shared/api/queries/auth";
import { useAuthStore } from "@/shared/store/auth-store";
import { useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useRef } from "react";

const ME_RETRY_DELAYS_MS = [2500, 5000, 8000, 12000];
const ME_MAX_RETRIES = ME_RETRY_DELAYS_MS.length;

export function useMe(options?: { skip?: boolean }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const user = useAuthStore((state) => state.user);

  const skip = useMemo(() => options?.skip || false, [options?.skip]);

  const { data, loading, error, refetch } = useQuery<{
    me: UserEntity | null;
  }>(ME, {
    errorPolicy: "ignore",
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    skip,
    notifyOnNetworkStatusChange: false,
  });

  const meUser = useMemo(() => data?.me || null, [data?.me]);

  const previousUserRef = useRef<UserEntity | null | undefined>(undefined);
  const retryCountRef = useRef(0);
  const nextRetryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Повторные запросы при отсутствии user (холодный старт, me: null при неготовой сессии).
  // Запускаем цепочку retry из callback refetch — иначе второй retry никогда не планируется
  // (при me: null deps эффекта не меняются, эффект не перезапускается).
  useEffect(() => {
    if (skip || loading || meUser) return;
    if (retryCountRef.current >= ME_MAX_RETRIES) return;

    const scheduleNextRetry = () => {
      const idx = retryCountRef.current;
      if (idx >= ME_MAX_RETRIES) {
        setLoading(false);
        return;
      }
      const delay = ME_RETRY_DELAYS_MS[idx];
      retryCountRef.current += 1;
      setLoading(true);
      nextRetryTimerRef.current = setTimeout(async () => {
        nextRetryTimerRef.current = null;
        try {
          const result = await refetch({ fetchPolicy: "network-only" });
          const nextUser = result?.data?.me ?? null;
          if (nextUser) {
            setLoading(false);
            return;
          }
          scheduleNextRetry();
        } catch {
          scheduleNextRetry();
        }
      }, delay);
    };

    scheduleNextRetry();
    return () => {
      if (nextRetryTimerRef.current) {
        clearTimeout(nextRetryTimerRef.current);
        nextRetryTimerRef.current = null;
      }
    };
  }, [skip, loading, meUser, refetch, setLoading]);

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
    const awaitingRetry = retryCountRef.current > 0 && !meUser;
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
