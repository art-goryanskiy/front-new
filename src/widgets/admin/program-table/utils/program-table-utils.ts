import {
  formatPrice,
  formatPricingAriaLabel,
} from "@/shared/lib/helpers/format-helpers";

type PricingItem = {
  hours: number;
  price?: number | null;
};

/**
 * Фильтрует валидные цены (часы > 0, цена > 0 и не null)
 */
export function filterValidPricing(
  pricing?: PricingItem[]
): PricingItem[] {
  if (!pricing) return [];

  return pricing.filter(
    (p) => p.hours > 0 && p.price != null && p.price > 0
  );
}

/**
 * Форматирует ранг из диапазона
 */
export function formatRank(
  from?: number | null,
  to?: number | null
): string {
  if (from != null && to != null) {
    return `${from} - ${to}`;
  }
  return "-";
}

/**
 * Проверяет, есть ли валидные цены
 */
export function hasValidPricing(pricing?: PricingItem[]): boolean {
  return filterValidPricing(pricing).length > 0;
}

// Экспортируем функции из общих утилит для обратной совместимости
export { formatPrice, formatPricingAriaLabel };
