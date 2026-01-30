"use client";

import { memo } from "react";
import { Award, Users } from "lucide-react";
import type { ProgramEntity } from "@/shared/api/generated/graphql";
import { MarkdownContent } from "@/shared/ui/markdown/markdown-content";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";

interface ProgramDetailAudienceProps {
  program: ProgramEntity;
}

export const ProgramDetailAudience = memo(
  function ProgramDetailAudience({
    program,
  }: ProgramDetailAudienceProps) {
    const studentCategory = program.studentCategory ?? "";
    const awardedQualification = program.awardedQualification ?? "";

    if (!studentCategory && !awardedQualification) {
      return null;
    }

    return (
      <section
        id="audience"
        className={`${PROGRAM_DETAIL_CLASSES.section} scroll-mt-28`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className={PROGRAM_DETAIL_CLASSES.sectionTitle}>
              Для кого программа
            </h2>
            <p className="text-sm text-muted-foreground">
              Кому подойдёт обучение и какой результат вы получите.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {studentCategory && (
            <div className="rounded-xl border border-border/60 bg-muted/15 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Users className="h-4 w-4" />
                Категория слушателей
              </div>

              <div className="mt-3">
                <MarkdownContent content={studentCategory} />
              </div>
            </div>
          )}

          {awardedQualification && (
            <div className="rounded-xl border border-border/60 bg-muted/15 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Award className="h-4 w-4" />
                Присваиваемая квалификация
              </div>
              <div className="mt-2 text-sm leading-snug font-semibold text-foreground">
                {awardedQualification}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Если нужен конкретный формат документа — уточните при
                записи, подскажем детали по программе.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }
);
