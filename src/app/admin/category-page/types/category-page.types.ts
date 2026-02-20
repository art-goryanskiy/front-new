import type { CategoryType } from "@/shared/api/generated/graphql";

export interface CategoryPageProps {
  type: CategoryType;
  title: string;
  description: string;
  /** Заголовок вынесен в sticky на странице — не показывать в хедере */
  suppressHeaderTitle?: boolean;
}
