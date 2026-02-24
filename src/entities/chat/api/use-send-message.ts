"use client";

import { useMutation } from "@apollo/client/react";
import { MY_CHAT } from "@/shared/api/queries/chat";
import { SEND_MESSAGE } from "@/shared/api/mutations/chat";
import type {
  ChatMessage,
  SendMessageInput,
} from "@/shared/api/chat.types";

export function useSendMessage() {
  const [sendMessageMutation, { loading, error }] = useMutation<{
    sendMessage: ChatMessage;
  }>(SEND_MESSAGE, {
    refetchQueries: [
      { query: MY_CHAT },
      // chatMessages refetched by cache update or by parent
    ],
    awaitRefetchQueries: true,
  });

  const sendMessage = async (input: SendMessageInput) => {
    const result = await sendMessageMutation({
      variables: { input },
    });
    return result.data?.sendMessage ?? null;
  };

  return {
    sendMessage,
    loading,
    error,
  };
}
