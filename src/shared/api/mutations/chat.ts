import { gql } from "@apollo/client";
import { CHAT_MESSAGE_FIELDS } from "../queries/chat";
import { ADMIN_CHAT_FIELDS } from "../queries/chat";

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      ...ChatMessageFields
    }
  }
  ${CHAT_MESSAGE_FIELDS}
`;

export const ADMIN_ASSIGN_CHAT = gql`
  mutation AdminAssignChat($input: AdminAssignChatInput!) {
    adminAssignChat(input: $input) {
      ...AdminChatFields
    }
  }
  ${ADMIN_CHAT_FIELDS}
`;

export const ADMIN_SET_CHAT_STATUS = gql`
  mutation AdminSetChatStatus($input: AdminSetChatStatusInput!) {
    adminSetChatStatus(input: $input) {
      ...AdminChatFields
    }
  }
  ${ADMIN_CHAT_FIELDS}
`;
