// src/widgets/admin/program-table/constants/program-table-constants.tsx
import { BookOpen } from "lucide-react";
import type { ReactElement } from "react";

/**
 * CSS классы для таблицы программ
 */
export const TABLE_CLASSES = {
  wrapper: "min-h-[400px] overflow-hidden",
  th: "bg-muted/50 text-muted-foreground font-bold text-xs uppercase tracking-wider",
  td: "py-5",
  tr: "hover:bg-muted/50 transition-colors cursor-pointer",
} as const;

/**
 * Иконка для пустого состояния
 */
export const EMPTY_STATE_ICON: ReactElement = (
  <BookOpen className="w-10 h-10 text-muted-foreground" aria-hidden="true" />
);

/**
 * Порог просмотров для показа бейджа популярности
 */
export const POPULAR_VIEWS_THRESHOLD = 100;
