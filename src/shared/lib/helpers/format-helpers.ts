/**
 * Форматирует цену для отображения (только число, без валюты)
 */
export function formatPrice(
  price: number | null | undefined
): string {
  if (!price || price === 0) return "0";
  return price.toLocaleString("ru-RU");
}

/**
 * Форматирует цену с валютой
 */
export function formatPriceWithCurrency(
  price: number | null | undefined
): string {
  if (!price || price === 0) return "-";
  return `${formatPrice(price)}\u00A0₽`;
}

/**
 * Форматирует цену с часами
 */
export function formatPricing(
  hours: number,
  price: number | null | undefined
): string {
  if (!hours || hours === 0) return "-";
  if (!price || price === 0) return `${hours} часов`;
  return `${hours}ч - ${formatPrice(price)}`;
}

/**
 * Форматирует цену с часами для aria-label
 */
export function formatPricingAriaLabel(
  hours: number,
  price: number | null | undefined
): string {
  if (!price || price === 0) return `${hours} часов`;
  return `${hours} часов - ${formatPrice(price)} рублей`;
}

/**
 * Форматирует дату в длинный формат с временем (для таблиц и карточек)
 * Пример: «15 января 2025, 14:30»
 */
export function formatAdminDate(
  date: string | Date | null | undefined
): string {
  if (!date) return "—";
  try {
    return new Date(String(date)).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(date);
  }
}

/**
 * Форматирует дату заявки: только дата без времени.
 * Безопасно к UTC-смещению (не показывает 03:00).
 * Пример: «15 января 2025 г.»
 */
export function formatOrderDate(
  date: string | unknown
): string {
  if (!date) return "—";
  try {
    return new Date(String(date)).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return String(date);
  }
}

/**
 * Форматирует дату документа (без времени).
 * Пример: «15 января 2025 г.»
 */
export { formatOrderDate as formatDocumentDate };

/**
 * Форматирует дату в короткий формат (для диапазонов, дат обучения)
 * Пример: «15.01.2025»
 */
export function formatShortDate(
  date: string | Date | null | undefined
): string {
  if (!date) return "";
  try {
    return new Date(String(date)).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return String(date);
  }
}

/**
 * Форматирует диапазон дат (для дат обучения)
 * Пример: «15.01.2025 – 20.02.2025»
 */
export function formatDateRange(
  start: string | Date | null | undefined,
  end: string | Date | null | undefined
): string {
  const s = formatShortDate(start).trim();
  const e = formatShortDate(end).trim();
  if (s && e) return `${s}\u2013${e}`;
  if (s) return s;
  if (e) return e;
  return "—";
}
