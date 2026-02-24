"use client";

import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { useAuthStore } from "@/shared/store/auth-store";
import type { UserEntity } from "@/shared/api/generated/graphql";
import { from, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  "https://www.new.standart82.ru/graphql";

const REFRESH_MUTATION = `
  mutation RefreshToken {
    refreshToken {
      id
      email
      role
    }
  }
`;

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

async function doRefreshToken(): Promise<UserEntity | null> {
  try {
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ query: REFRESH_MUTATION }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.errors?.length) return null;
    return (json.data?.refreshToken as UserEntity) ?? null;
  } catch {
    return null;
  }
}

export function createAuthErrorLink(): ErrorLink {
  return new ErrorLink(({ error, operation, forward }) => {
    if (!is401Like({ error, operation })) {
      return forward(operation);
    }

    return from(doRefreshToken()).pipe(
      switchMap((refreshed) => {
        if (refreshed) {
          const current = useAuthStore.getState().user;
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
