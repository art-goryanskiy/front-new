import { gql } from "@apollo/client";
import { CHAT_MESSAGE_FIELDS } from "../queries/chat";

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      ...ChatMessageFields
    }
  }
  ${CHAT_MESSAGE_FIELDS}
`;
