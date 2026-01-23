import type {
  CategoryEntity,
  ProgramEntity,
} from "@/shared/api/generated/graphql";

export interface TopProgramsSectionProps {
  initialTopPrograms?: ProgramEntity[];
  initialAllPrograms?: ProgramEntity[];
  initialCategories?: CategoryEntity[];
}
