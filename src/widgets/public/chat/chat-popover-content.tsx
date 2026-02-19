"use client";

import { useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthUser } from "@/shared/store/auth-store";
import { useMyChat } from "@/entities/chat/api/use-my-chat";
import { useChatMessages } from "@/entities/chat/api/use-chat-messages";
import { useSendMessage } from "@/entities/chat/api/use-send-message";
import { useChatSocket } from "@/entities/chat/api/use-chat-socket";
import type { ChatMessage } from "@/shared/api/chat.types";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const MESSAGE_LIMIT = 50;

function formatMessageTime(createdAt: string) {
  const d = new Date(createdAt);
  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (isToday) {
    return d.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MessageBubble({
  message,
  isOwn,
}: {
  message: ChatMessage;
  isOwn: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2 text-sm",
          isOwn
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted text-muted-foreground rounded-bl-md"
        )}
      >
        <p className="whitespace-pre-wrap wrap-break-word">{message.body}</p>
        <p
          className={cn(
            "mt-1 text-xs",
            isOwn ? "text-primary-foreground/80" : "text-muted-foreground/80"
          )}
        >
          {formatMessageTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}

export function ChatPopoverContent() {
  const user = useAuthUser();
  const { chat, loading: chatLoading, refetch: refetchChat } = useMyChat({
    skip: !user,
  });
  const { messages, loading: messagesLoading, refetch: refetchMessages } =
    useChatMessages(chat?.id ?? null, { limit: MESSAGE_LIMIT }, {
      skip: !chat?.id,
    });
  const { sendMessage, loading: sendLoading } = useSendMessage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNewMessage = useCallback(() => {
    refetchMessages();
  }, [refetchMessages]);

  useChatSocket(chat?.id ?? null, handleNewMessage);

  useEffect(() => {
    if (scrollRef.current && messages.length) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const body = (form.elements.namedItem("body") as HTMLInputElement)?.value?.trim();
    if (!body || sendLoading) return;
    try {
      await sendMessage({
        chatId: chat?.id ?? undefined,
        body,
      });
      form.reset();
      if (chat?.id) {
        refetchMessages();
      } else {
        refetchChat();
      }
      inputRef.current?.focus();
    } catch {
      // error handled by hook / UI
    }
  };

  if (!user) {
    return (
      <div className="flex h-[320px] flex-col items-center justify-center gap-3 p-4 text-center text-muted-foreground">
        <p className="text-sm">Войдите в аккаунт, чтобы написать в поддержку.</p>
      </div>
    );
  }

  return (
    <div className="flex h-[380px] flex-col">
      <div className="border-b px-4 py-3">
        <h3 className="font-semibold text-foreground">Чат с поддержкой</h3>
        {chat && (
          <p className="text-xs text-muted-foreground">
            Статус: {chat.status === "OPEN" ? "открыт" : "закрыт"}
          </p>
        )}
      </div>

      <ScrollArea className="flex-1 px-4 py-3">
        <div className="flex h-full min-h-[200px] flex-col gap-3">
          {chatLoading || (chat && messagesLoading) ? (
            <div className="flex flex-1 items-center justify-center py-8 text-sm text-muted-foreground">
              Загрузка…
            </div>
          ) : !chat ? (
            <div className="flex flex-1 items-center justify-center py-8 text-sm text-muted-foreground">
              Напишите первое сообщение — мы создадим чат и ответим.
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center py-8 text-sm text-muted-foreground">
              Пока нет сообщений.
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isOwn={msg.senderId === user.id && !msg.isFromAdmin}
                />
              ))}
              <div ref={scrollRef} aria-hidden />
            </>
          )}
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t p-3"
      >
        <Input
          ref={inputRef}
          name="body"
          placeholder="Сообщение…"
          className="flex-1"
          disabled={sendLoading}
          autoComplete="off"
        />
        <Button type="submit" size="icon" disabled={sendLoading} aria-label="Отправить">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
