/**
 * Константы для формы входа
 */
export const LOGIN_FORM_TEXTS = {
  title: "Вход",
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
  },
  submit: "Войти",
  error: {
    default: "Неверный email или пароль",
  },
} as const;

export const LOGIN_FORM_CLASSES = {
  container: "w-full",
  form: "space-y-4",
  title:
    "text-5xl font-bold mb-6 text-slate-900 dark:text-slate-50 max-xl:text-4xl " +
    "max-lg:text-4xl max-md:text-3xl max-sm:text-2xl max-sm:mb-4 " +
    "transition-opacity duration-300",
  errorContainer:
    "p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg",
  errorText: "text-red-800 dark:text-red-200 text-sm",
  submitButton: "w-full",
  // Стили инпутов как у поискового инпута для темной темы
  inputClassNames: {
    inputWrapper:
      "bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-2 border-slate-200/60 dark:border-slate-700/60 hover:border-primary-400/80 dark:hover:border-primary-500/80 focus-within:border-primary-500 dark:focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/20 dark:focus-within:ring-primary-400/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary-500/10 dark:hover:shadow-primary-400/20 focus-within:shadow-xl focus-within:shadow-primary-500/20 dark:focus-within:shadow-primary-400/30",
    input:
      "text-sm sm:text-base placeholder:text-slate-400 dark:placeholder:text-slate-500",
    label: "text-slate-700 dark:text-slate-300",
  },
} as const;

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
