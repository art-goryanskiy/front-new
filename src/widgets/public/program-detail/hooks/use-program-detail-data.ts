import { useMemo } from "react";
import type { ProgramEntity } from "@/shared/api/generated/graphql";

export function useProgramDetailData(program: ProgramEntity) {
  const pricingList = useMemo(() => {
    if (!program.pricing || program.pricing.length === 0) return [];
    return program.pricing.filter(
      (p) => p.price !== null && p.price !== undefined
    );
  }, [program.pricing]);

  const totalHours = useMemo(() => {
    if (!program.pricing || program.pricing.length === 0) return null;
    return program.pricing.reduce((sum, p) => sum + p.hours, 0);
  }, [program.pricing]);

  return {
    pricingList,
    totalHours,
  };
}
