"use client";

import { Home, GraduationCap, BookOpen, Briefcase } from "lucide-react";
import type { GradientMenuItem } from "@/components/ui/gradient-menu";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";

export const GRADIENT_MENU_HEADER_ITEMS: GradientMenuItem[] = [
  {
    title: "Главная",
    icon: <Home className="size-5 sm:size-6" />,
    href: "/",
    gradientFrom: "#a955ff",
    gradientTo: "#ea51ff",
  },
  {
    title: CATEGORY_TYPE_LABELS.QUALIFICATION_UPGRADE,
    icon: <GraduationCap className="size-5 sm:size-6" />,
    href: "/qualification-upgrade",
    gradientFrom: "#56CCF2",
    gradientTo: "#2F80ED",
  },
  {
    title: CATEGORY_TYPE_LABELS.PROFESSIONAL_RETRAINING,
    icon: <BookOpen className="size-5 sm:size-6" />,
    href: "/professional-retraining",
    gradientFrom: "#FF9966",
    gradientTo: "#FF5E62",
  },
  {
    title: CATEGORY_TYPE_LABELS.PROFESSIONAL_EDUCATION,
    icon: <Briefcase className="size-5 sm:size-6" />,
    href: "/professional-education",
    gradientFrom: "#80FF72",
    gradientTo: "#7EE8FA",
  },
];
