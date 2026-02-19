/** Типы чата (до появления в codegen-схеме) */

export type ChatStatus = "OPEN" | "CLOSED";

export interface Chat {
  id: string;
  userId: string;
  status: ChatStatus;
  assignedToId?: string | null;
  createdAt: string;
  updatedAt: string;
  unreadCount?: number | null;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  isFromAdmin: boolean;
  body: string;
  createdAt: string;
  readAt?: string | null;
}

export interface ChatMessagesFilterInput {
  limit?: number | null;
  cursor?: string | null;
}

export interface SendMessageInput {
  chatId?: string | null;
  body: string;
}
