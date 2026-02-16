const GENERIC_ERROR = "Произошла ошибка. Попробуйте позже.";

/**
 * Извлекает понятное сообщение об ошибке для форм админки (категории, программы).
 * Учитывает Apollo/GraphQL (graphQLErrors, networkError) и обычные Error.
 */
export function getAdminFormErrorMessage(
  error: unknown,
  fallback: string
): string {
  let raw = "";

  if (error && typeof error === "object") {
    const o = error as Record<string, unknown>;
    const gql = o.graphQLErrors as Array<{ message?: string }> | undefined;
    if (Array.isArray(gql) && gql.length > 0 && gql[0]?.message) {
      raw = String(gql[0].message).trim();
    }
    if (!raw && o.networkError && typeof o.networkError === "object") {
      const msg = (o.networkError as { message?: string }).message;
      if (msg) raw = String(msg).trim();
    }
    if (!raw && typeof o.message === "string") raw = o.message.trim();
  }

  if (!raw && error instanceof Error) raw = error.message.trim();

  if (!raw) return fallback;
  const friendly = toUserFriendlyMessage(raw);
  return friendly || fallback;
}

export function toUserFriendlyMessage(message: string): string {
  const raw = (message ?? "").trim();
  if (!raw) return GENERIC_ERROR;

  const m = raw.toLowerCase();

  // Rate limit
  if (m.includes("too many requests") || m.includes("429")) {
    return "Слишком часто. Попробуйте позже.";
  }

  // Mongo / DB conflict / duplicate key
  if (
    m.includes("uniquekey") ||
    m.includes("would create a conflict") ||
    m.includes("e11000") ||
    m.includes("duplicate") ||
    m.includes("already exists") ||
    m.includes("unique constraint")
  ) {
    if (m.includes("organization") || m.includes("организац")) {
      return "Не удалось привязать организацию. Попробуйте ещё раз чуть позже.";
    }
    return "Запись с такими данными уже существует. Проверьте название, slug или другие уникальные поля.";
  }

  // Avoid showing overly technical / long messages to users
  if (raw.length > 180) return GENERIC_ERROR;

  return raw;
}
