import { Folder, BookOpen, Eye, Tag } from "lucide-react";
import type { ReactElement } from "react";

export type StatCardColor = "primary" | "success" | "warning" | "danger";

/**
 * CSS классы для градиентов иконок
 */
export const COLOR_CLASSES: Record<StatCardColor, string> = {
  primary: "from-blue-500 via-blue-600 to-blue-700",
  success: "from-emerald-500 via-emerald-600 to-emerald-700",
  warning: "from-amber-500 via-amber-600 to-amber-700",
  danger: "from-rose-500 via-rose-600 to-rose-700",
} as const;

/**
 * CSS классы для теней
 */
export const SHADOW_COLORS: Record<StatCardColor, string> = {
  primary: "shadow-blue-500/20",
  success: "shadow-emerald-500/20",
  warning: "shadow-amber-500/20",
  danger: "shadow-rose-500/20",
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
 * Создает иконку для карточки статистики
 */
export function createStatIcon(
  iconType: keyof typeof STAT_ICONS,
  className?: string
): ReactElement {
  const IconComponent = STAT_ICONS[iconType];
  return <IconComponent className={className} aria-hidden="true" />;
}
