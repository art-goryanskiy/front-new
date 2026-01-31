/**
 * Константы для формы программы
 */
export const FORM_LABELS = {
  title: "Название программы",
  shortTitle: "Короткое название",
  description: "Описание",
  studentCategory: "Категория студентов",
  educationDocument: "Документ об образовании",
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
  shortTitle: "Короткое название для карточек (до 80 символов)",
  description: "Введите описание программы (необязательно)",
  studentCategory: "Введите категорию студентов",
  educationDocument: "Выберите документ или оставьте пустым",
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
  shortTitleTooLong: "Максимум 80 символов",
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
    "w-full rounded-2xl border border-destructive/30 bg-destructive/10 p-4 backdrop-blur",
  errorText: "text-sm font-medium text-destructive",
  section:
    "w-full space-y-4 rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm backdrop-blur-xl transition-[border,box-shadow] focus-within:border-border/80 focus-within:ring-1 focus-within:ring-ring/30",
  sectionTitle:
    "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
  pricingContainer: "space-y-4 w-full",
  pricingLabel:
    "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
  pricingRow:
    "flex w-full items-end gap-3 rounded-xl border border-border/60 bg-background/50 p-4",
  pricingInput: "flex-1 w-full",
  subProgramsContainer: "space-y-4 w-full",
  subProgramsLabel:
    "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
  subProgramsDescription: "text-xs text-muted-foreground mb-2",
  subProgramCard:
    "w-full space-y-4 rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm backdrop-blur transition-shadow hover:shadow-md",
  rankFields: "grid grid-cols-2 gap-4 w-full",
  actions:
    "-mx-6 sticky bottom-0 z-10 mt-6 flex w-full flex-wrap items-center justify-end gap-3 border-t border-border/60 bg-background/80 px-6 pt-4 pb-3 backdrop-blur-xl sm:flex-nowrap",
} as const;

export const DEFAULT_VALUES = {
  pricing: [{ hours: 0, price: 0 }],
  subPrograms: [{ title: "", description: "" }],
} as const;
