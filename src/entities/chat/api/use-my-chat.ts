"use client";

import { useQuery } from "@apollo/client/react";
import { MY_CHAT } from "@/shared/api/queries/chat";
import type { Chat } from "@/shared/api/chat.types";

export function useMyChat(options?: { skip?: boolean }) {
  const { data, loading, error, refetch } = useQuery<{ myChat: Chat | null }>(
    MY_CHAT,
    {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
      skip: options?.skip ?? false,
    }
  );

  return {
    chat: data?.myChat ?? null,
    loading,
    error,
    refetch,
  };
}
