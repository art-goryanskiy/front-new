import type { ProgramEntity } from "@/shared/api/generated/graphql";

export interface ProgramCardProps {
  program: ProgramEntity;
  categoryType?: string;
}
