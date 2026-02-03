import type { OrderStatus } from "@/shared/api/generated/graphql";

/** Подписи статусов заказа (схема + возможные значения бэкенда: NEW, AWAITING_PAYMENT, IN_PROGRESS). */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Черновик",
  SUBMITTED: "Оформлен",
  NEW: "Новый",
  AWAITING_PAYMENT: "Ожидает оплаты",
  PAYMENT_PENDING: "Ожидает оплаты",
  PAID: "Оплачен",
  IN_PROGRESS: "В работе",
  DOCUMENTS_GENERATED: "Документы сформированы",
  CANCELLED: "Отменён",
  COMPLETED: "Завершён",
};

export const ORDER_CUSTOMER_TYPE_LABELS: Record<string, string> = {
  SELF: "Физ. лицо (я)",
  INDIVIDUAL: "Физ. лицо",
  ORGANIZATION: "Организация",
};
