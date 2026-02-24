"use client";

import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const NewsListSkeleton = memo(function NewsListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {/* Featured (large) */}
      <div
        className={cn(
          "min-w-0",
          "col-span-1 sm:col-span-2 lg:col-span-3"
        )}
      >
        <div className="overflow-hidden rounded-2xl border border-border/40 bg-card/60">
          <Skeleton
            variant="premium"
            className="aspect-[21/9] w-full"
          />
          <div className="space-y-2 p-4 sm:p-6">
            <Skeleton variant="premium" className="h-6 w-3/4" />
            <Skeleton variant="premium" className="h-4 w-full" />
            <Skeleton variant="premium" className="h-4 w-1/2" />
          </div>
        </div>
      </div>
      {/* Wide */}
      <div className={cn("min-w-0", "col-span-1 sm:col-span-2")}>
        <div className="overflow-hidden rounded-xl border border-border/40 bg-card/60">
          <Skeleton
            variant="premium"
            className="aspect-video w-full"
          />
          <div className="space-y-2 p-4">
            <Skeleton variant="premium" className="h-5 w-full" />
            <Skeleton variant="premium" className="h-3 w-28" />
          </div>
        </div>
      </div>
      {/* Default cards */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="min-w-0">
          <div className="overflow-hidden rounded-xl border border-border/40 bg-card/60">
            <Skeleton
              variant="premium"
              className="aspect-video w-full"
            />
            <div className="space-y-2 p-4">
              <Skeleton variant="premium" className="h-5 w-full" />
              <Skeleton variant="premium" className="h-3 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});
