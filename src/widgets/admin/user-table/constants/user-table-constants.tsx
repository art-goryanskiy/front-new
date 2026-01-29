import { Users } from "lucide-react";
import type { ReactElement } from "react";

export const TABLE_CLASSES = {
  // более “дорогая” панель
  wrapper:
    "min-h-[420px] overflow-hidden bg-gradient-to-b from-card/70 to-card/40",

  // sticky thead (фон + blur)
  thead:
    "sticky top-0 z-10 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55",

  // заголовки колонок
  th: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",

  // ячейки
  td: "px-4 py-3",

  // hover
  tr: "hover:bg-muted/30",

  // подпись снизу
  caption:
    "border-t border-border/60 bg-background/35 px-4 py-3 text-xs text-muted-foreground",

  // mobile cards
  cardsWrap: "grid gap-2 md:hidden",
  card: "p-3 hover:bg-card/80 transition-colors cursor-pointer",
  cardHeader: "flex items-start justify-between gap-3",
  cardMain: "min-w-0 flex-1",
  cardTitle: "text-sm font-semibold text-foreground line-clamp-1",
  cardSub: "mt-0.5 text-xs text-muted-foreground line-clamp-1",
  cardMeta: "mt-2 flex flex-wrap items-center gap-2",

  // pill только для "немых" метаданных (например даты)
  cardMetaPill:
    "inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[11px] text-muted-foreground",
} as const;

export const EMPTY_STATE_ICON: ReactElement = (
  <Users
    className="h-10 w-10 text-muted-foreground"
    aria-hidden="true"
  />
);
