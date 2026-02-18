export const FORM_LABELS = {
  name: "Название документа",
  image: "Изображение",
} as const;

export const FORM_PLACEHOLDERS = {
  name: "Введите название документа",
} as const;

export const FORM_MESSAGES = {
  nameRequired: "Название обязательно",
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
    "w-full rounded-2xl border border-destructive/30 bg-destructive/10 p-4 backdrop-blur",
  errorText: "text-sm font-medium text-destructive",
  section:
    "w-full space-y-4 rounded-2xl border border-border/60 bg-background/50 p-5 shadow-sm backdrop-blur-xl",
  sectionTitle:
    "mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
  imageContainer: "space-y-3 w-full",
  imagePreview:
    "flex w-full items-center gap-4 rounded-xl border border-border/60 bg-background/50 p-4",
  imageInput: "flex-1 w-full",
  imageFileName: "text-xs text-muted-foreground mt-2",
  uploadingText:
    "text-xs text-primary-600 dark:text-primary-400 font-medium",
  actions:
    "-mx-6 sticky bottom-0 z-10 mt-6 flex w-full flex-wrap items-center justify-end gap-3 border-t border-border/60 bg-background/80 px-6 pt-4 pb-3 backdrop-blur-xl sm:flex-nowrap",
} as const;
