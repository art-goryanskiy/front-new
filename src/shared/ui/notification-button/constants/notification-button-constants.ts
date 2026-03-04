export const NOTIFICATION_BUTTON_CLASSES = {
  button:
    "relative overflow-visible h-9 w-9 sm:h-10 sm:w-10 transition-[box-shadow,background-color] duration-300",
  glow: "pointer-events-none absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0",
  badge:
    "absolute top-0 right-0 sm:-top-1 sm:-right-1 text-[9px] sm:text-[10px] h-4 sm:h-5 min-w-[16px] sm:min-w-[20px] px-1 sm:px-1.5 flex items-center justify-center rounded-full z-10 will-change-transform",
} as const;
