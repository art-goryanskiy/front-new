import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import { CategoryType } from "@/shared/api/generated/graphql";

export const TOP_PROGRAMS_TEXTS = {
  title: "Наши программы",
  subtitle: "Выберите программу, которая подходит именно вам",
  showMore: "Показать больше",
  noPrograms: "Программы не найдены",
  loading: "Загрузка программ...",
} as const;

export const TOP_PROGRAMS_TABS: ReadonlyArray<{
  key: CategoryType | "all";
  label: string;
}> = [
  { key: "all", label: "Все программы" },
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
  section: "py-16 sm:py-20 lg:py-24 bg-background",
  container:
    "mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12",
  header: "text-center space-y-4 mb-12",
  title: "text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground",
  subtitle:
    "text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto",
  tabs: "flex flex-wrap justify-center gap-2 mb-8",
  tab: "px-6 py-2 rounded-full font-medium transition-all duration-300",
  tabActive: "bg-primary text-primary-foreground shadow-lg",
  tabInactive:
    "bg-card text-foreground hover:bg-accent border border-border",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8",
  showMore: "flex justify-center",
  empty: "text-center py-12 text-muted-foreground",
} as const;
