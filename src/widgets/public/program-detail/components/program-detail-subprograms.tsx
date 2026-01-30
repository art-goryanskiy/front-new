import { memo } from "react";
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
      <section
        id="subprograms"
        className={`${PROGRAM_DETAIL_CLASSES.section} scroll-mt-28`}
      >
        <h2 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>
          Подпрограммы
        </h2>
        <div className={PROGRAM_DETAIL_CLASSES.subProgramsList}>
          {subPrograms.map((subProgram, index) => (
            <div
              key={index}
              className={PROGRAM_DETAIL_CLASSES.subProgramCard}
            >
              <h3 className="mb-2 text-sm font-semibold text-foreground sm:text-base">
                {subProgram.title}
              </h3>
              {subProgram.description && (
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {subProgram.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }
);
