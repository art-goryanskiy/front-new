import { gql } from "@apollo/client";
import { ORDER_FIELDS } from "../queries/orders";

export const CREATE_ORDER_FROM_CART = gql`
  ${ORDER_FIELDS}
  mutation CreateOrderFromCart($input: CreateOrderFromCartInput!) {
    createOrderFromCart(input: $input) {
      ...OrderFields
    }
  }
`;

export const CREATE_ORDER_CARD_PAYMENT = gql`
  mutation CreateOrderCardPayment($orderId: ID!) {
    createOrderCardPayment(orderId: $orderId) {
      paymentId
      paymentUrl
      status
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      id
      status
    }
  }
`;

export const CREATE_ORDER_INVOICE = gql`
  mutation CreateOrderInvoice(
    $orderId: ID!
    $payerInn: String
    $payerKpp: String
    $payerName: String
  ) {
    createOrderInvoice(
      orderId: $orderId
      payerInn: $payerInn
      payerKpp: $payerKpp
      payerName: $payerName
    ) {
      pdfUrl
      invoiceId
      incomingInvoiceUrl
    }
  }
`;
