export type AdminNotificationType =
  | "USER_REGISTERED"
  | "ORDER_CREATED"
  | "ORDER_PAID"
  | "CHAT_CREATED"
  | "CHAT_MESSAGE";

export type AdminNotificationEntityType = "user" | "order" | "chat" | "message";

export interface AdminNotification {
  id: string;
  type: AdminNotificationType;
  entityType: AdminNotificationEntityType;
  entityId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AdminNotificationSocketEvent {
  notification: Omit<AdminNotification, "isRead">;
}
