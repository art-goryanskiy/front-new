/**
 * Константы для меню пользователя
 */
export const USER_MENU_TEXTS = {
  defaultRole: "Пользователь",
  adminRole: "Администратор",
  profile: "Профиль",
  settings: "Настройки",
  logout: "Выйти",
} as const;

export const USER_MENU_CLASSES = {
  trigger:
    "flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all",
  avatar:
    "ring-2 shadow-lg bg-linear-to-br from-primary-400 via-primary-500 to-primary-600 ring-primary-200 dark:ring-primary-800 shrink-0",
  userInfo: "hidden text-left md:block",
  userName:
    "text-sm font-semibold text-slate-900 dark:text-slate-100 truncate max-w-[120px] lg:max-w-none",
  userRole: "text-xs font-medium text-slate-500 dark:text-slate-400",
  menu: "min-w-[200px] bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl",
} as const;
