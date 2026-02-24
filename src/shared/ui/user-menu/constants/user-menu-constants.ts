/**
 * Константы для меню пользователя
 */
export const USER_MENU_TEXTS = {
  defaultRole: "Пользователь",
  adminRole: "Администратор",
  profile: "Профиль",
  myOrders: "Мои заявки",
  admin: "В админку",
  logout: "Выйти",
} as const;

export const USER_MENU_CLASSES = {
  trigger:
    "flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl hover:bg-muted transition-all",
  avatar: "ring-2 shadow-lg bg-primary ring-primary/20 shrink-0",
  userInfo: "hidden text-left md:block",
  userName:
    "text-sm font-semibold text-foreground truncate max-w-[120px] lg:max-w-none",
  userRole: "text-xs font-medium text-muted-foreground",
  menu: "min-w-[200px] [&_*]:focus-visible:outline-none [&_*]:focus-visible:ring-0",
} as const;
