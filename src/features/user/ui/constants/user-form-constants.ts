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
    "p-4 bg-danger-50/80 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-xl backdrop-blur-sm w-full",
  errorText:
    "text-danger-800 dark:text-danger-200 text-sm font-medium",
  section:
    "space-y-4 p-5 bg-default-50/50 dark:bg-content1/50 rounded-xl border border-default-200/50 dark:border-default-800/50 w-full",
  sectionTitle:
    "text-sm font-semibold text-default-700 dark:text-foreground/90 uppercase tracking-wide mb-2",
  actions:
    "flex gap-3 justify-end pt-6 border-t border-default-200 dark:border-default-800 w-full",
} as const;

export const USER_ROLE_OPTIONS: ReadonlyArray<{
  key: UserRole;
  label: string;
}> = [
  { key: UserRole.User, label: "Пользователь" },
  { key: UserRole.Admin, label: "Администратор" },
] as const;

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
