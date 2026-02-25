"use client";

import { memo, useMemo, useState } from "react";
import Link from "next/link";
import { useAdminChats } from "@/entities/chat/api/use-admin-chats";
import { useAdminUsersMap } from "@/entities/user/api/use-admin-users-map";
import { ADMIN_CHATS_LIMIT } from "@/shared/constants/admin";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { EmptyState } from "@/shared/ui/empty-state/empty-state";
import { Surface } from "@/shared/ui/surface/surface";
import { AdminPageHeader } from "@/shared/ui/admin-page-header/admin-page-header";
import { DashboardSection } from "@/shared/ui/dashboard-section/dashboard-section";
import { DataToolbar } from "@/shared/ui/data-toolbar/data-toolbar";
import { formatAdminDate } from "@/shared/lib/helpers/format-helpers";
import {
  type AdminChatFieldsFragment,
  type AdminUserFieldsQueriesFragment,
  ChatStatus,
} from "@/shared/api/generated/graphql";
import { MessageCircle, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHAT_STATUS_OPTIONS: {
  value: ChatStatus | "all";
  label: string;
}[] = [
  { value: "all", label: "Все статусы" },
  { value: ChatStatus.Open, label: "Открыт" },
  { value: ChatStatus.Closed, label: "Закрыт" },
];

function shortUserId(userId: string): string {
  if (userId.length <= 12) return userId;
  return "…" + userId.slice(-8);
}

function userDisplayLabel(
  user: AdminUserFieldsQueriesFragment | null | undefined,
  fallbackUserId: string
): string {
  if (!user) return shortUserId(fallbackUserId);
  const name = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (name) return name;
  return user.email ?? shortUserId(fallbackUserId);
}

const ChatRow = memo(function ChatRow({
  chat,
  user,
  index,
}: {
  chat: AdminChatFieldsFragment;
  user: AdminUserFieldsQueriesFragment | undefined;
  index: number;
}) {
  const chatNumber = index + 1;
  const statusLabel =
    chat.status === ChatStatus.Open ? "Открыт" : "Закрыт";
  const statusClass =
    chat.status === ChatStatus.Open
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
      : "border-border/60 bg-muted/20 text-muted-foreground";
  const preview = chat.lastMessagePreview?.trim() || "—";
  const unread = (chat.unreadCount ?? 0) > 0;
  const chatUrl = `/admin/chats/${chat.id}?userId=${encodeURIComponent(chat.userId)}`;
  const userLabel = userDisplayLabel(user, chat.userId);

  return (
    <Link href={chatUrl}>
      <Surface
        variant="floating"
        className={cn(
          "group flex flex-wrap items-center justify-between gap-4 p-4 transition-all duration-200",
          "rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-md",
          "dark:border-white/10 dark:hover:border-primary/40"
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1 space-y-1">
            <p className="font-semibold text-foreground">
              Чат №{chatNumber}
            </p>
            <p className="text-sm wrap-break-word text-muted-foreground">
              Пользователь:{" "}
              <span className="text-foreground/90">{userLabel}</span>
            </p>
            <p className="line-clamp-1 text-sm text-muted-foreground">
              {preview}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatAdminDate(chat.createdAt)}
              {chat.assignedToId && (
                <> · Назначен: {shortUserId(chat.assignedToId)}</>
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {unread && (
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">
              {chat.unreadCount}
            </span>
          )}
          <span
            className={cn(
              "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
              statusClass
            )}
          >
            {statusLabel}
          </span>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </div>
      </Surface>
    </Link>
  );
});

function AdminChatsListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Surface
          key={i}
          variant="floating"
          className="h-24 animate-pulse rounded-2xl border border-border/50"
        />
      ))}
    </div>
  );
}

export default function AdminChatsPage() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    ChatStatus | "all"
  >(ChatStatus.Open);
  const [assignedToMe, setAssignedToMe] = useState<
    boolean | undefined
  >(undefined);

  const filter = useMemo(
    () => ({
      status: statusFilter === "all" ? undefined : statusFilter,
      assignedToMe:
        assignedToMe === undefined ? undefined : assignedToMe,
      limit: ADMIN_CHATS_LIMIT,
      offset: 0,
    }),
    [statusFilter, assignedToMe]
  );

  const { chats, loading, error, refetch } = useAdminChats(filter);

  // Собираем уникальные userId из всех чатов и батч-загружаем — 1 запрос на кэш
  const userIds = useMemo(
    () => [...new Set(chats.map((c) => c.userId))],
    [chats]
  );
  const usersMap = useAdminUsersMap(userIds);

  // Клиентский поиск по имени пользователя, email и превью последнего сообщения
  const filteredChats = useMemo(() => {
    if (!q.trim()) return chats;
    const lq = q.toLowerCase();
    return chats.filter((chat) => {
      const user = usersMap.get(chat.userId);
      const name = [user?.firstName, user?.lastName]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const email = (user?.email ?? "").toLowerCase();
      const preview = (chat.lastMessagePreview ?? "").toLowerCase();
      return (
        name.includes(lq) ||
        email.includes(lq) ||
        preview.includes(lq)
      );
    });
  }, [chats, q, usersMap]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Чаты"
        description="Чаты пользователей с поддержкой"
      />

      <DashboardSection
        title="Список чатов"
        actions={
          <span className="hidden rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-xs text-muted-foreground sm:inline-flex">
            {filteredChats.length} / {chats.length}
          </span>
        }
      >
        <DataToolbar
          searchValue={q}
          onSearchValueChange={setQ}
          searchPlaceholder="Поиск по имени, email или тексту…"
          rightSlot={
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={statusFilter}
                onValueChange={(v) =>
                  setStatusFilter(v as ChatStatus | "all")
                }
              >
                <SelectTrigger className="h-9 w-[160px] bg-background/60">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  {CHAT_STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={
                  assignedToMe === undefined
                    ? "all"
                    : assignedToMe
                      ? "me"
                      : "other"
                }
                onValueChange={(v) =>
                  setAssignedToMe(
                    v === "all" ? undefined : v === "me"
                  )
                }
              >
                <SelectTrigger className="h-9 w-[200px] bg-background/60">
                  <SelectValue placeholder="Назначение" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все чаты</SelectItem>
                  <SelectItem value="me">
                    Назначены на меня
                  </SelectItem>
                  <SelectItem value="other">
                    Не назначены / другие
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />

        {error && (
          <div className="space-y-3">
            <ErrorState message={error.message} />
            <Button variant="outline" onClick={() => refetch()}>
              Повторить
            </Button>
          </div>
        )}

        {!error && loading && <AdminChatsListSkeleton />}

        {!error && !loading && filteredChats.length === 0 && (
          <EmptyState
            title={q ? "Ничего не найдено" : "Чатов пока нет"}
            description={
              q
                ? "Попробуйте изменить запрос или сбросить фильтры."
                : "Обращения пользователей появятся здесь после создания."
            }
            icon={
              <MessageCircle className="h-8 w-8 text-muted-foreground" />
            }
          />
        )}

        {!error && filteredChats.length > 0 && (
          <div className="space-y-3">
            {filteredChats.map((chat, index) => (
              <ChatRow
                key={chat.id}
                chat={chat}
                user={usersMap.get(chat.userId)}
                index={index}
              />
            ))}
          </div>
        )}
      </DashboardSection>
    </div>
  );
}
