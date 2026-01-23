"use client";

import { memo, useCallback } from "react";
import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ProgramDetailProps } from "./types/program-detail.types";
import { PROGRAM_DETAIL_CLASSES } from "./constants/program-detail-constants";
import { useProgramDetailData } from "./hooks/use-program-detail-data";
import { ProgramDetailHeader } from "./components/program-detail-header";
import { ProgramDetailImage } from "./components/program-detail-image";
import { ProgramDetailDescription } from "./components/program-detail-description";
import { ProgramDetailSubPrograms } from "./components/program-detail-subprograms";
import { ProgramDetailSidebar } from "./components/program-detail-sidebar";

export const ProgramDetail = memo(function ProgramDetail({
  program,
}: ProgramDetailProps) {
  const router = useRouter();
  const { pricingList, totalHours } = useProgramDetailData(program);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className={PROGRAM_DETAIL_CLASSES.container}>
      <Button
        variant="light"
        startContent={<ArrowLeft className="h-4 w-4" />}
        onPress={handleBack}
        className={PROGRAM_DETAIL_CLASSES.backButton}
      >
        Назад
      </Button>

      <ProgramDetailHeader
        program={program}
        totalHours={totalHours}
      />

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
            />
          )}

          {program.subPrograms && program.subPrograms.length > 0 && (
            <ProgramDetailSubPrograms
              subPrograms={program.subPrograms}
            />
          )}
        </div>

        <ProgramDetailSidebar
          program={program}
          pricingList={pricingList}
        />
      </div>
    </div>
  );
});
