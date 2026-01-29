"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Surface } from "@/shared/ui/surface/surface";
import { memo, useMemo } from "react";

export const StatsCardsSkeleton = memo(function StatsCardsSkeleton() {
  const skeletonItems = useMemo(
    () => Array.from({ length: 4 }, (_, i) => i),
    []
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {skeletonItems.map((i) => (
        <Surface
          key={i}
          variant="floating"
          className="h-32 overflow-hidden p-0"
        >
          <Skeleton className="h-full w-full rounded-none" />
        </Surface>
      ))}
    </div>
  );
});
