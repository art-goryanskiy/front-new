"use client";

import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SUBCATEGORY_LIST_CLASSES } from "./constants/subcategory-list-constants";

export const SubcategoryListSkeleton = memo(
  function SubcategoryListSkeleton() {
    return (
      <div className={SUBCATEGORY_LIST_CLASSES.container}>
        <div className={SUBCATEGORY_LIST_CLASSES.header}>
          <Skeleton
            variant="premium"
            className="mb-2 h-9 w-64 sm:h-10 sm:w-80"
          />
          <Skeleton
            variant="premium"
            className="h-6 w-full max-w-2xl"
          />
        </div>
        <div className={SUBCATEGORY_LIST_CLASSES.grid}>
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border/40 bg-card/60 p-0"
            >
              <Skeleton
                variant="premium"
                className="aspect-[16/10] w-full"
              />
              <div className="space-y-2 p-4">
                <Skeleton variant="premium" className="h-5 w-[80%]" />
                <Skeleton variant="premium" className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
