import { BookOpen, Eye, Folder, Tag } from "lucide-react";
import type { ReactElement } from "react";

export type StatCardColor =
  | "primary"
  | "success"
  | "warning"
  | "danger";

/**
 * Мягкий акцент-фон (не “заливка”, а лёгкий градиент).
 * В основном используем токены, но для success/warning/danger — аккуратные семантические цвета.
 */
export const ACCENT_GRADIENT: Record<StatCardColor, string> = {
  primary: "from-primary/18 via-primary/8 to-transparent",
  success: "from-emerald-500/16 via-emerald-500/7 to-transparent",
  warning: "from-amber-500/16 via-amber-500/7 to-transparent",
  danger: "from-rose-500/16 via-rose-500/7 to-transparent",
} as const;

/**
 * Стили “glass badge” для иконки.
 */
export const ICON_BADGE_CLASSES: Record<StatCardColor, string> = {
  primary: "border-primary/20 bg-primary/10 text-primary",
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-500",
  danger: "border-rose-500/20 bg-rose-500/10 text-rose-500",
} as const;

/**
 * Иконки для карточек статистики
 */
export const STAT_ICONS = {
  categories: Folder,
  programs: BookOpen,
  views: Eye,
  types: Tag,
} as const;

/**
 * Создаёт иконку для карточки статистики
 */
export function createStatIcon(
  iconType: keyof typeof STAT_ICONS,
  className?: string
): ReactElement {
  const IconComponent = STAT_ICONS[iconType];
  return <IconComponent className={className} aria-hidden="true" />;
}
