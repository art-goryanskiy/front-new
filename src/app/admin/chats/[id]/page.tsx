"use client";

import { memo, useRef, useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useApolloClient } from "@apollo/client/react";
import { useAdminChatMessages } from "@/entities/chat/api/use-admin-chat-messages";
import { useAdminAssignChat } from "@/entities/chat/api/use-admin-assign-chat";
import { useAdminSetChatStatus } from "@/entities/chat/api/use-admin-set-chat-status";
import { useSendMessage } from "@/entities/chat/api/use-send-message";
import { useChatSocket } from "@/entities/chat/api/use-chat-socket";
import { useAdminUser } from "@/entities/user/api/use-admin-user";
import { useAuthUser } from "@/shared/store/auth-store";
import { Surface } from "@/shared/ui/surface/surface";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import {
  AdminChatFieldsFragmentDoc,
  ChatStatus,
  type AdminChatFieldsFragment,
  type ChatMessageFieldsFragment,
} from "@/shared/api/generated/graphql";
import { cn } from "@/lib/utils";

function shortChatId(id: string): string {
  return id.length > 8 ? "…" + id.slice(-8) : id;
}

function userDisplayName(
  user: {
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  } | null
): string {
  if (!user) return "—";
  const name = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (name) return `${name} (${user.email ?? ""})`;
  return user.email ?? "—";
}

const MESSAGE_LIMIT = 100;

/** Порог расстояния от нижней границы контейнера (в пикселях), при котором авто-скролл разрешён */
const SCROLL_BOTTOM_THRESHOLD = 80;

function formatMessageTime(createdAt: string) {
  const d = new Date(createdAt);
  return d.toLocaleTimeString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const MessageBubble = memo(function MessageBubble({
  message,
  isAdmin,
}: {
  message: ChatMessageFieldsFragment;
  isAdmin: boolean;
}) {
  return (
    <div
      className={cn(
        "flex w-full",
        isAdmin ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2 text-sm",
          isAdmin
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-muted text-muted-foreground"
        )}
      >
        <p className="wrap-break-word whitespace-pre-wrap">{message.body}</p>
        <p
          className={cn(
            "mt-1 text-xs",
            isAdmin
              ? "text-primary-foreground/80"
              : "text-muted-foreground/80"
          )}
        >
          {formatMessageTime(message.createdAt)}
          {isAdmin && " · поддержка"}
        </p>
      </div>
    </div>
  );
});

export default function AdminChatDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const client = useApolloClient();
  const chatId = typeof params.id === "string" ? params.id : null;
  const userIdFromQuery = searchParams.get("userId");
  const currentUser = useAuthUser();
  const { user: chatUser } = useAdminUser(userIdFromQuery ?? null);

  // Читаем кэшированные данные чата (статус, назначение) и отслеживаем изменения
  const [chatMeta, setChatMeta] = useState<Pick<
    AdminChatFieldsFragment,
    "status" | "assignedToId"
  > | null>(() => {
    if (!chatId) return null;
    return (
      client.readFragment<AdminChatFieldsFragment>({
        id: `Chat:${chatId}`,
        fragment: AdminChatFieldsFragmentDoc,
      }) ?? null
    );
  });

  const {
    messages,
    loading: messagesLoading,
    refetch: refetchMessages,
  } = useAdminChatMessages(chatId, { limit: MESSAGE_LIMIT }, { skip: !chatId });
  const { adminAssignChat, loading: assignLoading } = useAdminAssignChat();
  const { adminSetChatStatus, loading: statusLoading } = useAdminSetChatStatus();
  const { sendMessage, loading: sendLoading } = useSendMessage();

  // Обновляем локальный мета после мутаций
  const refreshChatMeta = useCallback(() => {
    if (!chatId) return;
    const fresh = client.readFragment<AdminChatFieldsFragment>({
      id: `Chat:${chatId}`,
      fragment: AdminChatFieldsFragmentDoc,
    });
    if (fresh) setChatMeta(fresh);
  }, [client, chatId]);

  const handleNewMessage = useCallback(() => {
    refetchMessages();
  }, [refetchMessages]);

  useChatSocket(chatId, handleNewMessage);

  // Ref на root ScrollArea — viewport находим через querySelector
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isNearBottom = useCallback(() => {
    const viewport = scrollAreaRef.current?.querySelector<HTMLDivElement>(
      "[data-radix-scroll-area-viewport]"
    );
    if (!viewport) return true;
    return (
      viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight <
      SCROLL_BOTTOM_THRESHOLD
    );
  }, []);

  useEffect(() => {
    if (scrollRef.current && messages.length && isNearBottom()) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, isNearBottom]);

  const handleAssignToMe = useCallback(async () => {
    if (!chatId || !currentUser?.id) return;
    await adminAssignChat(chatId, currentUser.id);
    refreshChatMeta();
  }, [chatId, currentUser, adminAssignChat, refreshChatMeta]);

  const handleUnassign = useCallback(async () => {
    if (!chatId) return;
    await adminAssignChat(chatId, null);
    refreshChatMeta();
  }, [chatId, adminAssignChat, refreshChatMeta]);

  const handleSetStatus = useCallback(
    async (status: ChatStatus) => {
      if (!chatId) return;
      await adminSetChatStatus(chatId, status);
      refreshChatMeta();
    },
    [chatId, adminSetChatStatus, refreshChatMeta]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const body = (
      form.elements.namedItem("body") as HTMLInputElement
    )?.value?.trim();
    if (!body || !chatId || sendLoading) return;
    try {
      await sendMessage({ chatId, body });
      form.reset();
      refetchMessages();
      inputRef.current?.focus();
    } catch {
      // error in hook
    }
  };

  if (!chatId) {
    return (
      <div className="space-y-4">
        <ErrorState message="Чат не найден" />
        <Button asChild variant="outline">
          <Link href="/admin/chats">К списку чатов</Link>
        </Button>
      </div>
    );
  }

  const assignLoadingAny = assignLoading || statusLoading;
  const chatStatus = chatMeta?.status ?? null;
  const assignedToId = chatMeta?.assignedToId ?? null;
  const isAssignedToMe = !!currentUser?.id && assignedToId === currentUser.id;
  const isOpen = chatStatus === ChatStatus.Open || chatStatus === null;

  return (
    <div className="space-y-6">
      <Surface variant="floating" className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label="Назад"
            >
              <Link href="/admin/chats">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Чат №{shortChatId(chatId)}
              </h1>
              <p className="text-sm text-muted-foreground">
                Пользователь: {userDisplayName(chatUser)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Назначение: показываем только актуальное действие */}
            {!isAssignedToMe ? (
              <Button
                variant="outline"
                size="sm"
                disabled={assignLoadingAny}
                onClick={handleAssignToMe}
              >
                {assignLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Назначить на меня"
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled={assignLoadingAny}
                onClick={handleUnassign}
              >
                {assignLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Снять назначение"
                )}
              </Button>
            )}

            {/* Статус: показываем только противоположное действие */}
            {isOpen ? (
              <Button
                variant="outline"
                size="sm"
                disabled={assignLoadingAny}
                onClick={() => handleSetStatus(ChatStatus.Closed)}
              >
                {statusLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Закрыть чат"
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled={assignLoadingAny}
                onClick={() => handleSetStatus(ChatStatus.Open)}
              >
                {statusLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Открыть чат"
                )}
              </Button>
            )}

            {/* Индикатор текущего статуса */}
            {chatStatus && (
              <span
                className={cn(
                  "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
                  isOpen
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "border-border/60 bg-muted/20 text-muted-foreground"
                )}
              >
                {isOpen ? "Открыт" : "Закрыт"}
              </span>
            )}
          </div>
        </div>
      </Surface>

      <Surface variant="floating" className="flex flex-col overflow-hidden">
        <div className="border-b px-4 py-3">
          <h2 className="font-semibold text-foreground">Переписка</h2>
        </div>

        <ScrollArea
          ref={scrollAreaRef}
          className="max-h-[60vh] min-h-[320px] flex-1 px-4 py-3"
        >
          <div className="flex min-h-[280px] flex-col gap-3">
            {messagesLoading ? (
              <div className="flex flex-1 items-center justify-center py-8 text-sm text-muted-foreground">
                Загрузка…
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-1 items-center justify-center py-8 text-sm text-muted-foreground">
                Нет сообщений
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isAdmin={msg.isFromAdmin}
                  />
                ))}
                <div ref={scrollRef} aria-hidden />
              </>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-2 border-t p-3">
          <Input
            ref={inputRef}
            name="body"
            placeholder="Ответить…"
            className="flex-1"
            disabled={sendLoading}
            autoComplete="off"
          />
          <Button
            type="submit"
            size="icon"
            disabled={sendLoading}
            aria-label="Отправить"
          >
            {sendLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </Surface>
    </div>
  );
}
