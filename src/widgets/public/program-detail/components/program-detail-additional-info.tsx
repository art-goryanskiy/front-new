import { memo } from "react";
import type { ProgramEntity } from "@/shared/api/generated/graphql";

interface ProgramDetailAdditionalInfoProps {
  program: ProgramEntity;
}

export const ProgramDetailAdditionalInfo = memo(
  function ProgramDetailAdditionalInfo({
    program,
  }: ProgramDetailAdditionalInfoProps) {
    if (!program.studentCategory && !program.awardedQualification) {
      return null;
    }

    return (
      <div className="space-y-3">
        {program.studentCategory && (
          <div>
            <span className="text-sm text-muted-foreground">
              Категория студентов:
            </span>
            <p className="font-medium text-foreground">
              {program.studentCategory}
            </p>
          </div>
        )}
        {program.awardedQualification && (
          <div>
            <span className="text-sm text-muted-foreground">
              Присваиваемая квалификация:
            </span>
            <p className="font-medium text-foreground">
              {program.awardedQualification}
            </p>
          </div>
        )}
      </div>
    );
  }
);
