export const REGISTER_FORM_TEXTS = {
  title: "Регистрация",
  email: {
    label: "Email",
    placeholder: "Введите email",
    required: "Email обязателен",
    invalidFormat: "Неверный формат email",
  },
  password: {
    label: "Пароль",
    placeholder: "Введите пароль",
    required: "Пароль обязателен",
    minLength: "Пароль должен содержать минимум 6 символов",
  },
  confirmPassword: {
    label: "Подтверждение пароля",
    placeholder: "Повторите пароль",
    required: "Подтверждение пароля обязательно",
    mismatch: "Пароли не совпадают",
  },
  submit: "Зарегистрироваться",
  error: {
    default: "Ошибка при регистрации",
  },
} as const;

export const REGISTER_FORM_CLASSES = {
  container: "w-full",
  form: "space-y-4",
  title:
    "text-5xl font-bold mb-6 text-foreground max-xl:text-4xl " +
    "max-lg:text-4xl max-md:text-3xl max-sm:text-2xl max-sm:mb-4 " +
    "transition-opacity duration-300",
  errorContainer:
    "p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg",
  errorText: "text-danger-800 dark:text-danger-200 text-sm",
  submitButton: "w-full",
  // Стили инпутов как у поискового инпута для темной темы
  inputClassNames: {
    inputWrapper:
      "bg-card/80 backdrop-blur-xl border-2 border-border hover:border-primary/80 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 shadow-sm hover:shadow-lg focus-within:shadow-xl",
    input: "text-sm sm:text-base placeholder:text-muted-foreground",
    label: "text-foreground",
  },
} as const;

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
