"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAdminNotifications } from "@/entities/admin-notification/api/use-admin-notifications";
import { cn } from "@/lib/utils";
import { NotificationButton } from "@/shared/ui/notification-button/notification-button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface AdminNotificationsMenuProps {
  size?: "sm" | "md" | "lg";
}

function getNotificationLink(
  entityType: string,
  entityId: string
): string | null {
  const type = entityType?.toLowerCase() ?? "";
  if (type === "chat" || type === "message") {
    return `/admin/chats/${entityId}`;
  }
  if (type === "order") {
    return `/admin/orders/${entityId}`;
  }
  if (type === "user") {
    return "/admin/users";
  }
  return null;
}

function formatNotificationDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) {
    return "только что";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} мин назад`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} ч назад`;
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export const AdminNotificationsMenu = memo(
  function AdminNotificationsMenu({
    size = "md",
  }: AdminNotificationsMenuProps) {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const {
      items,
      unreadCount,
      loading,
      socketConnected,
      isLoadingMore,
      newNotificationPulse,
      loadMore,
      markRead,
      markAllRead,
      refetchAll,
    } = useAdminNotifications({
      backendUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      pageSize: 30,
    });

    const socketLabel = useMemo(
      () => (socketConnected ? "онлайн" : "оффлайн"),
      [socketConnected]
    );

    const toggleOpen = useCallback(() => {
      setOpen((value) => !value);
    }, []);

    const closeMenu = useCallback(() => {
      setOpen(false);
    }, []);

    const handleNotificationClick = useCallback(
      (
        entityType: string,
        entityId: string,
        notificationId: string
      ) => {
        const href = getNotificationLink(entityType, entityId);
        if (href) {
          router.push(href);
        }
        closeMenu();
        void markRead(notificationId);
      },
      [closeMenu, markRead, router]
    );

    useEffect(() => {
      if (!open) {
        return;
      }

      const handlePointerDown = (event: MouseEvent) => {
        const target = event.target as Node;
        if (!wrapperRef.current?.contains(target)) {
          closeMenu();
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          closeMenu();
        }
      };

      document.addEventListener("mousedown", handlePointerDown);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handlePointerDown);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [closeMenu, open]);

    return (
      <div ref={wrapperRef} className="relative">
        <NotificationButton
          count={unreadCount}
          size={size}
          onClick={toggleOpen}
          animationKey={newNotificationPulse}
        />

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 w-[min(92vw,420px)] rounded-xl border bg-popover p-3 shadow-xl"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">Уведомления</p>
                <p className="text-xs text-muted-foreground">
                  Socket: {socketLabel}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => void refetchAll()}
                  className="h-8 px-2 text-xs"
                >
                  Обновить
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => void markAllRead()}
                  disabled={unreadCount === 0}
                  className="h-8 px-2 text-xs"
                >
                  Прочитать все
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <ScrollArea className="h-[320px]">
                <ul className="divide-y">
                  {items.map((notification) => (
                    <li key={notification.id}>
                      <button
                        type="button"
                        onClick={() =>
                          void handleNotificationClick(
                            notification.entityType,
                            notification.entityId,
                            notification.id
                          )
                        }
                        className={cn(
                          "block w-full px-3 py-2.5 text-left transition-colors hover:bg-accent/60",
                          !notification.isRead && "bg-accent/40"
                        )}
                      >
                        <div className="mb-1 flex items-start justify-between gap-3">
                          <p className="line-clamp-1 text-sm font-medium">
                            {notification.title}
                          </p>
                          <span className="shrink-0 text-[11px] text-muted-foreground">
                            {formatNotificationDate(
                              notification.createdAt
                            )}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {notification.message}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>

                {loading && items.length === 0 && (
                  <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                    Загрузка уведомлений...
                  </div>
                )}

                {!loading && items.length === 0 && (
                  <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                    Пока нет уведомлений
                  </div>
                )}
              </ScrollArea>
            </div>

            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => void loadMore()}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? "Загрузка..." : "Загрузить еще"}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);
