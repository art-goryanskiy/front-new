import { gql } from "@apollo/client";

export const ADMIN_NOTIFICATIONS_QUERY = gql`
  query AdminNotifications($filter: AdminNotificationsFilterInput) {
    adminNotifications(filter: $filter) {
      id
      type
      entityType
      entityId
      title
      message
      isRead
      createdAt
    }
  }
`;

export const ADMIN_NOTIFICATIONS_UNREAD_COUNT_QUERY = gql`
  query AdminNotificationsUnreadCount {
    adminNotificationsUnreadCount {
      count
    }
  }
`;
