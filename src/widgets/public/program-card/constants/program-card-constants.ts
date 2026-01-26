export const PROGRAM_CARD_CLASSES = {
  card: "group relative h-full text-card-foreground transition-all duration-300",
  iconWrapper:
    "relative w-full h-20 flex items-center justify-center overflow-hidden shrink-0",
  icon: "w-12 h-12 text-primary",
  content: "p-4 flex-1 flex flex-col min-h-0",
  header: "flex items-start justify-between gap-2 shrink-0 mb-2",
  title: "text-lg font-bold text-foreground flex-1 leading-tight",
  categoryChip: "shrink-0",
  description:
    "text-sm text-muted-foreground line-clamp-2 flex-1 min-h-0 mb-2",
  meta: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground shrink-0 mb-2",
  metaItem: "flex items-center gap-1 h-4",
  footer:
    "flex items-center justify-between pt-2 border-t border-dashed border-transparent shrink-0",
  priceSection: "flex flex-col gap-0.5 min-h-[2rem] justify-center",
  price: "text-xl font-bold text-primary leading-tight",
  priceFrom: "text-xs text-muted-foreground",
  views: "flex items-center gap-1 text-xs text-muted-foreground h-4",
  cta: "w-full mt-2 shrink-0",
} as const;
