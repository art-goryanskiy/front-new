"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { HighlightCard } from "@/components/ui/highlight-card";
import { useCanSeePrice } from "@/shared/store/auth-store";
import { formatPrice } from "@/shared/lib/helpers/format-helpers";
import type { ProgramCardProps } from "./types/program-card.types";
import { useProgramCardPricing } from "./hooks/use-program-card-pricing";

function buildDescriptionLines(
  program: ProgramCardProps["program"],
  minPrice: number | null,
  canSeePrice: boolean
): string[] {
  const lines: string[] = [];
  if (program.description?.trim()) {
    const fromDesc = program.description
      .split(/\n/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 4);
    lines.push(...fromDesc);
  }
  if (lines.length === 0) {
    lines.push("Подробности на странице программы.");
  }
  if (canSeePrice && minPrice !== null && minPrice > 0) {
    lines.push(`От ${formatPrice(minPrice)} ₽`);
  }
  return lines;
}

export const ProgramCard = memo(
  function ProgramCard({ program }: ProgramCardProps) {
    const canSeePrice = useCanSeePrice();
    const { minPrice } = useProgramCardPricing(program);
    const description = useMemo(
      () => buildDescriptionLines(program, minPrice, canSeePrice),
      [program, minPrice, canSeePrice]
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex h-full justify-center"
      >
        <HighlightCard
          href={`/programs/${program.id}`}
          title={program.title}
          description={description}
          icon={<BookOpen className="h-8 w-8 text-white" />}
          className="h-full w-full max-w-[350px]"
        />
      </motion.div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.program.id === nextProps.program.id &&
    prevProps.program.title === nextProps.program.title &&
    prevProps.program.description === nextProps.program.description &&
    prevProps.program.pricing === nextProps.program.pricing &&
    prevProps.program.views === nextProps.program.views &&
    prevProps.categoryType === nextProps.categoryType
);
