/**
 * Константы для модального окна категории
 */
export const CATEGORY_MODAL_TEXTS = {
  edit: "Редактировать категорию",
  create: "Создать новую категорию",
} as const;

export const CATEGORY_MODAL_CONFIG = {
  size: "3xl" as const,
  scrollBehavior: "inside" as const,
  classNames: {
    base: "bg-white/95 dark:bg-content1/95 backdrop-blur-xl border border-default-200 dark:border-default-800 shadow-2xl",
    header: "border-b border-default-200 dark:border-default-800 pb-4",
    body: "py-6",
  },
} as const;

export const CATEGORY_MODAL_ANIMATIONS = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: { duration: 0.2, ease: "easeOut" },
  },
} as const;
