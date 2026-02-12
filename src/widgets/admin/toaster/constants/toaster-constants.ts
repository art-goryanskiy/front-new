/**
 * Константы для компонента уведомлений
 */
export const TOASTER_CONFIG = {
  autoHideDuration: 3000,
} as const;

export const TOASTER_ANIMATIONS = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 24 },
} as const;

export const TOASTER_CLASSES = {
  container: "fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6",
  toast: {
    base: "px-3 py-2 rounded-lg shadow-lg backdrop-blur-xl border text-sm",
    success: "bg-emerald-500/90 text-white border-emerald-400",
    error: "bg-rose-500/90 text-white border-rose-400",
    info: "bg-blue-500/90 text-white border-blue-400",
  },
  content: "flex items-center gap-2",
  icon: "text-base shrink-0",
  message: "font-medium",
} as const;

export const TOASTER_ICONS = {
  success: "✓",
  error: "✕",
  info: "ℹ",
} as const;

export function getToastClasses(
  type: "success" | "error" | "info"
): string {
  return `${TOASTER_CLASSES.toast.base} ${
    type === "success"
      ? TOASTER_CLASSES.toast.success
      : type === "error"
        ? TOASTER_CLASSES.toast.error
        : TOASTER_CLASSES.toast.info
  }`;
}
