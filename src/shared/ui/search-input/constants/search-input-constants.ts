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
    "group bg-card/80 backdrop-blur-xl border-2 border-border hover:border-primary/80 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-sm hover:shadow-lg focus-within:shadow-xl h-10 sm:h-12 rounded-xl",
  input: "text-sm sm:text-base placeholder:text-muted-foreground",
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
