"use client";

import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { REFRESH_TOKEN } from "@/shared/api/mutations/auth";
import { useAuthStore } from "@/shared/store/auth-store";
import type { UserEntity } from "@/shared/api/generated/graphql";
import { from, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

function is401Like(options: {
  error: unknown;
  operation: { operationName?: string };
}): boolean {
  const { error, operation } = options;
  if (operation.operationName === "RefreshToken") return false;

  if (CombinedGraphQLErrors.is(error)) {
    return (
      error.errors?.some(
        (e) =>
          (e.extensions as { code?: string } | undefined)?.code ===
          "UNAUTHENTICATED"
      ) ?? false
    );
  }

  const err = error as { statusCode?: number };
  return err?.statusCode === 401;
}

export function createAuthErrorLink(): ErrorLink {
  return new ErrorLink(({ error, operation, forward }) => {
    if (!is401Like({ error, operation })) {
      return forward(operation);
    }

    const client = operation.client;
    if (!client) return forward(operation);

    return from(
      client.mutate<{ refreshToken: UserEntity }>({
        mutation: REFRESH_TOKEN,
      })
    ).pipe(
      switchMap((result) => {
        const refreshed = result.data?.refreshToken;
        if (refreshed) {
          const current = useAuthStore.getState().user;
          // RefreshToken не возвращает profile — не затираем profile/avatar из стора
          const merged: UserEntity =
            current?.profile && !refreshed.profile
              ? { ...refreshed, profile: current.profile }
              : refreshed;
          useAuthStore.getState().setUser(merged);
          return forward(operation);
        }
        useAuthStore.getState().logout();
        return throwError(() => error);
      }),
      catchError(() => {
        useAuthStore.getState().logout();
        return throwError(() => error);
      })
    );
  });
}
