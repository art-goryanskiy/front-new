import type { CategoryType } from "@/shared/api/generated/graphql";

export const CATEGORY_TYPE_HREFS: Record<CategoryType, string> = {
  QUALIFICATION_UPGRADE: "/qualification-upgrade",
  PROFESSIONAL_RETRAINING: "/professional-retraining",
  PROFESSIONAL_EDUCATION: "/professional-education",
};
