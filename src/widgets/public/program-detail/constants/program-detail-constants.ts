export const PROGRAM_DETAIL_CLASSES = {
  container: "space-y-8",
  header: "space-y-4",
  backButton: "mb-4",
  title: "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground",
  meta: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
  image: "w-full aspect-video rounded-2xl object-cover",
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
