import { BookOpen } from "lucide-react";
import type { ReactElement } from "react";

export const TABLE_CLASSES = {
  wrapper:
    "min-h-[420px] overflow-hidden rounded-xl border border-border/40 bg-[var(--glass-card)] backdrop-blur-md",

  thead:
    "sticky top-0 z-10 border-b border-border/50 bg-[var(--glass-bg)] backdrop-blur-md",

  th:
    "px-3 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",

  td: "px-3 py-2.5",
  tr: "hover:bg-muted/20 transition-colors",

  caption:
    "border-t border-border/60 bg-background/35 px-4 py-3 text-xs text-muted-foreground",

  // mobile cards
  cardsWrap: "grid gap-2 md:hidden",
  card:
    "p-3 rounded-xl border border-border/40 bg-[var(--glass-card)]/80 backdrop-blur-sm hover:bg-[var(--glass-bg)]/80 transition-colors cursor-pointer",
  cardHeader: "flex items-start justify-between gap-3",
  cardMain: "min-w-0 flex-1",
  cardMeta: "mt-2 flex flex-wrap items-center gap-2",
  cardMetaPill:
    "inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[11px] text-muted-foreground",
} as const;

export const EMPTY_STATE_ICON: ReactElement = (
  <BookOpen
    className="h-10 w-10 text-muted-foreground"
    aria-hidden="true"
  />
);

export const POPULAR_VIEWS_THRESHOLD = 100;
