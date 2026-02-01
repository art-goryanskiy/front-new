import type { OrderStatus } from "@/shared/api/generated/graphql";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  DRAFT: "Черновик",
  SUBMITTED: "Оформлен",
  PAYMENT_PENDING: "Ожидает оплаты",
  PAID: "Оплачен",
  DOCUMENTS_GENERATED: "Документы сформированы",
  CANCELLED: "Отменён",
  COMPLETED: "Завершён",
};

export const ORDER_CUSTOMER_TYPE_LABELS: Record<string, string> = {
  SELF: "Физ. лицо (я)",
  INDIVIDUAL: "Физ. лицо",
  ORGANIZATION: "Организация",
};
