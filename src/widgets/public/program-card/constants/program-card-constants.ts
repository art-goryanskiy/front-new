export const PROGRAM_CARD_CLASSES = {
  card: "group relative h-full bg-white dark:bg-slate-900 transition-all duration-300",
  iconWrapper:
    "relative w-full h-20 bg-gradient-to-br from-primary-100 via-purple-100 to-blue-100 dark:from-primary-900/30 dark:via-purple-900/30 dark:to-blue-900/30 flex items-center justify-center overflow-hidden shrink-0",
  icon: "w-12 h-12 text-primary-500 dark:text-primary-400",
  content: "p-4 flex-1 flex flex-col min-h-0",
  header: "flex items-start justify-between gap-2 shrink-0 mb-2",
  title:
    "text-lg font-bold text-default-900 dark:text-foreground flex-1 leading-tight",
  categoryChip: "shrink-0",
  description:
    "text-sm text-default-700 dark:text-foreground/95 line-clamp-2 flex-1 min-h-0 mb-2",
  meta: "flex flex-wrap items-center gap-2 text-xs text-default-700 dark:text-foreground/95 shrink-0 mb-2",
  metaItem: "flex items-center gap-1 h-4",
  footer:
    "flex items-center justify-between pt-2 border-t border-dashed border-default-300 dark:border-default-700 shrink-0",
  priceSection: "flex flex-col gap-0.5 min-h-[2rem] justify-center",
  price:
    "text-xl font-bold text-primary-600 dark:text-primary-400 leading-tight",
  priceFrom: "text-xs text-default-600 dark:text-foreground/90",
  views:
    "flex items-center gap-1 text-xs text-default-700 dark:text-foreground/95 h-4",
  cta: "w-full mt-2 shrink-0",
} as const;
