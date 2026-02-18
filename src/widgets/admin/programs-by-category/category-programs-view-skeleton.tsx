"use client";

import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardSection } from "@/shared/ui/dashboard-section/dashboard-section";
import { Surface } from "@/shared/ui/surface/surface";

export const CategoryProgramsViewSkeleton = memo(
  function CategoryProgramsViewSkeleton() {
    return (
      <DashboardSection
        title="Программы"
        actions={
          <Skeleton
            variant="premium"
            className="h-8 w-20 rounded-full"
          />
        }
      >
        <div className="space-y-4">
          <Skeleton
            variant="premium"
            className="h-12 w-full rounded-xl"
          />
          <Surface variant="floating" className="overflow-hidden p-0">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 border-b border-border/40 p-4 last:border-b-0"
              >
                <Skeleton
                  variant="premium"
                  className="h-10 w-10 shrink-0 rounded-lg"
                />
                <Skeleton
                  variant="premium"
                  className="h-4 max-w-sm flex-1"
                />
                <Skeleton variant="premium" className="h-6 w-14" />
                <Skeleton
                  variant="premium"
                  className="h-8 w-8 shrink-0 rounded"
                />
              </div>
            ))}
          </Surface>
        </div>
      </DashboardSection>
    );
  }
);
