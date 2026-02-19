import { GLASS_CLASSES } from "@/shared/ui/glass/glass-constants";

/**
 * Константы для хедера админки
 */
export const HEADER_CLASSES = {
  header: `sticky top-0 z-40 border-b ${GLASS_CLASSES.strong}`,
  container: "mx-auto w-full max-w-7xl",
  content:
    "flex h-14 items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6 md:px-8 lg:px-10 xl:px-12",
  searchWrapper: "flex-1 min-w-0",
  actions: "flex shrink-0 items-center gap-1 sm:gap-2",
} as const;

export const HEADER_ANIMATIONS = {
  header: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  },
  search: {
    whileHover: { scale: 1.01 },
    whileTap: { scale: 0.99 },
  },
  notification: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
  },
  userMenu: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
} as const;
