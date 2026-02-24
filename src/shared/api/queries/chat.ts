import { gql } from "@apollo/client";

export const CHAT_FIELDS = gql`
  fragment ChatFields on Chat {
    id
    userId
    status
    assignedToId
    createdAt
    updatedAt
    unreadCount
  }
`;

export const CHAT_MESSAGE_FIELDS = gql`
  fragment ChatMessageFields on ChatMessage {
    id
    chatId
    senderId
    isFromAdmin
    body
    createdAt
    readAt
  }
`;

export const MY_CHAT = gql`
  query MyChat {
    myChat {
      ...ChatFields
    }
  }
  ${CHAT_FIELDS}
`;

export const CHAT_MESSAGES = gql`
  query ChatMessages($chatId: ID!, $filter: ChatMessagesFilterInput) {
    chatMessages(chatId: $chatId, filter: $filter) {
      ...ChatMessageFields
    }
  }
  ${CHAT_MESSAGE_FIELDS}
`;

/** Фрагмент чата для админки (с lastMessagePreview, unreadCount) */
export const ADMIN_CHAT_FIELDS = gql`
  fragment AdminChatFields on Chat {
    id
    userId
    status
    assignedToId
    createdAt
    updatedAt
    lastMessagePreview
    unreadCount
  }
`;

export const ADMIN_CHATS = gql`
  query AdminChats($filter: AdminChatsFilterInput) {
    adminChats(filter: $filter) {
      ...AdminChatFields
    }
  }
  ${ADMIN_CHAT_FIELDS}
`;

export const ADMIN_CHAT_MESSAGES = gql`
  query AdminChatMessages(
    $chatId: ID!
    $filter: ChatMessagesFilterInput
  ) {
    adminChatMessages(chatId: $chatId, filter: $filter) {
      ...ChatMessageFields
    }
  }
  ${CHAT_MESSAGE_FIELDS}
`;
