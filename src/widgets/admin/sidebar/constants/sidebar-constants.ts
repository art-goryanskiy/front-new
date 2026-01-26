/**
 * Константы для сайдбара
 */
export const SIDEBAR_TEXTS = {
  collapseMenu: "Свернуть меню",
  expandMenu: "Развернуть меню",
  logoAlt: "Логотип ЦОК Стандарт Плюс",
  goToAdminHome: "Перейти на главную страницу админки",
} as const;

export const SIDEBAR_CLASSES = {
  desktop: {
    base: "hidden lg:flex bg-linear-to-b from-background to-muted border-r border-border flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out shadow-sm",
    collapsed: "w-20",
    expanded: "max-w-[380px]",
    logoSection: "p-5 backdrop-blur-sm bg-background/80",
    logoButton:
      "p-1 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95",
    nav: "overflow-y-auto flex-1 p-3 space-y-2",
    footer:
      "p-4 border-t border-border bg-muted/50",
    collapseButton:
      "justify-start w-full h-auto text-muted-foreground hover:bg-muted min-h-12",
    collapseButtonText:
      "ml-2 font-medium text-left whitespace-normal wrap-break-word",
    expandButton: "w-full h-12 hover:bg-muted",
  },
  mobile: {
    base: "fixed right-0 bottom-0 left-0 z-50 border-t shadow-lg backdrop-blur-md lg:hidden bg-background/95 border-border",
    nav: "flex gap-1 justify-center items-center px-2 py-2",
  },
  navItem: {
    base: "w-full transition-all duration-200",
    collapsed: "justify-center h-12 min-w-12",
    expanded: "justify-start h-auto min-h-12",
    active: "shadow-md shadow-primary-500/20 font-semibold",
    inactive: "hover:bg-muted hover:scale-[1.02]",
    icon: "shrink-0 transition-transform",
    iconActive: "scale-110",
    label: "ml-2 text-left font-medium whitespace-normal wrap-break-word",
    mobile: {
      base: "min-w-14 h-14 transition-all",
      active: "shadow-lg scale-110",
      inactive: "hover:scale-105",
    },
  },
  tooltip: {
    content: "bg-popover text-popover-foreground",
  },
} as const;

export const SIDEBAR_BREAKPOINT = "(max-width: 1199px)";
export const LOGO_SIZE = { width: 58, height: 58 };
export const ICON_SIZES = {
  desktop: 26,
  mobile: 20,
  footer: 20,
} as const;
