export const PROGRAM_DETAIL_CLASSES = {
  container:
    "space-y-8 pb-[calc(6.5rem+env(safe-area-inset-bottom))] lg:pb-0",
  header: "space-y-4",
  title:
    "text-balance text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl",
  meta: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
  image: "object-cover",
  content: "grid grid-cols-1 lg:grid-cols-3 gap-8",
  main: "lg:col-span-2 space-y-6",
  sidebar: "lg:col-span-1 space-y-6",
  section:
    "rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm backdrop-blur-xl",
  sectionTitle: "mb-4 text-lg font-semibold text-foreground",
  pricingList: "space-y-3",
  pricingItem:
    "flex items-center justify-between rounded-xl border border-border/60 bg-muted/15 p-3",
  subProgramsList: "space-y-4",
  subProgramCard:
    "rounded-xl border border-border/60 bg-background/60 p-4 backdrop-blur",
  cta: "w-full",
} as const;
