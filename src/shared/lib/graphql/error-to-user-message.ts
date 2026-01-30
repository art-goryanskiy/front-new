const GENERIC_ERROR = "Произошла ошибка. Попробуйте позже.";

export function toUserFriendlyMessage(message: string): string {
  const raw = (message ?? "").trim();
  if (!raw) return GENERIC_ERROR;

  const m = raw.toLowerCase();

  // Rate limit
  if (m.includes("too many requests") || m.includes("429")) {
    return "Слишком часто. Попробуйте позже.";
  }

  // Mongo / DB conflict patterns
  if (
    m.includes("uniquekey") ||
    m.includes("would create a conflict") ||
    m.includes("e11000") ||
    m.includes("mongo")
  ) {
    return "Не удалось привязать организацию. Попробуйте ещё раз чуть позже.";
  }

  // Avoid showing overly technical / long messages to users
  if (raw.length > 180) return GENERIC_ERROR;

  return raw;
}
