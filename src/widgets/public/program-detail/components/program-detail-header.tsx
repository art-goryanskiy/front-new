import { memo } from "react";
import { Clock, Star } from "lucide-react";
import type { ProgramEntity } from "@/shared/api/generated/graphql";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";

interface ProgramDetailHeaderProps {
  program: ProgramEntity;
  totalHours: number | null;
}

export const ProgramDetailHeader = memo(function ProgramDetailHeader({
  program,
  totalHours,
}: ProgramDetailHeaderProps) {
  return (
    <div className={PROGRAM_DETAIL_CLASSES.header}>
      <h1 className={PROGRAM_DETAIL_CLASSES.title}>
        {program.title}
      </h1>
      <div className={PROGRAM_DETAIL_CLASSES.meta}>
        {program.views > 0 && (
          <div className="flex items-center gap-1 text-default-600 dark:text-foreground/95">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{program.views} просмотров</span>
          </div>
        )}
        {totalHours !== null && (
          <div className="flex items-center gap-1 text-default-600 dark:text-foreground/95">
            <Clock className="h-4 w-4" />
            <span>{totalHours} часов</span>
          </div>
        )}
      </div>
    </div>
  );
});
