"use client";

import {
  Home,
  GraduationCap,
  BookOpen,
  Briefcase,
  Newspaper,
  Info,
  MapPin,
} from "lucide-react";
import type { GlowMenuItem } from "@/components/ui/glow-menu";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";

/* Градиенты и цвета из палитры primary (#e50914) */
export const GLOW_MENU_HEADER_ITEMS: GlowMenuItem[] = [
  {
    icon: Home,
    label: "Главная",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(229,9,20,0.15) 0%, rgba(229,9,20,0.06) 50%, transparent 100%)",
    iconColor: "text-primary",
  },
  {
    icon: GraduationCap,
    label: "Обучение",
    gradient:
      "radial-gradient(circle, rgba(229,9,20,0.12) 0%, rgba(196,8,18,0.05) 50%, transparent 100%)",
    iconColor: "text-primary-600 dark:text-primary-400",
    children: [
      {
        label: CATEGORY_TYPE_LABELS.QUALIFICATION_UPGRADE,
        href: "/qualification-upgrade",
        icon: GraduationCap,
      },
      {
        label: CATEGORY_TYPE_LABELS.PROFESSIONAL_RETRAINING,
        href: "/professional-retraining",
        icon: BookOpen,
      },
      {
        label: CATEGORY_TYPE_LABELS.PROFESSIONAL_EDUCATION,
        href: "/professional-education",
        icon: Briefcase,
      },
    ],
  },
  {
    icon: Newspaper,
    label: "Новости",
    href: "/news",
    gradient:
      "radial-gradient(circle, rgba(229,9,20,0.12) 0%, rgba(196,8,18,0.05) 50%, transparent 100%)",
    iconColor: "text-primary-600 dark:text-primary-400",
  },
  {
    icon: Info,
    label: "О нас",
    gradient:
      "radial-gradient(circle, rgba(229,9,20,0.12) 0%, rgba(196,8,18,0.05) 50%, transparent 100%)",
    iconColor: "text-primary-600 dark:text-primary-400",
    children: [
      {
        label: "Контакты",
        href: "/contacts",
        icon: MapPin,
      },
      // Позже: Преподаватели, Сведения об образовательной организации
    ],
  },
];
