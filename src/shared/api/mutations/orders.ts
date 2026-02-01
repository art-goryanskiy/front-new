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

export const CREATE_ORDER_SBP_LINK = gql`
  mutation CreateOrderSbpLink($orderId: ID!) {
    createOrderSbpLink(orderId: $orderId) {
      url
      qrId
      dueDate
      qrImageBase64
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
