"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import type { ProgramDetailProps } from "./types/program-detail.types";
import { PROGRAM_DETAIL_CLASSES } from "./constants/program-detail-constants";
import { useProgramDetailData } from "./hooks/use-program-detail-data";
import { ProgramDetailHeader } from "./components/program-detail-header";
import { ProgramDetailImage } from "./components/program-detail-image";
import { ProgramDetailDescription } from "./components/program-detail-description";
import { ProgramDetailSubPrograms } from "./components/program-detail-subprograms";
import { ProgramDetailSidebar } from "./components/program-detail-sidebar";
import { Surface } from "@/shared/ui/surface/surface";
import { ProgramDetailRelatedPrograms } from "./components/program-detail-related-programs";
import { ProgramDetailFaq } from "./components/program-detail-faq";
import { ProgramDetailAudience } from "./components/program-detail-audience";
import { ProgramDetailEducationDocument } from "./components/program-detail-education-document";

export const ProgramDetail = memo(function ProgramDetail({
  program,
  category,
  relatedPrograms,
}: ProgramDetailProps) {
  const { pricingList, hoursDisplay } = useProgramDetailData(program);

  const minPrice = useMemo(() => {
    if (!pricingList || pricingList.length === 0) return null;
    const prices = pricingList
      .map((p) => p.price ?? null)
      .filter((p): p is number => typeof p === "number");
    if (prices.length === 0) return null;
    return Math.min(...prices);
  }, [pricingList]);

  const toc = useMemo(() => {
    const items: Array<{ href: string; label: string }> = [];
    if (program.description)
      items.push({ href: "#description", label: "Описание" });
    if (program.studentCategory || program.awardedQualification) {
      items.push({ href: "#audience", label: "Для кого" });
    }
    if (program.educationDocument) {
      items.push({
        href: "#education-document",
        label: "Документ",
      });
    }
    if (program.subPrograms && program.subPrograms.length > 0) {
      items.push({ href: "#subprograms", label: "Подпрограммы" });
    }
    if (relatedPrograms && relatedPrograms.length > 0) {
      items.push({ href: "#related", label: "Похожие" });
    }
    items.push({ href: "#pricing", label: "Стоимость" });
    items.push({ href: "#faq", label: "FAQ" });
    return items;
  }, [
    program.description,
    program.subPrograms,
    program.studentCategory,
    program.awardedQualification,
    program.educationDocument,
    relatedPrograms,
  ]);

  return (
    <div className={PROGRAM_DETAIL_CLASSES.container}>
      <ProgramDetailHeader
        program={program}
        hoursDisplay={hoursDisplay}
        category={category ?? null}
      />

      <Surface
        variant="floating"
        className="flex flex-wrap items-center gap-2 p-3"
      >
        {toc.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className="rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            {i.label}
          </Link>
        ))}
      </Surface>

      {program.image && (
        <ProgramDetailImage
          image={program.image}
          alt={program.title}
        />
      )}

      <div className={PROGRAM_DETAIL_CLASSES.content}>
        <div className={PROGRAM_DETAIL_CLASSES.main}>
          {program.description && (
            <ProgramDetailDescription
              description={program.description}
              hoursDisplay={hoursDisplay}
              minPrice={minPrice}
              awardedQualification={
                program.awardedQualification ?? null
              }
            />
          )}

          {(program.studentCategory ||
            program.awardedQualification) && (
            <ProgramDetailAudience program={program} />
          )}

          {program.educationDocument && (
            <ProgramDetailEducationDocument
              document={program.educationDocument}
            />
          )}

          {program.subPrograms && program.subPrograms.length > 0 && (
            <ProgramDetailSubPrograms
              programId={program.id}
              subPrograms={program.subPrograms}
              programPricing={program.pricing ?? []}
            />
          )}

          {relatedPrograms && relatedPrograms.length > 0 && (
            <ProgramDetailRelatedPrograms
              programs={relatedPrograms}
              category={category ?? null}
            />
          )}

          <ProgramDetailFaq />
        </div>

        <ProgramDetailSidebar
          programId={program.id}
          programPricing={program.pricing ?? []}
          pricingList={pricingList}
        />
      </div>
    </div>
  );
});
