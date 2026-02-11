"use client";

import { memo } from "react";
import { Surface } from "@/shared/ui/surface/surface";
import { Skeleton } from "@/components/ui/skeleton";

export const OrderDetailSkeleton = memo(function OrderDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Surface variant="floating" className="relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <Skeleton variant="premium" className="h-8 w-40" />
            <Skeleton variant="premium" className="h-4 w-52" />
            <Skeleton variant="premium" className="h-6 w-28 rounded-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton variant="premium" className="h-9 w-24 rounded-lg" />
            <Skeleton variant="premium" className="h-9 w-32 rounded-lg" />
          </div>
        </div>
      </Surface>

      <Surface variant="floating" className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Skeleton variant="premium" className="h-4 w-4 rounded" />
            <Skeleton variant="premium" className="h-4 w-28" />
            <Skeleton variant="premium" className="h-4 w-24" />
          </div>
          <Skeleton variant="premium" className="h-4 w-44" />
          <Skeleton variant="premium" className="h-4 w-36" />
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Skeleton variant="premium" className="h-5 w-5 rounded" />
            <Skeleton variant="premium" className="h-6 w-40" />
          </div>
          <ul className="space-y-3">
            {[1, 2, 3].map((i) => (
              <li
                key={i}
                className="rounded-xl border border-border/40 bg-muted/10 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <Skeleton variant="premium" className="h-4 w-56" />
                    <Skeleton variant="premium" className="h-3 w-36" />
                  </div>
                  <Skeleton variant="premium" className="h-4 w-20" />
                </div>
                <div className="mt-3 border-t border-border/40 pt-3">
                  <Skeleton variant="premium" className="mb-1.5 h-3 w-20" />
                  <Skeleton variant="premium" className="h-3 w-44" />
                  <Skeleton variant="premium" className="mt-1 h-3 w-32" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end border-t border-border/60 pt-4">
          <div className="flex items-baseline gap-2">
            <Skeleton variant="premium" className="h-4 w-12" />
            <Skeleton variant="premium" className="h-7 w-24" />
          </div>
        </div>
      </Surface>
    </div>
  );
});
