"use client";

import { useApolloClient } from "@apollo/client/react";
import { useEffect, useRef, useState } from "react";
import {
  AdminUserDocument,
  type AdminUserFieldsQueriesFragment,
} from "@/shared/api/generated/graphql";

type UserMap = Map<string, AdminUserFieldsQueriesFragment>;

/**
 * Загружает данные пользователей по списку ID батчем (параллельные запросы с cache-first).
 * Решает N+1-проблему: запросы делаются на уровне родителя, ChatRow получает данные как пропс.
 */
export function useAdminUsersMap(userIds: string[]): UserMap {
  const client = useApolloClient();
  const [usersMap, setUsersMap] = useState<UserMap>(new Map());
  const prevKey = useRef<string>("");

  useEffect(() => {
    const unique = [...new Set(userIds)].sort();
    const key = unique.join(",");
    if (!unique.length || key === prevKey.current) return;
    prevKey.current = key;

    const queries = unique.map((id) =>
      client
        .query({
          query: AdminUserDocument,
          variables: { id },
          fetchPolicy: "cache-first",
        })
        .catch(() => null)
    );

    Promise.allSettled(queries).then((results) => {
      const map: UserMap = new Map();
      results.forEach((r) => {
        if (r.status === "fulfilled" && r.value?.data?.adminUser) {
          const u = r.value.data
            .adminUser as AdminUserFieldsQueriesFragment;
          map.set(u.id, u);
        }
      });
      setUsersMap(map);
    });
  }, [client, userIds]);

  return usersMap;
}
