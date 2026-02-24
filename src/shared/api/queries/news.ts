import { gql } from "@apollo/client";

export const GET_NEWS = gql`
  query GetNews($filter: NewsFilterInput) {
    news(filter: $filter) {
      id
      text
      date
      vkUrl
      attachments {
        type
        url
        title
      }
    }
  }
`;
