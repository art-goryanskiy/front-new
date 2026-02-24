import { gql } from "@apollo/client";

export const ADMIN_METRICS = gql`
  query AdminMetrics {
    adminMetrics {
      orderCounts {
        awaitingPayment
        paid
        inProgress
        completed
        cancelled
      }
      ordersTotal
      revenuePaid
      usersTotal
      usersNewLast30Days
      chatCounts {
        open
        closed
        openUnassigned
      }
      cartsWithItems
    }
  }
`;
