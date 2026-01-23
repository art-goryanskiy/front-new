import type {
  CategoryType,
  ProgramEntity,
} from "@/shared/api/generated/graphql";

export interface ProgramListProps {
  programs?: ProgramEntity[]; // Для серверных данных
  categoryType?: CategoryType;
  categoryId?: string;
  title: string;
  description?: string;
}
