/**
 * Константы для модального окна пользователя
 */
export const USER_MODAL_TEXTS = {
  edit: "Редактировать пользователя",
  create: "Создать нового пользователя",
} as const;

export const USER_MODAL_CONFIG = {
  size: "5xl" as const,
  scrollBehavior: "inside" as const,
  classNames: {
    base: "bg-background/95 backdrop-blur-xl border border-border shadow-2xl",
    header: "border-b border-border pb-4 px-6 pt-6 w-full",
    body: "px-6 py-6 w-full",
    wrapper: "w-full",
  },
} as const;
