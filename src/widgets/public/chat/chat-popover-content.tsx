"use client";

import { useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthUser } from "@/shared/store/auth-store";
import { useMyChat } from "@/entities/chat/api/use-my-chat";
import { useChatMessages } from "@/entities/chat/api/use-chat-messages";
import { useSendMessage } from "@/entities/chat/api/use-send-message";
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
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
          "border border-black/4 dark:border-white/6",
          isOwn
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-muted/80 text-muted-foreground backdrop-blur-sm"
        )}
      >
        <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">{message.body}</p>
        <p
          className={cn(
            "mt-1.5 text-xs opacity-90",
            isOwn ? "text-primary-foreground/90" : "text-muted-foreground/90"
          )}
        >
          {formatMessageTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}

interface ChatPopoverContentProps {
  refetchMessagesRef: React.MutableRefObject<(() => void) | null>;
}

export function ChatPopoverContent({ refetchMessagesRef }: ChatPopoverContentProps) {
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

  useEffect(() => {
    refetchMessagesRef.current = refetchMessages;
    return () => {
      refetchMessagesRef.current = null;
    };
  }, [refetchMessagesRef, refetchMessages]);

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
      <div className="flex h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="rounded-full bg-muted/50 p-4">
          <Send className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">Чат с поддержкой</p>
        <p className="text-sm text-muted-foreground">
          Войдите в аккаунт, чтобы написать сообщение.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[400px] flex-col">
      <div className="border-b border-border/60 bg-muted/20 px-5 py-4 backdrop-blur-sm">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          Чат с поддержкой
        </h3>
        {chat && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {chat.status === "OPEN" ? "Открыт · ответим в ближайшее время" : "Чат закрыт"}
          </p>
        )}
      </div>

      <ScrollArea className="flex-1 px-5 py-4">
        <div className="flex h-full min-h-[200px] flex-col gap-4">
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
        className="flex gap-2 border-t border-border/60 bg-muted/10 p-4 backdrop-blur-sm"
      >
        <Input
          ref={inputRef}
          name="body"
          placeholder="Напишите сообщение…"
          className="min-h-11 flex-1 rounded-xl border-border/80 bg-background/80 shadow-sm"
          disabled={sendLoading}
          autoComplete="off"
        />
        <Button
          type="submit"
          size="icon"
          className="h-11 w-11 shrink-0 rounded-xl shadow-sm"
          disabled={sendLoading}
          aria-label="Отправить"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
