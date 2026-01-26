import { CategoryType } from "@/shared/api/generated/graphql";

/**
 * Константы для формы категории
 */
export const FORM_LABELS = {
  name: "Название категории",
  description: "Описание",
  type: "Тип категории",
  image: "Изображение",
} as const;

export const FORM_PLACEHOLDERS = {
  name: "Введите название категории",
  description: "Введите описание категории (необязательно)",
  type: "Выберите тип",
} as const;

export const FORM_MESSAGES = {
  nameRequired: "Название обязательно",
  typeRequired: "Тип категории обязателен",
  descriptionOptional: "Необязательное поле",
  selectImage: "Выбрать изображение",
  changeImage: "Изменить изображение",
  uploadingImage: "Загрузка изображения...",
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
    "text-sm font-semibold text-foreground uppercase tracking-wide mb-2",
  imageContainer: "space-y-3 w-full",
  imagePreview:
    "flex items-center gap-4 p-4 bg-card rounded-lg border border-border w-full",
  imageInput: "flex-1 w-full",
  imageFileName: "text-xs text-muted-foreground mt-2",
  uploadingText: "text-xs text-primary-600 dark:text-primary-400 font-medium",
  actions:
    "flex gap-3 justify-end pt-6 border-t border-border w-full",
} as const;

/**
 * Опции типов категорий
 */
export const CATEGORY_TYPE_OPTIONS: ReadonlyArray<{
  key: CategoryType;
  label: string;
}> = [
  { key: CategoryType.QualificationUpgrade, label: "Повышение квалификации" },
  {
    key: CategoryType.ProfessionalRetraining,
    label: "Профессиональная переподготовка",
  },
  {
    key: CategoryType.ProfessionalEducation,
    label: "Профессиональное обучение",
  },
] as const;
