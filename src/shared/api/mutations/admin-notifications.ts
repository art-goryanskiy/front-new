import { gql } from "@apollo/client";

export const ADMIN_MARK_NOTIFICATION_READ_MUTATION = gql`
  mutation AdminMarkNotificationRead($notificationId: ID!) {
    adminMarkNotificationRead(notificationId: $notificationId)
  }
`;

export const ADMIN_MARK_ALL_NOTIFICATIONS_READ_MUTATION = gql`
  mutation AdminMarkAllNotificationsRead {
    adminMarkAllNotificationsRead
  }
`;
