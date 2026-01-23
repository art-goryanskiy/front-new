"use client";

import { memo, useMemo } from "react";
import { Skeleton } from "@/widgets/admin/skeleton/skeleton";

export const StatsCardsSkeleton = memo(function StatsCardsSkeleton() {
  const skeletonItems = useMemo(
    () => Array.from({ length: 4 }, (_, i) => i),
    []
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {skeletonItems.map((i) => (
        <Skeleton key={i} className="h-32 rounded-2xl" />
      ))}
    </div>
  );
});
