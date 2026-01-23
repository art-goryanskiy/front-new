/**
 * Константы для модального окна подтверждения удаления
 */
export const DELETE_CONFIRM_MODAL_TEXTS = {
  cancel: "Отмена",
  delete: "Удалить",
  warning: "Это действие нельзя отменить. Все данные, связанные с этой",
  willBeDeleted: "будут удалены.",
} as const;

export const DELETE_CONFIRM_MODAL_CLASSES = {
  errorContainer: "p-3 bg-danger-50 border border-danger-200 rounded-lg",
  errorText: "text-danger-800 text-sm",
  mainText: "text-default-700",
  itemName: "font-semibold",
  warningText: "text-sm text-default-500",
} as const;
