import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import { CategoryType } from "@/shared/api/generated/graphql";

export const TOP_PROGRAMS_TEXTS = {
  title: "Популярные программы",
  subtitle: "Выберите программу, которая подходит именно вам",
  showMore: "Показать больше",
  noPrograms: "Программы не найдены",
  loading: "Загрузка программ...",
} as const;

export const TOP_PROGRAMS_TABS: ReadonlyArray<{
  key: CategoryType;
  label: string;
}> = [
  {
    key: CategoryType.QualificationUpgrade,
    label: CATEGORY_TYPE_LABELS.QUALIFICATION_UPGRADE,
  },
  {
    key: CategoryType.ProfessionalRetraining,
    label: CATEGORY_TYPE_LABELS.PROFESSIONAL_RETRAINING,
  },
  {
    key: CategoryType.ProfessionalEducation,
    label: CATEGORY_TYPE_LABELS.PROFESSIONAL_EDUCATION,
  },
] as const;

export const TOP_PROGRAMS_CLASSES = {
  section: "relative py-14 sm:py-18 lg:py-22",
  container:
    "mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12",
  header: "text-center space-y-3 mb-10",
  title:
    "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground",
  subtitle:
    "text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto",
  tabs: "mx-auto mb-8 flex w-full max-w-3xl flex-wrap justify-center gap-2",
  tab: "rounded-full px-4 py-2 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]",
  tabActive:
    "bg-primary text-primary-foreground shadow-lg shadow-primary/15",
  tabInactive:
    "border border-border/60 bg-background/60 text-foreground backdrop-blur hover:bg-muted/20",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",
  showMore: "flex justify-center",
  empty: "text-center py-12 text-muted-foreground",
} as const;
