const GENERIC_ERROR = "Произошла ошибка. Попробуйте позже.";

export interface ParsedApolloError {
  message: string;
  is401: boolean;
}

/**
 * Разбирает ошибку Apollo/GraphQL: извлекает текст сообщения и признак 401 (UNAUTHENTICATED).
 */
export function parseApolloError(error: unknown): ParsedApolloError {
  let message = "";
  let is401 = false;

  if (error && typeof error === "object") {
    const o = error as Record<string, unknown>;
    const gql = o.graphQLErrors as
      | Array<{ message?: string; extensions?: { code?: string } }>
      | undefined;
    if (Array.isArray(gql) && gql.length > 0) {
      if (gql[0]?.message) message = String(gql[0].message).trim();
      is401 = gql.some(
        (g) => g?.extensions?.code === "UNAUTHENTICATED"
      );
    }
    if (
      !message &&
      o.networkError &&
      typeof o.networkError === "object"
    ) {
      const net = o.networkError as {
        message?: string;
        statusCode?: number;
      };
      if (net.message) message = String(net.message).trim();
      if (net.statusCode === 401) is401 = true;
    }
    if (!message && typeof o.message === "string")
      message = (o.message as string).trim();
  }

  if (!message && error instanceof Error)
    message = error.message.trim();

  return { message, is401 };
}

/**
 * Проверяет, является ли ошибка 401 / UNAUTHENTICATED (редирект на логин).
 */
export function isApolloUnauthenticated(error: unknown): boolean {
  return parseApolloError(error).is401;
}

/**
 * Извлекает понятное сообщение об ошибке для форм админки (категории, программы).
 * Учитывает Apollo/GraphQL (graphQLErrors, networkError) и обычные Error.
 */
export function getAdminFormErrorMessage(
  error: unknown,
  fallback: string
): string {
  const { message: raw } = parseApolloError(error);
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
