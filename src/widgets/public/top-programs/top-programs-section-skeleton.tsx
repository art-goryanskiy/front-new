"use client";

import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TOP_PROGRAMS_CLASSES } from "./constants/top-programs-constants";

export const TopProgramsSectionSkeleton = memo(
  function TopProgramsSectionSkeleton() {
    return (
      <div className={TOP_PROGRAMS_CLASSES.tabs}>
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              variant="premium"
              className="h-10 w-44 rounded-full"
            />
          ))}
        </div>
        <div className={TOP_PROGRAMS_CLASSES.grid}>
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border/40 bg-card/60"
            >
              <Skeleton
                variant="premium"
                className="aspect-[4/3] w-full"
              />
              <div className="space-y-2 p-4">
                <Skeleton variant="premium" className="h-5 w-full" />
                <Skeleton variant="premium" className="h-4 w-24" />
                <Skeleton
                  variant="premium"
                  className="mt-2 h-9 w-28 rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
