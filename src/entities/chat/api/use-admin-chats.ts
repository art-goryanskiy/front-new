"use client";

import { useQuery } from "@apollo/client/react";
import { useFragment } from "@/shared/api/generated/fragment-masking";
import {
  AdminChatsDocument,
  AdminChatFieldsFragmentDoc,
  type AdminChatsQuery,
  type AdminChatsQueryVariables,
  type AdminChatFieldsFragment,
} from "@/shared/api/generated/graphql";

export function useAdminChats(filter?: AdminChatsQueryVariables["filter"]) {
  const { data, loading, error, refetch } = useQuery<
    AdminChatsQuery,
    AdminChatsQueryVariables
  >(AdminChatsDocument, {
    variables: { filter: filter ?? undefined },
    fetchPolicy: "cache-and-network",
  });

  const rawChats = data?.adminChats ?? [];
  const chats = useFragment(AdminChatFieldsFragmentDoc, rawChats) as
    | AdminChatFieldsFragment[]
    | null
    | undefined;
  const list = chats ?? [];

  return {
    chats: list,
    loading,
    error,
    refetch,
  };
}
