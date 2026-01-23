import { useMemo } from "react";
import { usePrograms } from "@/entities/program/api/use-programs";
import type { CategoryEntity } from "@/shared/api/generated/graphql";

export function useSubcategoryPricing(category: CategoryEntity) {
  const { programs } = usePrograms();

  const categoryPrograms = useMemo(() => {
    return programs.filter(
      (program) => program.category === category.id
    );
  }, [programs, category.id]);

  const priceRange = useMemo(() => {
    if (categoryPrograms.length === 0) return null;

    const allPrices: number[] = [];
    categoryPrograms.forEach((program) => {
      if (program.pricing && program.pricing.length > 0) {
        program.pricing.forEach((p) => {
          if (p.price !== null && p.price !== undefined) {
            allPrices.push(p.price);
          }
        });
      }
    });

    if (allPrices.length === 0) return null;

    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);

    if (minPrice === maxPrice) {
      return { min: minPrice, max: maxPrice, isRange: false };
    }
    return { min: minPrice, max: maxPrice, isRange: true };
  }, [categoryPrograms]);

  return priceRange;
}
