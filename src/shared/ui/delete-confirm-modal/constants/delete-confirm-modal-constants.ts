/**
 * Константы для модального окна подтверждения удаления
 */
export const DELETE_CONFIRM_MODAL_TEXTS = {
  cancel: "Отмена",
  delete: "Удалить",
  warning:
    "Это действие нельзя отменить. Все данные, связанные с этой",
  willBeDeleted: "будут удалены.",
} as const;

export const DELETE_CONFIRM_MODAL_CLASSES = {
  errorContainer:
    "p-3 bg-destructive/10 border border-destructive/20 rounded-lg",
  errorText: "text-destructive text-sm",
  mainText: "text-foreground",
  itemName: "font-semibold",
  warningText: "text-sm text-muted-foreground",
} as const;
