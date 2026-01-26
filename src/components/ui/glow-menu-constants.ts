import {
  Home,
  BookOpen,
  GraduationCap,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";

/** Пункты для мобильного меню (иконка + label + href) */
export const GLOW_MENU_NAV_ITEMS = [
  {
    icon: Home as LucideIcon,
    label: "Главная",
    href: "/",
  },
  {
    icon: BookOpen as LucideIcon,
    label: CATEGORY_TYPE_LABELS.QUALIFICATION_UPGRADE,
    href: "/qualification-upgrade",
  },
  {
    icon: GraduationCap as LucideIcon,
    label: CATEGORY_TYPE_LABELS.PROFESSIONAL_RETRAINING,
    href: "/professional-retraining",
  },
  {
    icon: Briefcase as LucideIcon,
    label: CATEGORY_TYPE_LABELS.PROFESSIONAL_EDUCATION,
    href: "/professional-education",
  },
];
