export const SUBCATEGORY_CARD_CLASSES = {
  card: "group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-background/60 shadow-sm backdrop-blur-xl transition-[border,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-border/80 hover:shadow-lg",

  imageWrapper:
    "relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-background/60 shadow-sm backdrop-blur",
  image: "object-contain p-2",
  fallbackGradient:
    "flex h-full w-full items-center justify-center bg-linear-to-br from-primary/10 via-background to-blue-500/10",

  content: "flex h-full min-h-[132px] flex-col gap-3 p-5",
  headerRow: "flex items-start gap-3",
  title:
    "min-w-0 flex-1 line-clamp-2 break-words hyphens-auto text-sm font-semibold leading-snug text-foreground",
  description:
    "text-sm leading-relaxed text-muted-foreground line-clamp-2",

  footer: "mt-auto flex items-center justify-between gap-3 pt-1",
  chip: "inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur",
  priceChip: "text-[11px] font-semibold text-foreground",
  priceEmphasis: "text-sm font-semibold text-foreground",
} as const;
