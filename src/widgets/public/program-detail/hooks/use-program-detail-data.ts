import { useMemo } from "react";
import type { ProgramEntity } from "@/shared/api/generated/graphql";

export function useProgramDetailData(program: ProgramEntity) {
  const pricingList = useMemo(() => {
    if (!program.pricing || program.pricing.length === 0) return [];
    return program.pricing.filter(
      (p) => p.price !== null && p.price !== undefined
    );
  }, [program.pricing]);

  const hoursDisplay = useMemo(() => {
    if (!program.pricing || program.pricing.length === 0) return null;
    const hours = program.pricing
      .map((p) => p?.hours)
      .filter(
        (h): h is number =>
          typeof h === "number" && !isNaN(h) && h > 0
      );
    if (hours.length === 0) return null;
    const minHours = Math.min(...hours);
    const maxHours = Math.max(...hours);
    if (minHours === maxHours) return String(minHours);
    return `${minHours}–${maxHours}`;
  }, [program.pricing]);

  return {
    pricingList,
    hoursDisplay,
  };
}
