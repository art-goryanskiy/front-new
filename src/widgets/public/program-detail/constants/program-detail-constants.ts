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
  section: "p-6 bg-card rounded-xl border border-border",
  sectionTitle: "text-lg font-semibold text-foreground mb-4",
  pricingList: "space-y-3",
  pricingItem:
    "flex justify-between items-center p-3 bg-card rounded-lg border border-border",
  subProgramsList: "space-y-4",
  subProgramCard: "p-4 bg-card rounded-lg border border-border",
  cta: "w-full",
} as const;
