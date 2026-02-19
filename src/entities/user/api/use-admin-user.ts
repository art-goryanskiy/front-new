"use client";

import { useQuery } from "@apollo/client/react";
import { useFragment } from "@/shared/api/generated/fragment-masking";
import {
  AdminUserDocument,
  AdminUserFieldsQueriesFragmentDoc,
  type AdminUserQuery,
  type AdminUserQueryVariables,
  type AdminUserFieldsQueriesFragment,
} from "@/shared/api/generated/graphql";

export function useAdminUser(userId: string | null, options?: { skip?: boolean }) {
  const { data, loading, error, refetch } = useQuery<
    AdminUserQuery,
    AdminUserQueryVariables
  >(AdminUserDocument, {
    variables: { id: userId ?? "" },
    fetchPolicy: "cache-and-network",
    skip: options?.skip ?? !userId,
  });

  const raw = data?.adminUser ?? null;
  const user = useFragment(
    AdminUserFieldsQueriesFragmentDoc,
    raw
  ) as AdminUserFieldsQueriesFragment | null | undefined;

  return {
    user: user ?? null,
    loading,
    error,
    refetch,
  };
}
