"use client";

import { useQuery } from "@apollo/client/react";
import { useFragment } from "@/shared/api/generated/fragment-masking";
import {
  AdminChatMessagesDocument,
  ChatMessageFieldsFragmentDoc,
  type AdminChatMessagesQuery,
  type AdminChatMessagesQueryVariables,
  type ChatMessageFieldsFragment,
} from "@/shared/api/generated/graphql";

export function useAdminChatMessages(
  chatId: string | null,
  filter?: AdminChatMessagesQueryVariables["filter"],
  options?: { skip?: boolean }
) {
  const { data, loading, error, refetch } = useQuery<
    AdminChatMessagesQuery,
    AdminChatMessagesQueryVariables
  >(AdminChatMessagesDocument, {
    variables: { chatId: chatId ?? "", filter: filter ?? undefined },
    fetchPolicy: "cache-and-network",
    skip: options?.skip ?? !chatId,
  });

  const rawMessages = data?.adminChatMessages ?? [];
  const messages = useFragment(
    ChatMessageFieldsFragmentDoc,
    rawMessages
  ) as ChatMessageFieldsFragment[] | null | undefined;
  const list = messages ?? [];

  return {
    messages: list,
    loading,
    error,
    refetch,
  };
}
