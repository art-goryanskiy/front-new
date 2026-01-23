import { memo } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { BookOpen } from "lucide-react";
import type {
  ProgramEntity,
  ProgramPricing,
} from "@/shared/api/generated/graphql";
import { PROGRAM_DETAIL_CLASSES } from "../constants/program-detail-constants";
import { ProgramDetailPricing } from "./program-detail-pricing";
import { ProgramDetailAdditionalInfo } from "./program-detail-additional-info";

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
        <Card className="sticky top-24 border-none shadow-lg">
          <CardBody className="space-y-6 p-6">
            <ProgramDetailPricing pricingList={pricingList} />
            <ProgramDetailAdditionalInfo program={program} />
            <Button
              color="primary"
              size="lg"
              className={PROGRAM_DETAIL_CLASSES.cta}
              startContent={<BookOpen className="h-5 w-5" />}
            >
              Записаться на программу
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
);
