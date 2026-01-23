import type { CategoryType } from "@/shared/api/generated/graphql";

export interface CategoryPageProps {
  type: CategoryType;
  title: string;
  description: string;
}
