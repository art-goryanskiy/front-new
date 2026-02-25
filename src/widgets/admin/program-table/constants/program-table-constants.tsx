import { BookOpen } from "lucide-react";
import type { ReactElement } from "react";

export const TABLE_CLASSES = {
  wrapper:
    "min-h-[420px] overflow-hidden rounded-xl border border-border/50 bg-background",

  thead:
    "sticky top-0 z-10 border-b border-border/60 bg-background/95",

  th: "px-3 py-2.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground",

  td: "px-3 py-2 align-middle",
  tr: "border-b border-border/40 hover:bg-muted/10 transition-colors",

  caption:
    "border-t border-border/60 bg-background/35 px-4 py-3 text-xs text-muted-foreground",

  // mobile cards
  cardsWrap: "grid gap-2 md:hidden",
  card: "p-3 rounded-xl border border-border/50 bg-background hover:bg-muted/10 transition-colors cursor-pointer",
  cardHeader: "flex items-start justify-between gap-3",
  cardMain: "min-w-0 flex-1",
  cardMeta: "mt-2 flex flex-wrap items-center gap-1.5",
  cardMetaPill:
    "inline-flex items-center rounded-full border border-border/60 bg-muted/10 px-2 py-0.5 text-[11px] text-muted-foreground",
} as const;

export const EMPTY_STATE_ICON: ReactElement = (
  <BookOpen
    className="h-10 w-10 text-muted-foreground"
    aria-hidden="true"
  />
);

export const POPULAR_VIEWS_THRESHOLD = 100;
