import { useMemo } from "react";
import type { ProgramEntity } from "@/shared/api/generated/graphql";

export function useProgramCardPricing(program: ProgramEntity) {
  const minPrice = useMemo(() => {
    if (
      !program.pricing ||
      !Array.isArray(program.pricing) ||
      program.pricing.length === 0
    ) {
      return null;
    }

    const prices = program.pricing
      .map((p) => {
        if (
          p &&
          typeof p.price === "number" &&
          !isNaN(p.price) &&
          p.price > 0
        ) {
          return p.price;
        }
        return null;
      })
      .filter((p): p is number => p !== null && p !== undefined);

    if (prices.length > 0) {
      return Math.min(...prices);
    }

    return null;
  }, [program.pricing]);

  const hoursRange = useMemo(() => {
    if (
      !program.pricing ||
      !Array.isArray(program.pricing) ||
      program.pricing.length === 0
    ) {
      return null;
    }

    const hours = program.pricing
      .map((p) => p?.hours)
      .filter(
        (h): h is number =>
          typeof h === "number" && !isNaN(h) && h > 0
      );

    if (hours.length === 0) return null;

    const minHours = Math.min(...hours);
    const maxHours = Math.max(...hours);

    if (minHours === maxHours) {
      return `${minHours} часов`;
    }
    return `${minHours}-${maxHours} часов`;
  }, [program.pricing]);

  return { minPrice, hoursRange };
}
