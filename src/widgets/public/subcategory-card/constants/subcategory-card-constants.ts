export const SUBCATEGORY_CARD_CLASSES = {
  card: "group relative h-full bg-white dark:bg-slate-900 transition-all duration-300",
  imageWrapper: "relative w-full h-48 shrink-0",
  image: "object-contain",
  imageOverlay:
    "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20",
  imageOverlayTheme:
    "dark:from-transparent dark:via-transparent dark:to-black/40",
  fallbackGradient:
    "w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900 dark:to-purple-900",
  content: "p-6 flex-1 flex flex-col min-h-0",
  title:
    "text-xl font-bold text-default-900 dark:text-foreground mb-2 min-h-[3rem]",
  description:
    "text-sm text-default-700 dark:text-foreground/95 line-clamp-3 flex-1 min-h-[3.75rem] mb-4",
  footer: "flex flex-col gap-2 shrink-0 min-h-[3.5rem]",
  programsCount:
    "text-sm font-semibold text-default-700 dark:text-foreground/95 min-h-[1.5rem]",
  priceSection: "flex items-center gap-2 min-h-[1.5rem]",
  price: "text-lg font-bold text-primary-600 dark:text-primary-400",
  priceFrom: "text-xs text-default-600 dark:text-foreground/90",
  priceRange: "text-lg font-bold text-primary-600 dark:text-primary-400",
  lockedPrice:
    "flex items-center gap-1.5 text-xs text-default-600 dark:text-foreground/90 min-h-[1.5rem]",
  cta: "w-full mt-4 shrink-0",
} as const;
