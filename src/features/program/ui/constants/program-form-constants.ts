/**
 * Константы для формы программы
 */
export const FORM_LABELS = {
  title: "Название программы",
  description: "Описание",
  studentCategory: "Категория студентов",
  awardedQualification: "Присваиваемая квалификация",
  awardedRankFrom: "Ранг от",
  awardedRankTo: "Ранг до",
  pricing: "Цены и часы",
  hours: "Часы",
  price: "Цена",
  subPrograms: "Подпрограммы",
  subProgramTitle: "Название подпрограммы",
  subProgramDescription: "Описание подпрограммы",
} as const;

export const FORM_PLACEHOLDERS = {
  title: "Введите название программы",
  description: "Введите описание программы (необязательно)",
  studentCategory: "Введите категорию студентов",
  awardedQualification: "Введите квалификацию",
  awardedRankFrom: "0",
  awardedRankTo: "0",
  hours: "0",
  price: "0.00",
  subProgramTitle: "Введите название подпрограммы",
  subProgramDescription: "Введите описание (необязательно)",
} as const;

export const FORM_MESSAGES = {
  titleRequired: "Название обязательно",
  subProgramsDescription:
    "Добавьте подпрограммы для этой программы повышения квалификации",
  subProgramOptional: "Необязательное поле",
  addPricing: "+ Добавить цену",
  removePricing: "Удалить",
  addSubProgram: "+ Добавить подпрограмму",
  removeSubProgram: "Удалить подпрограмму",
  cancel: "Отмена",
  save: "Сохранить",
  create: "Создать",
} as const;

export const FORM_CLASSES = {
  form: "space-y-6 w-full",
  errorContainer:
    "p-4 bg-danger-50/80 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-xl backdrop-blur-sm w-full",
  errorText: "text-danger-800 dark:text-danger-200 text-sm font-medium",
  section:
    "space-y-4 p-5 bg-muted/50 rounded-xl border border-border w-full",
  sectionTitle:
    "text-sm font-semibold text-foreground uppercase tracking-wide mb-3",
  pricingContainer: "space-y-4 w-full",
  pricingLabel:
    "text-sm font-semibold text-foreground uppercase tracking-wide",
  pricingRow:
    "flex gap-3 items-end p-4 bg-card rounded-lg border border-border w-full",
  pricingInput: "flex-1 w-full",
  subProgramsContainer: "space-y-4 w-full",
  subProgramsLabel:
    "text-sm font-semibold text-foreground uppercase tracking-wide",
  subProgramsDescription:
    "text-xs text-muted-foreground mb-2",
  subProgramCard:
    "space-y-4 p-5 border border-border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow w-full",
  rankFields: "grid grid-cols-2 gap-4 w-full",
  actions:
    "flex gap-3 justify-end pt-6 border-t border-border w-full",
} as const;

export const DEFAULT_VALUES = {
  pricing: [{ hours: 0, price: 0 }],
  subPrograms: [{ title: "", description: "" }],
} as const;
