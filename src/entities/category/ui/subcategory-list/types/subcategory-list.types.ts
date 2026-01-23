import type {
  CategoryEntity,
  CategoryType,
} from "@/shared/api/generated/graphql";

export interface SubcategoryListProps {
  categoryType: CategoryType;
  title: string;
  description?: string;
  initialCategories?: CategoryEntity[];
}
