"use client";

import { useQuery } from "@apollo/client/react";
import { CHAT_MESSAGES } from "@/shared/api/queries/chat";
import type {
  ChatMessage,
  ChatMessagesFilterInput,
} from "@/shared/api/chat.types";

export function useChatMessages(
  chatId: string | null,
  filter?: ChatMessagesFilterInput | null,
  options?: { skip?: boolean }
) {
  const { data, loading, error, refetch } = useQuery<{
    chatMessages: ChatMessage[];
  }>(CHAT_MESSAGES, {
    variables: { chatId: chatId ?? "", filter: filter ?? undefined },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    skip: options?.skip ?? !chatId,
  });

  const messages = data?.chatMessages ?? [];

  return {
    messages,
    loading,
    error,
    refetch,
  };
}
