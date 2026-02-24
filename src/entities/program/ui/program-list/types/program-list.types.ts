import type {
  CategoryType,
  ProgramEntity,
} from "@/shared/api/generated/graphql";
import type { BreadcrumbItem } from "@/shared/ui/breadcrumbs/breadcrumbs";

export interface ProgramListProps {
  programs?: ProgramEntity[]; // Для серверных данных
  categoryType?: CategoryType;
  categoryId?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}
