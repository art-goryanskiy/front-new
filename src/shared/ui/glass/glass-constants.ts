/**
 * Классы для стеклянного эффекта на основе токенов из globals.css.
 * Использовать для хедеров, панелей, футера, модалок.
 */
export const GLASS_CLASSES = {
  /** Мягкое стекло: панели, тулбары */
  panel:
    "bg-[var(--glass-bg)] backdrop-blur-md border-border/60 supports-[backdrop-filter]:bg-[var(--glass-bg)]",
  /** Сильное стекло: хедеры, sticky-блоки */
  strong:
    "bg-[var(--glass-bg-strong)] backdrop-blur-xl border-border/50 supports-[backdrop-filter]:bg-[var(--glass-bg-strong)]",
  /** Карточки / Surface-стиль */
  card:
    "bg-[var(--glass-card)] backdrop-blur-md border border-[var(--glass-border)] supports-[backdrop-filter]:bg-[var(--glass-card)]",
  /** С тонким ring для «премиума» */
  panelWithRing:
    "bg-[var(--glass-bg)] backdrop-blur-xl border border-border/50 ring-1 ring-[var(--glass-ring)] shadow-md",
} as const;
