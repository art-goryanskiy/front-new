"use client";

import {
  Home,
  GraduationCap,
  BookOpen,
  Briefcase,
} from "lucide-react";
import type { GlowMenuItem } from "@/components/ui/glow-menu";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";

export const GLOW_MENU_HEADER_ITEMS: GlowMenuItem[] = [
  {
    icon: Home,
    label: "Главная",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: GraduationCap,
    label: "Обучение",
    gradient:
      "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(126,34,206,0.06) 50%, rgba(107,33,168,0) 100%)",
    iconColor: "text-purple-500",
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
];
