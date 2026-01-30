import { memo } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import type {
  ProgramEntity,
  ProgramPricing,
} from "@/shared/api/generated/graphql";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";
import { ProgramDetailPricing } from "./program-detail-pricing";
import { ProgramDetailAdditionalInfo } from "./program-detail-additional-info";
import { Surface } from "@/shared/ui/surface/surface";

interface ProgramDetailSidebarProps {
  program: ProgramEntity;
  pricingList: ProgramPricing[];
}

export const ProgramDetailSidebar = memo(
  function ProgramDetailSidebar({
    program,
    pricingList,
  }: ProgramDetailSidebarProps) {
    return (
      <div className={PROGRAM_DETAIL_CLASSES.sidebar}>
        <div className="sticky top-24">
          <Surface
            variant="floating"
            className="relative overflow-hidden p-6"
          >
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -top-28 -right-28 h-[300px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
            </div>

            <div className="relative z-10 space-y-6">
              <ProgramDetailPricing pricingList={pricingList} />
              <ProgramDetailAdditionalInfo program={program} />
              <Button
                size="lg"
                className={PROGRAM_DETAIL_CLASSES.cta}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Записаться на программу
              </Button>
            </div>
          </Surface>
        </div>
      </div>
    );
  }
);
