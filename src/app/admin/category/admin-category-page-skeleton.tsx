"use client";

import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardSection } from "@/shared/ui/dashboard-section/dashboard-section";
import { Surface } from "@/shared/ui/surface/surface";

export const AdminCategoryPageSkeleton = memo(function AdminCategoryPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <Skeleton variant="premium" className="h-8 w-56" />
          <Skeleton variant="premium" className="h-4 w-40" />
        </div>
        <Skeleton variant="premium" className="h-10 w-40 rounded-lg" />
      </div>
      <DashboardSection title="Программы" actions={<Skeleton variant="premium" className="h-8 w-16 rounded-full" />}>
        <div className="space-y-4">
          <Skeleton variant="premium" className="h-12 w-full rounded-xl" />
          <Surface variant="floating" className="overflow-hidden p-0">
            <div className="space-y-0">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-b border-border/40 p-4 last:border-b-0"
                >
                  <Skeleton variant="premium" className="h-10 w-10 rounded-lg" />
                  <Skeleton variant="premium" className="h-4 flex-1 max-w-xs" />
                  <Skeleton variant="premium" className="h-6 w-16" />
                  <Skeleton variant="premium" className="h-8 w-8 rounded" />
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </DashboardSection>
    </div>
  );
});
