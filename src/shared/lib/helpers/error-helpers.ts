/**
 * Безопасно выполняет асинхронную операцию, возвращая fallback значение при ошибке
 */
export async function safeAsync<T>(
  promise: Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

/**
 * Безопасно выполняет асинхронную операцию, возвращая null при ошибке
 */
export async function safeAsyncNull<T>(
  promise: Promise<T>
): Promise<T | null> {
  return safeAsync(promise, null);
}

/**
 * Безопасно выполняет асинхронную операцию, возвращая пустой массив при ошибке
 */
export async function safeAsyncArray<T>(
  promise: Promise<T[]>
): Promise<T[]> {
  return safeAsync(promise, []);
}
