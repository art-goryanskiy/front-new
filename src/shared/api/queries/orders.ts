import { gql } from "@apollo/client";

export const ORDER_FIELDS = gql`
  fragment OrderFields on Order {
    id
    number
    userId
    customerType
    customerDisplayName
    organizationId
    contactEmail
    contactPhone
    status
    totalAmount
    createdAt
    updatedAt
    statusChangedAt
    trainingStartDate
    trainingEndDate
    trainingForm
    trainingLanguage
    headPosition
    headFullName
    contactPersonName
    contactPersonPosition
    lines {
      programId
      programTitle
      subProgramIndex
      subProgramTitle
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
        dateOfBirth
        citizenship
        passportSeries
        passportNumber
        passportIssuedBy
        passportIssuedAt
        passportDepartmentCode
        snils
        educationQualification
        educationDocumentIssuedAt
        passportRegistrationAddress
        residentialAddress
        workPlaceName
        position
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

/** Документы заявки (заявка на обучение, договор, акт) — для пользователя */
export const ORDER_DOCUMENTS = gql`
  query OrderDocuments($orderId: ID!) {
    orderDocuments(orderId: $orderId) {
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

/** Список заявок (только для админа) */
export const ADMIN_ORDERS = gql`
  ${ORDER_FIELDS}
  query AdminOrders($filter: AdminOrdersFilterInput) {
    adminOrders(filter: $filter) {
      ...OrderFields
    }
  }
`;

/** Одна заявка по ID (только для админа) */
export const ADMIN_ORDER = gql`
  ${ORDER_FIELDS}
  query AdminOrder($id: ID!) {
    adminOrder(id: $id) {
      ...OrderFields
    }
  }
`;

/** Документы по заявке (только для админа) */
export const ADMIN_ORDER_DOCUMENTS = gql`
  query AdminOrderDocuments($orderId: ID!) {
    adminOrderDocuments(orderId: $orderId) {
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
