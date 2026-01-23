import { UserEntity } from "@/shared/api/generated/graphql";
import { ME } from "@/shared/api/queries/auth";
import { useAuthStore } from "@/shared/store/auth-store";
import { useQuery } from "@apollo/client/react";
import { useEffect, useMemo, useRef } from "react";

export function useMe(options?: { skip?: boolean }) {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);

  const skip = useMemo(() => options?.skip || false, [options?.skip]);

  const { data, loading, error } = useQuery<{
    me: UserEntity;
  }>(ME, {
    errorPolicy: "ignore",
    fetchPolicy: "cache-first",
    skip,
    notifyOnNetworkStatusChange: false,
  });

  const meUser = useMemo(() => data?.me || null, [data?.me]);

  // Используем ref для отслеживания предыдущего значения user
  const previousUserRef = useRef<UserEntity | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (skip) {
      // Если запрос пропущен и нет пользователя, сбрасываем user
      if (!user && previousUserRef.current !== null) {
        setUser(null);
        previousUserRef.current = null;
      }
      return;
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
