export const PROGRAM_DETAIL_CLASSES = {
  container: "space-y-8",
  header: "space-y-4",
  backButton: "mb-4",
  title:
    "text-3xl sm:text-4xl lg:text-5xl font-bold text-default-900 dark:text-foreground",
  meta: "flex flex-wrap items-center gap-4 text-sm text-default-600 dark:text-foreground/95",
  image: "w-full aspect-video rounded-2xl object-cover",
  content: "grid grid-cols-1 lg:grid-cols-3 gap-8",
  main: "lg:col-span-2 space-y-6",
  sidebar: "lg:col-span-1 space-y-6",
  section:
    "p-6 bg-default-50 dark:bg-content1 rounded-xl border border-default-200 dark:border-default-800",
  sectionTitle:
    "text-lg font-semibold text-default-900 dark:text-foreground mb-4",
  pricingList: "space-y-3",
  pricingItem:
    "flex justify-between items-center p-3 bg-white dark:bg-content1 rounded-lg border border-default-200 dark:border-default-800",
  subProgramsList: "space-y-4",
  subProgramCard:
    "p-4 bg-white dark:bg-content1 rounded-lg border border-default-200 dark:border-default-800",
  cta: "w-full",
} as const;
