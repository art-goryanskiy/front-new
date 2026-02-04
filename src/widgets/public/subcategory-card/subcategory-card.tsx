"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePriceVisibility } from "@/shared/store/auth-store";
import type { SubcategoryCardProps } from "./types/subcategory-card.types";
import { SUBCATEGORY_CARD_CLASSES } from "./constants/subcategory-card-constants";
import { SubcategoryCardImage } from "./components/subcategory-card-image";
import { SubcategoryCardPrice } from "./components/subcategory-card-price";
import { useSubcategoryPricing } from "./hooks/use-subcategory-pricing";
import { cn } from "@/lib/utils";

export const SubcategoryCard = memo(function SubcategoryCard({
  category,
  priority = false,
}: SubcategoryCardProps) {
  const { canSeePrice, isAuthLoading } = usePriceVisibility();
  const priceRange = useSubcategoryPricing(category);

  const programsLabel = useMemo(() => {
    if (
      category.programsCount === null ||
      category.programsCount === undefined
    ) {
      return "— программ";
    }
    const n = category.programsCount;
    return `${n} ${n === 1 ? "программа" : "программ"}`;
  }, [category.programsCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link
        href={`/categories/${category.id}`}
        className="block h-full"
      >
        <div className={SUBCATEGORY_CARD_CLASSES.card}>
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute -top-24 -right-24 h-[260px] w-[360px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/60" />
          </div>

          <div
            className={cn(
              "relative z-10",
              SUBCATEGORY_CARD_CLASSES.content
            )}
          >
            <div className={SUBCATEGORY_CARD_CLASSES.headerRow}>
              <SubcategoryCardImage
                image={category.image}
                name={category.name}
                priority={priority}
              />

              <div className="min-w-0 flex-1">
                <h3
                  className={SUBCATEGORY_CARD_CLASSES.title}
                  title={category.name}
                >
                  {category.name}
                </h3>
              </div>

              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>

            <p className={SUBCATEGORY_CARD_CLASSES.description}>
              {category.description ||
                "Откройте категорию, чтобы увидеть программы."}
            </p>

            <div className={SUBCATEGORY_CARD_CLASSES.footer}>
              <div className={SUBCATEGORY_CARD_CLASSES.chip}>
                {programsLabel}
              </div>
              <SubcategoryCardPrice
                priceRange={priceRange}
                canSeePrice={canSeePrice}
                isAuthLoading={isAuthLoading}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});
