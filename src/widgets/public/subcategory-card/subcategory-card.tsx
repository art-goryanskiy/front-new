"use client";

import { memo } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCanSeePrice } from "@/shared/store/auth-store";
import type { SubcategoryCardProps } from "./types/subcategory-card.types";
import { SUBCATEGORY_CARD_CLASSES } from "./constants/subcategory-card-constants";
import { SubcategoryCardImage } from "./components/subcategory-card-image";
import { SubcategoryCardPrice } from "./components/subcategory-card-price";
import { useSubcategoryPricing } from "./hooks/use-subcategory-pricing";

export const SubcategoryCard = memo(function SubcategoryCard({
  category,
  priority = false,
}: SubcategoryCardProps) {
  const canSeePrice = useCanSeePrice();
  const priceRange = useSubcategoryPricing(category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className={SUBCATEGORY_CARD_CLASSES.card}>
        <CardBody className="flex flex-1 flex-col p-0">
          <SubcategoryCardImage
            image={category.image}
            name={category.name}
            priority={priority}
          />

          <div className={SUBCATEGORY_CARD_CLASSES.content}>
            <h3 className={SUBCATEGORY_CARD_CLASSES.title}>
              {category.name}
            </h3>
            <p className={SUBCATEGORY_CARD_CLASSES.description}>
              {category.description || "\u00A0"}
            </p>

            <div className={SUBCATEGORY_CARD_CLASSES.footer}>
              <div className="flex flex-col gap-2">
                {category.programsCount !== null &&
                category.programsCount !== undefined ? (
                  <span
                    className={SUBCATEGORY_CARD_CLASSES.programsCount}
                  >
                    {category.programsCount}{" "}
                    {category.programsCount === 1
                      ? "программа"
                      : "программ"}
                  </span>
                ) : (
                  <span
                    className={SUBCATEGORY_CARD_CLASSES.programsCount}
                  >
                    {"\u00A0"}
                  </span>
                )}

                <SubcategoryCardPrice
                  priceRange={priceRange}
                  canSeePrice={canSeePrice}
                />
              </div>
            </div>

            <Link
              href={`/categories/${category.id}`}
              className="mt-auto block"
            >
              <Button
                color="primary"
                variant="flat"
                className={SUBCATEGORY_CARD_CLASSES.cta}
                fullWidth
                endContent={<ArrowRight className="h-4 w-4" />}
              >
                Смотреть программы
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
});
