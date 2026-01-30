import { UserRole } from "@/shared/api/generated/graphql";

export const FORM_LABELS = {
  email: "Email",
  password: "Пароль",
  firstName: "Имя",
  lastName: "Фамилия",
  phone: "Телефон",
  role: "Роль",
  isBlocked: "Заблокирован",
} as const;

export const FORM_PLACEHOLDERS = {
  email: "Введите email",
  password: "Введите пароль",
  firstName: "Введите имя",
  lastName: "Введите фамилию",
  phone: "Введите телефон",
  role: "Выберите роль",
} as const;

export const FORM_MESSAGES = {
  emailRequired: "Email обязателен",
  emailInvalid: "Неверный формат email",
  passwordRequired: "Пароль обязателен",
  passwordMinLength: "Пароль должен содержать минимум 6 символов",
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
  actions:
    "-mx-6 sticky bottom-0 z-10 mt-6 flex w-full flex-wrap items-center justify-end gap-3 border-t border-border/60 bg-background/80 px-6 pt-4 pb-3 backdrop-blur-xl sm:flex-nowrap",
} as const;

export const USER_ROLE_OPTIONS: ReadonlyArray<{
  key: UserRole;
  label: string;
}> = [
  { key: UserRole.User, label: "Пользователь" },
  { key: UserRole.Admin, label: "Администратор" },
] as const;

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
