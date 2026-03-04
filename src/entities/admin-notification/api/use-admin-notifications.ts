"use client";

import { useMutation, useQuery, useApolloClient } from "@apollo/client/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ADMIN_MARK_ALL_NOTIFICATIONS_READ_MUTATION,
  ADMIN_MARK_NOTIFICATION_READ_MUTATION,
} from "@/shared/api/mutations/admin-notifications";
import {
  ADMIN_NOTIFICATIONS_QUERY,
  ADMIN_NOTIFICATIONS_UNREAD_COUNT_QUERY,
} from "@/shared/api/queries/admin-notifications";
import { ADMIN_ORDERS } from "@/shared/api/queries/orders";
import { GET_USERS } from "@/shared/api/queries/users";
import { AdminChatsDocument } from "@/shared/api/generated/graphql";
import type {
  AdminNotification,
  AdminNotificationSocketEvent,
} from "./admin-notification.types";

type NotificationsData = {
  adminNotifications: AdminNotification[];
};

type UnreadCountData = {
  adminNotificationsUnreadCount: {
    count: number;
  };
};

function getSocketOrigin(backendUrl: string): string {
  if (backendUrl) {
    try {
      return new URL(backendUrl).origin;
    } catch {
      return "";
    }
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
}

function mergeFirstPage(
  previous: AdminNotification[],
  incoming: AdminNotification[]
): AdminNotification[] {
  if (previous.length === 0) {
    return incoming;
  }

  const incomingIds = new Set(incoming.map((item) => item.id));
  const byId = new Map(previous.map((item) => [item.id, item]));

  const mergedTop = incoming.map((item) => ({
    ...(byId.get(item.id) ?? {}),
    ...item,
  }));
  const tail = previous.filter((item) => !incomingIds.has(item.id));

  return [...mergedTop, ...tail];
}

export function useAdminNotifications(params?: {
  backendUrl?: string;
  pageSize?: number;
}) {
  const backendUrl = params?.backendUrl ?? "";
  const pageSize = params?.pageSize ?? 30;
  const client = useApolloClient();

  const [items, setItems] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socketConnected, setSocketConnected] = useState(false);
  const [newNotificationPulse, setNewNotificationPulse] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const socketConnectedRef = useRef(false);

  const { data, loading, fetchMore, refetch } =
    useQuery<NotificationsData>(ADMIN_NOTIFICATIONS_QUERY, {
      variables: {
        filter: { limit: pageSize, offset: 0, unreadOnly: false },
      },
      fetchPolicy: "network-only",
      errorPolicy: "all",
    });

  const { data: unreadData, refetch: refetchUnread } =
    useQuery<UnreadCountData>(
      ADMIN_NOTIFICATIONS_UNREAD_COUNT_QUERY,
      {
        fetchPolicy: "network-only",
        errorPolicy: "all",
      }
    );

  useEffect(() => {
    if (!unreadData?.adminNotificationsUnreadCount) {
      return;
    }
    setUnreadCount((prev) =>
      Math.max(prev, unreadData.adminNotificationsUnreadCount.count)
    );
  }, [unreadData]);

  const [markReadMutation] = useMutation(
    ADMIN_MARK_NOTIFICATION_READ_MUTATION
  );
  const [markAllReadMutation] = useMutation(
    ADMIN_MARK_ALL_NOTIFICATIONS_READ_MUTATION
  );

  useEffect(() => {
    if (!data?.adminNotifications) {
      return;
    }

    setItems((prev) => mergeFirstPage(prev, data.adminNotifications));
  }, [data]);

  useEffect(() => {
    const origin = getSocketOrigin(backendUrl);
    if (!origin) {
      return;
    }

    let socket: import("socket.io-client").Socket | null = null;
    let cancelled = false;

    import("socket.io-client").then(({ io }) => {
      if (cancelled) {
        return;
      }

      socket = io(origin, {
        path: "/chat-socket",
        withCredentials: true,
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        socketConnectedRef.current = true;
        setSocketConnected(true);
      });

      socket.on("disconnect", () => {
        socketConnectedRef.current = false;
        setSocketConnected(false);
      });

      socket.on(
        "admin:notification:new",
        (payload: AdminNotificationSocketEvent) => {
          const notification = payload.notification;
          let inserted = false;

          setItems((prev) => {
            if (prev.some((item) => item.id === notification.id)) {
              return prev;
            }
            inserted = true;
            return [{ ...notification, isRead: false }, ...prev];
          });

          if (inserted) {
            setUnreadCount((count) => count + 1);
            setNewNotificationPulse((pulse) => pulse + 1);
          }

          // Обновляем списки заявок, пользователей и чатов по entityType
          const { entityType } = notification;
          if (entityType === "order") {
            void client.refetchQueries({ include: [ADMIN_ORDERS] });
          } else if (entityType === "user") {
            void client.refetchQueries({ include: [GET_USERS] });
          } else if (entityType === "chat" || entityType === "message") {
            void client.refetchQueries({ include: [AdminChatsDocument] });
          }
        }
      );
    });

    return () => {
      cancelled = true;
      socketConnectedRef.current = false;
      setSocketConnected(false);
      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
        socket = null;
      }
    };
  }, [backendUrl]);

  const markRead = useCallback(
    async (notificationId: string) => {
      const target = items.find((item) => item.id === notificationId);
      if (!target || target.isRead) {
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === notificationId
            ? { ...item, isRead: true }
            : item
        )
      );
      setUnreadCount((count) => Math.max(0, count - 1));

      try {
        await markReadMutation({ variables: { notificationId } });
      } catch {
        await Promise.all([refetch(), refetchUnread()]);
      }
    },
    [items, markReadMutation, refetch, refetchUnread]
  );

  const markAllRead = useCallback(async () => {
    if (unreadCount <= 0) {
      return;
    }

    setItems((prev) =>
      prev.map((item) => ({ ...item, isRead: true }))
    );
    setUnreadCount(0);

    try {
      await markAllReadMutation();
    } catch {
      await Promise.all([refetch(), refetchUnread()]);
    }
  }, [markAllReadMutation, refetch, refetchUnread, unreadCount]);

  const loadMore = useCallback(async () => {
    if (isLoadingMore) {
      return;
    }

    setIsLoadingMore(true);
    try {
      const current = items.length;
      const response = await fetchMore({
        variables: {
          filter: {
            limit: pageSize,
            offset: current,
            unreadOnly: false,
          },
        },
      });

      const next = (response.data?.adminNotifications ??
        []) as AdminNotification[];
      if (!next.length) {
        return;
      }

      setItems((prev) => {
        const ids = new Set(prev.map((item) => item.id));
        const deduped = next.filter((item) => !ids.has(item.id));
        return deduped.length ? [...prev, ...deduped] : prev;
      });
    } finally {
      setIsLoadingMore(false);
    }
  }, [fetchMore, isLoadingMore, items.length, pageSize]);

  const hasUnread = useMemo(() => unreadCount > 0, [unreadCount]);

  return {
    items,
    unreadCount,
    hasUnread,
    loading,
    socketConnected,
    socketLive: socketConnectedRef.current,
    isLoadingMore,
    newNotificationPulse,
    refetchAll: async () => {
      await Promise.all([refetch(), refetchUnread()]);
    },
    loadMore,
    markRead,
    markAllRead,
  };
}
