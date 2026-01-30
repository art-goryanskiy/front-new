import { memo } from "react";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";

interface ProgramDetailDescriptionProps {
  description: string;
}

export const ProgramDetailDescription = memo(
  function ProgramDetailDescription({
    description,
  }: ProgramDetailDescriptionProps) {
    return (
      <section className={PROGRAM_DETAIL_CLASSES.section}>
        <h2 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>
          Описание
        </h2>
        <p className="text-sm leading-relaxed whitespace-pre-line text-foreground">
          {description}
        </p>
      </section>
    );
  }
);
