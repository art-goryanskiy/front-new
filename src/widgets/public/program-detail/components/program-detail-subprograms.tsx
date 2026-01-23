import { memo } from "react";
import { Card, CardBody } from "@heroui/react";
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
      <Card className="border-none shadow-lg">
        <CardBody className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-default-900 dark:text-foreground">
            Подпрограммы
          </h2>
          <div className={PROGRAM_DETAIL_CLASSES.subProgramsList}>
            {subPrograms.map((subProgram, index) => (
              <div
                key={index}
                className={PROGRAM_DETAIL_CLASSES.subProgramCard}
              >
                <h3 className="mb-2 font-semibold text-default-900 dark:text-foreground">
                  {subProgram.title}
                </h3>
                {subProgram.description && (
                  <p className="text-sm text-default-600 dark:text-foreground/95">
                    {subProgram.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }
);
