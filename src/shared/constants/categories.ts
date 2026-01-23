import type { CategoryType } from "@/shared/api/generated/graphql";
import type { IconName } from "@/shared/ui/icons/icon";

export const CATEGORY_TYPES = {
  QUALIFICATION_UPGRADE: "QUALIFICATION_UPGRADE",
  PROFESSIONAL_RETRAINING: "PROFESSIONAL_RETRAINING",
  PROFESSIONAL_EDUCATION: "PROFESSIONAL_EDUCATION",
} as const;

export const CATEGORY_TYPE_LABELS: Record<CategoryType, string> = {
  QUALIFICATION_UPGRADE: "Повышение квалификации",
  PROFESSIONAL_RETRAINING: "Профессиональная переподготовка",
  PROFESSIONAL_EDUCATION: "Профессиональное обучение",
};

export const CATEGORY_TYPE_COLORS: Record<
  CategoryType,
  "primary" | "success" | "warning"
> = {
  QUALIFICATION_UPGRADE: "primary",
  PROFESSIONAL_RETRAINING: "success",
  PROFESSIONAL_EDUCATION: "warning",
};

export const CATEGORY_TYPE_ICONS: Record<CategoryType, IconName> = {
  QUALIFICATION_UPGRADE: "book",
  PROFESSIONAL_RETRAINING: "graduation-cap",
  PROFESSIONAL_EDUCATION: "briefcase",
};

export const MENU_ITEMS = [
  {
    type: CATEGORY_TYPES.QUALIFICATION_UPGRADE as CategoryType,
    label: CATEGORY_TYPE_LABELS.QUALIFICATION_UPGRADE,
    icon: CATEGORY_TYPE_ICONS.QUALIFICATION_UPGRADE,
    path: "/admin/qualification-upgrade",
    color: CATEGORY_TYPE_COLORS.QUALIFICATION_UPGRADE,
  },
  {
    type: CATEGORY_TYPES.PROFESSIONAL_RETRAINING as CategoryType,
    label: CATEGORY_TYPE_LABELS.PROFESSIONAL_RETRAINING,
    icon: CATEGORY_TYPE_ICONS.PROFESSIONAL_RETRAINING,
    path: "/admin/professional-retraining",
    color: CATEGORY_TYPE_COLORS.PROFESSIONAL_RETRAINING,
  },
  {
    type: CATEGORY_TYPES.PROFESSIONAL_EDUCATION as CategoryType,
    label: CATEGORY_TYPE_LABELS.PROFESSIONAL_EDUCATION,
    icon: CATEGORY_TYPE_ICONS.PROFESSIONAL_EDUCATION,
    path: "/admin/professional-education",
    color: CATEGORY_TYPE_COLORS.PROFESSIONAL_EDUCATION,
  },
] as const;
