import { gql } from "@apollo/client";

export const CHAT_FIELDS = gql`
  fragment ChatFields on Chat {
    id
    userId
    status
    assignedToId
    createdAt
    updatedAt
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
