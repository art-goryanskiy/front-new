import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { ProgramSubProgramEntity } from "@/shared/api/generated/graphql";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";

interface ProgramDetailSubProgramsProps {
  subPrograms: ProgramSubProgramEntity[];
}

export const ProgramDetailSubPrograms = memo(
  function ProgramDetailSubPrograms({
    subPrograms,
  }: ProgramDetailSubProgramsProps) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Подпрограммы
          </h2>
          <div className={PROGRAM_DETAIL_CLASSES.subProgramsList}>
            {subPrograms.map((subProgram, index) => (
              <div
                key={index}
                className={PROGRAM_DETAIL_CLASSES.subProgramCard}
              >
                <h3 className="mb-2 font-semibold text-foreground">
                  {subProgram.title}
                </h3>
                {subProgram.description && (
                  <p className="text-sm text-muted-foreground">
                    {subProgram.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);
