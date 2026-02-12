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
      number
      status
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($orderId: ID!) {
    deleteOrder(orderId: $orderId)
  }
`;

export const UPDATE_ORDER = gql`
  ${ORDER_FIELDS}
  mutation UpdateOrder($orderId: ID!, $input: UpdateOrderInput!) {
    updateOrder(orderId: $orderId, input: $input) {
      ...OrderFields
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

/** Изменить статус заявки (только для админа) */
export const ADMIN_UPDATE_ORDER_STATUS = gql`
  ${ORDER_FIELDS}
  mutation AdminUpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
    adminUpdateOrderStatus(orderId: $orderId, status: $status) {
      ...OrderFields
    }
  }
`;

/** Удалить заявку (только для админа) */
export const ADMIN_DELETE_ORDER = gql`
  mutation AdminDeleteOrder($orderId: ID!) {
    adminDeleteOrder(orderId: $orderId)
  }
`;

/** Изменить дату документа (только для админа) */
export const ADMIN_UPDATE_ORDER_DOCUMENT_DATE = gql`
  mutation AdminUpdateOrderDocumentDate($input: AdminUpdateOrderDocumentDateInput!) {
    adminUpdateOrderDocumentDate(input: $input) {
      id
      orderId
      kind
      fileUrl
      documentDate
      createdAt
      updatedAt
    }
  }
`;

/** Сформировать договор по заявке (только для админа) */
export const ADMIN_GENERATE_ORDER_CONTRACT = gql`
  mutation AdminGenerateOrderContract($input: AdminGenerateOrderDocumentInput!) {
    adminGenerateOrderContract(input: $input) {
      id
      orderId
      kind
      fileUrl
      documentDate
      createdAt
      updatedAt
    }
  }
`;

/** Сформировать акт оказанных услуг по заявке (только для админа) */
export const ADMIN_GENERATE_ORDER_ACT = gql`
  mutation AdminGenerateOrderAct($input: AdminGenerateOrderDocumentInput!) {
    adminGenerateOrderAct(input: $input) {
      id
      orderId
      kind
      fileUrl
      documentDate
      createdAt
      updatedAt
    }
  }
`;
