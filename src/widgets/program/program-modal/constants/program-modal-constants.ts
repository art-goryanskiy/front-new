/**
 * Константы для модального окна программы
 */
export const PROGRAM_MODAL_TEXTS = {
  edit: "Редактировать программу",
  create: "Создать новую программу",
} as const;

export const PROGRAM_MODAL_CONFIG = {
  size: "4xl" as const,
  scrollBehavior: "inside" as const,
  classNames: {
    base: "bg-background/95 backdrop-blur-xl border border-border shadow-2xl",
    header: "border-b border-border pb-4",
    body: "py-6",
  },
} as const;

export const PROGRAM_MODAL_ANIMATIONS = {
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
