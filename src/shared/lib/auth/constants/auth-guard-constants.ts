/**
 * Константы для компонента защиты маршрутов
 */
export const AUTH_GUARD_TEXTS = {
  loading: "Загрузка...",
  redirecting: "Перенаправление на страницу входа...",
} as const;

export const AUTH_GUARD_CLASSES = {
  loadingContainer: "min-h-screen flex items-center justify-center",
  loadingText: "text-gray-600",
} as const;

export const AUTH_GUARD_ROUTES = {
  login: "/login",
  home: "/",
  admin: "/admin",
  profile: "/profile",
} as const;
