import type { CategoryEntity } from "@/shared/api/generated/graphql";

export interface SubcategoryCardProps {
  category: CategoryEntity;
  priority?: boolean;
}
