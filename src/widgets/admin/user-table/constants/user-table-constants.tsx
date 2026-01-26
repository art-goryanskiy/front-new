import { Users } from "lucide-react";
import type { ReactElement } from "react";

/**
 * CSS классы для таблицы пользователей
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
  <Users className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
);
