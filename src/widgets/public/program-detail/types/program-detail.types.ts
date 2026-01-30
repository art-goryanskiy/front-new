import type {
  CategoryEntity,
  ProgramEntity,
} from "@/shared/api/generated/graphql";

export interface ProgramDetailProps {
  program: ProgramEntity;
  category?: CategoryEntity | null;
  relatedPrograms?: ProgramEntity[];
}
