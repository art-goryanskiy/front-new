import type { ProgramEntity } from "@/shared/api/generated/graphql";

export interface ProgramTableCellContentProps {
  program: ProgramEntity;
}

export interface ProgramTableColumnConfig {
  showAwardedQualification: boolean;
  showAwardedRank: boolean;
  showSubPrograms: boolean;
}
