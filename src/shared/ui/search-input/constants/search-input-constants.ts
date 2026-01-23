/**
 * Константы для компонента поиска
 */
export const SEARCH_INPUT_TEXTS = {
  defaultPlaceholder: "Поиск...",
  adminPlaceholder: "Поиск по категориям и программам...",
  keyboardHint: "K",
} as const;

export const SEARCH_INPUT_CLASSES = {
  wrapper: "relative w-full",
  inputWrapper:
    "group bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-2 border-slate-200/60 dark:border-slate-700/60 hover:border-primary-400/80 dark:hover:border-primary-500/80 focus-within:border-primary-500 dark:focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/20 dark:focus-within:ring-primary-400/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary-500/10 dark:hover:shadow-primary-400/20 focus-within:shadow-xl focus-within:shadow-primary-500/20 dark:focus-within:shadow-primary-400/30 h-10 sm:h-12 rounded-xl",
  input:
    "text-sm sm:text-base placeholder:text-slate-400 dark:placeholder:text-slate-500",
  base: "max-w-full",
} as const;

export const SEARCH_INPUT_ANIMATIONS = {
  wrapper: {
    whileHover: { scale: 1.005 },
    whileTap: { scale: 0.998 },
  },
  icon: {
    transition: { duration: 0.2 },
  },
} as const;
