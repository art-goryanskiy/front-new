import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";

export const PUBLIC_HEADER_CLASSES = {
  header:
    "sticky top-0 z-50 border-b shadow-sm backdrop-blur-xl bg-background/95 border-border/50",
  container: "mx-auto w-full max-w-7xl",
  content:
    "flex gap-4 justify-between items-center px-4 h-16 sm:px-6 md:px-8 lg:px-10 xl:px-12",
  logo: "flex items-center gap-2 font-bold text-xl sm:text-2xl bg-linear-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent",
  nav: "hidden md:flex items-center gap-6",
  navLink:
    "text-sm font-medium text-foreground hover:text-primary transition-colors",
  navLinkActive:
    "text-primary-600 dark:text-primary-400 font-semibold",
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

export const FLOATING_NAV_ITEMS = [
  { name: "Главная", link: "/" },
  {
    name: CATEGORY_TYPE_LABELS.QUALIFICATION_UPGRADE,
    link: "/qualification-upgrade",
  },
  {
    name: CATEGORY_TYPE_LABELS.PROFESSIONAL_RETRAINING,
    link: "/professional-retraining",
  },
  {
    name: CATEGORY_TYPE_LABELS.PROFESSIONAL_EDUCATION,
    link: "/professional-education",
  },
] as const;

export const HEADER_NAV_ITEMS = [
  { label: "Главная", href: "/" },
  {
    label: "Обучение",
    children: [
      {
        label: CATEGORY_TYPE_LABELS.QUALIFICATION_UPGRADE,
        href: "/qualification-upgrade",
      },
      {
        label: CATEGORY_TYPE_LABELS.PROFESSIONAL_RETRAINING,
        href: "/professional-retraining",
      },
      {
        label: CATEGORY_TYPE_LABELS.PROFESSIONAL_EDUCATION,
        href: "/professional-education",
      },
    ],
  },
] as const;
