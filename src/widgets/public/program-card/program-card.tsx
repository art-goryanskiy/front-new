"use client";

import { memo } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCanSeePrice } from "@/shared/store/auth-store";
import type { ProgramCardProps } from "./types/program-card.types";
import { PROGRAM_CARD_CLASSES } from "./constants/program-card-constants";
import { ProgramCardHeader } from "./components/program-card-header";
import { ProgramCardMeta } from "./components/program-card-meta";
import { ProgramCardFooter } from "./components/program-card-footer";
import { useProgramCardPricing } from "./hooks/use-program-card-pricing";

export const ProgramCard = memo(
  function ProgramCard({ program }: ProgramCardProps) {
    const canSeePrice = useCanSeePrice();
    const { minPrice, hoursRange } = useProgramCardPricing(program);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4 }}
        className="h-full"
      >
        <Card className={PROGRAM_CARD_CLASSES.card}>
          <CardBody className="flex h-full flex-col p-0">
            <div className={PROGRAM_CARD_CLASSES.content}>
              <ProgramCardHeader title={program.title} />

              <p className={PROGRAM_CARD_CLASSES.description}>
                {program.description || "\u00A0"}
              </p>

              <ProgramCardMeta
                hoursRange={hoursRange}
                views={program.views}
              />

              <ProgramCardFooter
                minPrice={minPrice}
                views={program.views}
                canSeePrice={canSeePrice}
              />

              <Link
                href={`/programs/${program.id}`}
                className="block shrink-0"
              >
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  className={PROGRAM_CARD_CLASSES.cta}
                  fullWidth
                >
                  Подробнее
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.program.id === nextProps.program.id &&
      prevProps.program.title === nextProps.program.title &&
      prevProps.program.description ===
        nextProps.program.description &&
      prevProps.program.pricing === nextProps.program.pricing &&
      prevProps.program.views === nextProps.program.views &&
      prevProps.categoryType === nextProps.categoryType
    );
  }
);
