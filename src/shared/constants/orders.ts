/** Подписи статусов заявки (бэкенд: AWAITING_PAYMENT, PAID, IN_PROGRESS, COMPLETED, CANCELLED). */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  AWAITING_PAYMENT: "Ожидает оплаты",
  PAID: "Оплачен",
  IN_PROGRESS: "В работе",
  COMPLETED: "Завершён",
  CANCELLED: "Отменён",
};

/** Классы для бейджей статусов заявки (единообразие списка и детальной страницы). */
export const ORDER_STATUS_BADGE_CLASSES: Record<string, string> = {
  AWAITING_PAYMENT:
    "border-amber-500/40 bg-amber-500/15 text-amber-800 dark:text-amber-300",
  PAID: "border-emerald-500/40 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300",
  IN_PROGRESS:
    "border-blue-500/40 bg-blue-500/15 text-blue-800 dark:text-blue-300",
  COMPLETED: "border-border/60 bg-muted/50 text-muted-foreground",
  CANCELLED:
    "border-destructive/40 bg-destructive/10 text-destructive",
};

export const ORDER_CUSTOMER_TYPE_LABELS: Record<string, string> = {
  SELF: "Физ. лицо (я)",
  INDIVIDUAL: "Физ. лицо",
  ORGANIZATION: "Организация",
};
