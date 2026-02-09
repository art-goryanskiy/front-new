import { gql } from "@apollo/client";

export const ORDER_FIELDS = gql`
  fragment OrderFields on Order {
    id
    number
    userId
    customerType
    organizationId
    contactEmail
    contactPhone
    status
    totalAmount
    createdAt
    updatedAt
    lines {
      programId
      programTitle
      hours
      price
      quantity
      lineAmount
      learners {
        lastName
        firstName
        middleName
        email
        phone
      }
    }
  }
`;

export const MY_ORDERS = gql`
  ${ORDER_FIELDS}
  query MyOrders($filter: MyOrdersFilterInput) {
    myOrders(filter: $filter) {
      ...OrderFields
    }
  }
`;

export const ORDER = gql`
  ${ORDER_FIELDS}
  query Order($id: ID!) {
    order(id: $id) {
      ...OrderFields
    }
  }
`;

export const ORDER_INVOICE_STATUS = gql`
  query OrderInvoiceStatus($orderId: ID!) {
    orderInvoiceStatus(orderId: $orderId) {
      status
    }
  }
`;

export const ORDER_PAYMENT_SYNC = gql`
  query OrderPaymentSync($orderId: ID!) {
    orderPaymentSync(orderId: $orderId) {
      status
      updated
      payments {
        paymentId
        status
      }
    }
  }
`;
