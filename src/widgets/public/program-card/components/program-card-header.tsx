"use client";

import { memo } from "react";
import { BookOpen } from "lucide-react";
import { PROGRAM_CARD_CLASSES } from "../constants/program-card-constants";

interface ProgramCardHeaderProps {
  title: string;
}

export const ProgramCardHeader = memo(function ProgramCardHeader({
  title,
}: ProgramCardHeaderProps) {
  return (
    <>
      <div className={PROGRAM_CARD_CLASSES.iconWrapper}>
        <BookOpen className={PROGRAM_CARD_CLASSES.icon} />
      </div>
      <div className={PROGRAM_CARD_CLASSES.header}>
        <h3 className={PROGRAM_CARD_CLASSES.title}>{title}</h3>
      </div>
    </>
  );
});
