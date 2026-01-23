/**
 * Константы для компонента уведомлений
 */
export const TOASTER_CONFIG = {
  autoHideDuration: 3000,
  position: {
    top: "top-4",
    left: "left-1/2",
    transform: "-translate-x-1/2",
  },
} as const;

export const TOASTER_ANIMATIONS = {
  initial: { opacity: 0, y: -50, x: "-50%" },
  animate: { opacity: 1, y: 0, x: "-50%" },
  exit: { opacity: 0, y: -50, x: "-50%" },
} as const;

export const TOASTER_CLASSES = {
  container: "fixed top-4 left-1/2 z-50 transform -translate-x-1/2",
  toast: {
    base: "px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border",
    success: "bg-emerald-500/90 text-white border-emerald-400",
    error: "bg-rose-500/90 text-white border-rose-400",
    info: "bg-blue-500/90 text-white border-blue-400",
  },
  content: "flex items-center gap-3",
  icon: "text-xl",
  message: "font-medium",
} as const;

export const TOASTER_ICONS = {
  success: "✓",
  error: "✕",
  info: "ℹ",
} as const;

export function getToastClasses(type: "success" | "error" | "info"): string {
  return `${TOASTER_CLASSES.toast.base} ${
    type === "success"
      ? TOASTER_CLASSES.toast.success
      : type === "error"
        ? TOASTER_CLASSES.toast.error
        : TOASTER_CLASSES.toast.info
  }`;
}
