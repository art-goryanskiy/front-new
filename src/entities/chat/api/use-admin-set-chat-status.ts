"use client";

import { useMutation } from "@apollo/client/react";
import {
  AdminSetChatStatusDocument,
  AdminChatsDocument,
  type AdminSetChatStatusMutation,
  type AdminSetChatStatusMutationVariables,
  type ChatStatus,
} from "@/shared/api/generated/graphql";

export function useAdminSetChatStatus() {
  const [mutate, { loading, error }] = useMutation<
    AdminSetChatStatusMutation,
    AdminSetChatStatusMutationVariables
  >(AdminSetChatStatusDocument, {
    refetchQueries: [{ query: AdminChatsDocument }],
    awaitRefetchQueries: true,
  });

  const adminSetChatStatus = async (
    chatId: string,
    status: ChatStatus
  ) => {
    const result = await mutate({
      variables: { input: { chatId, status } },
    });
    return result.data?.adminSetChatStatus ?? null;
  };

  return {
    adminSetChatStatus,
    loading,
    error,
  };
}
