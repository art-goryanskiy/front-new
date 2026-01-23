"use client";

import { memo } from "react";
import { Clock, Eye } from "lucide-react";
import { PROGRAM_CARD_CLASSES } from "../constants/program-card-constants";

interface ProgramCardMetaProps {
  hoursRange: string | null;
  views: number | null;
}

export const ProgramCardMeta = memo(function ProgramCardMeta({
  hoursRange,
  views,
}: ProgramCardMetaProps) {
  return (
    <div className={PROGRAM_CARD_CLASSES.meta}>
      <div className={PROGRAM_CARD_CLASSES.metaItem}>
        {hoursRange ? (
          <>
            <Clock className="h-3.5 w-3.5" />
            <span>{hoursRange}</span>
          </>
        ) : (
          <>
            <Clock className="invisible h-3.5 w-3.5" />
            <span className="invisible">{"\u00A0"}</span>
          </>
        )}
      </div>
      {views !== null && views > 0 && (
        <div className={PROGRAM_CARD_CLASSES.metaItem}>
          <Eye className="h-3.5 w-3.5" />
          <span>{views}</span>
        </div>
      )}
    </div>
  );
});
