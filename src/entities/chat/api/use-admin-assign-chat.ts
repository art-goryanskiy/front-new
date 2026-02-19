"use client";

import { useMutation } from "@apollo/client/react";
import {
  AdminAssignChatDocument,
  AdminChatsDocument,
  type AdminAssignChatMutation,
  type AdminAssignChatMutationVariables,
} from "@/shared/api/generated/graphql";

export function useAdminAssignChat() {
  const [mutate, { loading, error }] = useMutation<
    AdminAssignChatMutation,
    AdminAssignChatMutationVariables
  >(AdminAssignChatDocument, {
    refetchQueries: [{ query: AdminChatsDocument }],
    awaitRefetchQueries: true,
  });

  const adminAssignChat = async (
    chatId: string,
    assignToUserId: string | null
  ) => {
    const result = await mutate({
      variables: {
        input: { chatId, assignToUserId: assignToUserId ?? undefined },
      },
    });
    return result.data?.adminAssignChat ?? null;
  };

  return {
    adminAssignChat,
    loading,
    error,
  };
}
