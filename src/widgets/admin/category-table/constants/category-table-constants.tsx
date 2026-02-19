import { Folder } from "lucide-react";
import type { ReactElement } from "react";

export const TABLE_CLASSES = {
  wrapper:
    "min-h-[420px] overflow-hidden rounded-xl border border-border/50 bg-card/40",

  thead:
    "sticky top-0 z-10 border-b border-border/60 bg-background/95 backdrop-blur-sm",

  th:
    "px-3 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground",

  td: "px-3 py-2.5",
  tr: "hover:bg-muted/20 transition-colors",

  caption:
    "border-t border-border/60 bg-background/35 px-4 py-3 text-xs text-muted-foreground",

  // mobile cards
  cardsWrap: "grid gap-2 md:hidden",
  card: "p-3 hover:bg-card/80 transition-colors cursor-pointer",
  cardHeader: "flex items-start justify-between gap-3",
  cardMain: "min-w-0 flex-1",
  cardTitle: "text-sm font-semibold text-foreground line-clamp-1",
  cardSub: "mt-0.5 text-xs text-muted-foreground line-clamp-1",
  cardDesc: "mt-2 text-xs text-muted-foreground line-clamp-2",
  cardMeta: "mt-2 flex flex-wrap items-center gap-2",
  cardMetaPill:
    "inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2 py-1 text-[11px] text-muted-foreground",
} as const;

export const EMPTY_STATE_ICON: ReactElement = (
  <Folder
    className="h-10 w-10 text-muted-foreground"
    aria-hidden="true"
  />
);
