"use client";

import { memo } from "react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCanSeePrice } from "@/shared/store/auth-store";
import type { ProgramCardProps } from "./types/program-card.types";
import { PROGRAM_CARD_CLASSES } from "./constants/program-card-constants";
import { ProgramCardHeader } from "./components/program-card-header";
import { ProgramCardMeta } from "./components/program-card-meta";
import { ProgramCardFooter } from "./components/program-card-footer";
import { useProgramCardPricing } from "./hooks/use-program-card-pricing";
import { cn } from "@/lib/utils";

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
        <GlowCard
          customSize
          glowColor="blue"
          className={cn(
            "h-full w-full overflow-visible",
            "grid-rows-[auto_1fr] gap-4 p-4",
            "min-h-0"
          )}
        >
          <div
            className={cn(
              "relative z-10 flex min-h-0 flex-col rounded-xl p-4",
              "bg-transparent",
              PROGRAM_CARD_CLASSES.content
            )}
          >
            <ProgramCardHeader title={program.title} />
            {/* ... остальное без изменений ... */}
          </div>
        </GlowCard>
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
