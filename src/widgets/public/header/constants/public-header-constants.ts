export const PUBLIC_HEADER_CLASSES = {
  header:
    "sticky top-0 z-50 border-b shadow-sm backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-slate-800/50",
  container: "mx-auto w-full max-w-7xl",
  content:
    "flex gap-4 justify-between items-center px-4 h-16 sm:px-6 md:px-8 lg:px-10 xl:px-12",
  logo: "flex items-center gap-2 font-bold text-xl sm:text-2xl bg-linear-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent",
  nav: "hidden md:flex items-center gap-6",
  navLink:
    "text-sm font-medium text-default-700 dark:text-foreground hover:text-primary-600 dark:hover:text-primary-400 transition-colors",
  navLinkActive: "text-primary-600 dark:text-primary-400 font-semibold",
  actions: "flex gap-2 items-center shrink-0",
  mobileMenuButton: "md:hidden",
} as const;

export const PUBLIC_HEADER_ANIMATIONS = {
  header: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.3 },
  },
} as const;
