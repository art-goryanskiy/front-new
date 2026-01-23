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
  return `${formatPrice(price)} ₽`;
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
