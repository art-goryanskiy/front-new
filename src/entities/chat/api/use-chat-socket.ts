"use client";

import { useEffect, useRef } from "react";

const CHAT_SOCKET_PATH = "/chat-socket";
const EVENT_JOIN_CHAT = "joinChat";
const EVENT_MESSAGE_NEW = "message:new";

export interface ChatSocketNewMessagePayload {
  chatId: string;
  message: {
    id: string;
    senderId: string;
    body: string;
    createdAt: string;
    isFromAdmin: boolean;
  };
}

function getChatSocketOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  if (url) {
    try {
      return new URL(url).origin;
    } catch {
      return "";
    }
  }
  return "";
}

/**
 * Подключается к Socket.IO /chat-socket, шлёт joinChat(chatId) при наличии чата,
 * подписывается на message:new и вызывает onNewMessage при новом сообщении.
 */
export function useChatSocket(
  chatId: string | null,
  onNewMessage: (payload: ChatSocketNewMessagePayload) => void
) {
  const onNewMessageRef = useRef(onNewMessage);
  onNewMessageRef.current = onNewMessage;

  useEffect(() => {
    if (!chatId) return;

    const origin = getChatSocketOrigin();
    if (!origin) return;

    let socket: import("socket.io-client").Socket | null = null;

    const connect = () => {
      import("socket.io-client").then(({ io }) => {
        socket = io(origin, {
          path: CHAT_SOCKET_PATH,
          withCredentials: true,
        });

        socket.on("connect", () => {
          socket?.emit(EVENT_JOIN_CHAT, { chatId });
        });

        socket.on(EVENT_MESSAGE_NEW, (payload: ChatSocketNewMessagePayload) => {
          if (payload.chatId === chatId) {
            onNewMessageRef.current(payload);
          }
        });
      });
    };

    connect();

    return () => {
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
        socket = null;
      }
    };
  }, [chatId]);
}
