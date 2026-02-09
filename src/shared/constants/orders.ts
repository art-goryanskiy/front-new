/** Подписи статусов заявки (бэкенд: AWAITING_PAYMENT, PAID, IN_PROGRESS, COMPLETED, CANCELLED). */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  AWAITING_PAYMENT: "Ожидает оплаты",
  PAID: "Оплачен",
  IN_PROGRESS: "В работе",
  COMPLETED: "Завершён",
  CANCELLED: "Отменён",
};

export const ORDER_CUSTOMER_TYPE_LABELS: Record<string, string> = {
  SELF: "Физ. лицо (я)",
  INDIVIDUAL: "Физ. лицо",
  ORGANIZATION: "Организация",
};
