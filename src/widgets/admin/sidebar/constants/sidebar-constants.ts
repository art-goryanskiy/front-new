export const SIDEBAR_TEXTS = {
  collapseMenu: "Свернуть меню",
  expandMenu: "Развернуть меню",
  logoAlt: "Логотип ЦОК Стандарт Плюс",
  goToAdminHome: "Перейти на главную страницу админки",
} as const;

export const SIDEBAR_CLASSES = {
  desktop: {
    base: "hidden lg:flex flex-col h-dvh sticky top-0 border-r border-border/60 bg-background/55 backdrop-blur-xl supports-backdrop-filter:bg-background/45",
    collapsed: "w-[88px]",
    expanded: "w-[296px]",
    logoSection: "px-4 py-4",
    logoButton:
      "group flex items-center justify-center rounded-xl p-2 transition-colors hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
    nav: "flex-1 p-2 space-y-1",
    footer:
      "p-3 border-t border-border/60 bg-background/35 backdrop-blur",
    collapseButton:
      "justify-start w-full h-auto text-muted-foreground hover:bg-muted/20 min-h-11 rounded-xl",
    collapseButtonText:
      "ml-2 font-medium text-left whitespace-normal wrap-break-word",
    expandButton: "w-full h-11 hover:bg-muted/20 rounded-xl",
  },

  navItem: {
    base: "group relative w-full rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
    collapsed: "justify-center h-11 min-w-11",
    expanded: "justify-start h-11 px-3",

    // “дорогой” active: soft fill + тонкий индикатор слева
    active:
      "bg-muted/25 text-foreground border border-border/60 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-1 before:rounded-full before:bg-primary",

    // inactive: читаемый muted + hover
    inactive:
      "text-muted-foreground hover:bg-muted/15 hover:text-foreground",

    icon: "shrink-0 transition-colors",
    iconActive: "text-primary",
    label: "ml-3 min-w-0 flex-1 truncate text-left font-medium",
    mobile: {
      base: "relative h-12 w-12 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      // на мобиле делаем контрастнее: primary tint + ring + dot
      active:
        "bg-primary/12 text-primary border border-primary/20 ring-1 ring-primary/20 after:absolute after:-bottom-0.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-primary",
      inactive: "text-muted-foreground hover:bg-muted/20",
    },
  },

  tooltip: {
    content: "bg-popover text-popover-foreground",
  },
} as const;

export const SIDEBAR_BREAKPOINT = "(max-width: 1199px)";
export const LOGO_SIZE = { width: 58, height: 58 };
export const ICON_SIZES = {
  desktop: 22,
  mobile: 20,
  footer: 20,
} as const;
