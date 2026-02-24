"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

export const AdminDashboardMetricsSkeleton = memo(
  function AdminDashboardMetricsSkeleton() {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <MagicCard
            key={i}
            className="border border-border/50 bg-card/90 shadow-xl ring-1 shadow-black/6 ring-white/10 dark:ring-white/5"
          >
            <div className="p-5 sm:p-6">
              <Skeleton className="mb-3 h-3 w-28 rounded" />
              <Skeleton className="h-9 w-32 rounded" />
            </div>
          </MagicCard>
        ))}
      </div>
    );
  }
);
