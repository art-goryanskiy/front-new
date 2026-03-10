"use client";

import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const FreshNewsCarouselSkeleton = memo(
  function FreshNewsCarouselSkeleton() {
    return (
      <div className="min-w-0 flex gap-4 overflow-x-hidden py-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="max-w-[320px] min-w-[280px] overflow-hidden rounded-xl border border-border/40 bg-card/60 sm:min-w-[300px]"
          >
            <Skeleton
              variant="premium"
              className="aspect-[3/4] w-full"
            />
            <div className="space-y-2 p-4">
              <Skeleton variant="premium" className="h-4 w-full" />
              <Skeleton variant="premium" className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }
);
