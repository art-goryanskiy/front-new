"use client";

import { memo, useMemo, useState } from "react";
import Link from "next/link";
import { useAdminChats } from "@/entities/chat/api/use-admin-chats";
import { ErrorState } from "@/shared/ui/error-state/error-state";
import { Surface } from "@/shared/ui/surface/surface";
import { AdminPageHeader } from "@/shared/ui/admin-page-header/admin-page-header";
import { DashboardSection } from "@/shared/ui/dashboard-section/dashboard-section";
import {
  type AdminChatFieldsFragment,
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

const CHAT_STATUS_OPTIONS: { value: ChatStatus | "all"; label: string }[] = [
  { value: "all", label: "Все статусы" },
  { value: ChatStatus.Open, label: "Открыт" },
  { value: ChatStatus.Closed, label: "Закрыт" },
];

function formatDate(date: string | unknown): string {
  if (!date) return "—";
  try {
    return new Date(String(date)).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(date);
  }
}

const ChatRow = memo(function ChatRow({
  chat,
}: {
  chat: AdminChatFieldsFragment;
}) {
  const statusLabel = chat.status === ChatStatus.Open ? "Открыт" : "Закрыт";
  const statusClass =
    chat.status === ChatStatus.Open
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
      : "border-border/60 bg-muted/20 text-muted-foreground";
  const preview = chat.lastMessagePreview?.trim() || "—";
  const unread = (chat.unreadCount ?? 0) > 0;

  return (
    <Link href={`/admin/chats/${chat.id}`}>
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
              Чат {chat.id.slice(0, 8)}… · user {chat.userId.slice(0, 8)}…
            </p>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {preview}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDate(chat.createdAt)}
              {chat.assignedToId && (
                <> · Назначен: {chat.assignedToId.slice(0, 8)}…</>
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
  const [statusFilter, setStatusFilter] = useState<ChatStatus | "all">("all");
  const [assignedToMe, setAssignedToMe] = useState<boolean | undefined>(
    undefined
  );

  const filter = useMemo(
    () => ({
      status: statusFilter === "all" ? undefined : statusFilter,
      assignedToMe:
        assignedToMe === undefined ? undefined : assignedToMe,
      limit: 50,
      offset: 0,
    }),
    [statusFilter, assignedToMe]
  );

  const { chats, loading, error, refetch } = useAdminChats(filter);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Чаты"
        description="Чаты пользователей с поддержкой"
      />

      <DashboardSection title="Список чатов">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as ChatStatus | "all")}
          >
            <SelectTrigger className="w-[180px]">
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
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Назначение" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все чаты</SelectItem>
              <SelectItem value="me">Назначены на меня</SelectItem>
              <SelectItem value="other">Не назначены / другие</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div className="space-y-3">
            <ErrorState message={error.message} />
            <Button variant="outline" onClick={() => refetch()}>
              Повторить
            </Button>
          </div>
        )}

        {!error && loading && <AdminChatsListSkeleton />}

        {!error && !loading && chats.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border/60 bg-muted/10 py-12 text-center text-muted-foreground">
            Чатов пока нет
          </div>
        )}

        {!error && !loading && chats.length > 0 && (
          <div className="space-y-3">
            {chats.map((chat) => (
              <ChatRow key={chat.id} chat={chat} />
            ))}
          </div>
        )}
      </DashboardSection>
    </div>
  );
}
