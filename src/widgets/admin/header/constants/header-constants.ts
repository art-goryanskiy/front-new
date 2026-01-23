/**
 * Константы для хедера админки
 */
export const HEADER_CLASSES = {
  header:
    "sticky top-0 z-40 border-b shadow-sm backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-slate-200/50 dark:border-slate-800/50 shadow-slate-200/50 dark:shadow-slate-900/50",
  container: "mx-auto w-full max-w-7xl",
  content:
    "flex gap-2 justify-between items-center px-4 h-14 sm:h-16 sm:px-6 md:px-8 lg:px-10 xl:px-12 sm:gap-4",
  searchWrapper: "flex-1 min-w-0",
  actions: "flex gap-1 items-center sm:gap-2 shrink-0",
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
