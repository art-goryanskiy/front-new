/**
 * Утилиты для работы с редиректом после аутентификации
 */

const RETURN_URL_KEY = "auth_return_url";

/**
 * Сохраняет URL для редиректа после логина
 */
export function saveReturnUrl(path: string): void {
  if (typeof window !== "undefined") {
    // Сохраняем только если это не страница логина/регистрации
    if (!path.startsWith("/login") && !path.startsWith("/register")) {
      sessionStorage.setItem(RETURN_URL_KEY, path);
    }
  }
}

/**
 * Получает сохраненный URL для редиректа
 */
export function getReturnUrl(defaultUrl: string = "/"): string {
  if (typeof window !== "undefined") {
    const savedUrl = sessionStorage.getItem(RETURN_URL_KEY);
    if (savedUrl) {
      sessionStorage.removeItem(RETURN_URL_KEY);
      return savedUrl;
    }
  }
  return defaultUrl;
}

/**
 * Очищает сохраненный URL
 */
export function clearReturnUrl(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(RETURN_URL_KEY);
  }
}
