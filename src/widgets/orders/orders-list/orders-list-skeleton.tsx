"use client";

import { memo } from "react";
import { Surface } from "@/shared/ui/surface/surface";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const CARD_COUNT = 4;

function OrderCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/40 bg-background/40 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton variant="premium" className="h-4 w-20" />
            <Skeleton variant="premium" className="h-5 w-24 rounded-full" />
          </div>
          <Skeleton variant="premium" className="h-3 w-36" />
          <Skeleton variant="premium" className="h-3 w-44" />
          <Skeleton variant="premium" className="h-3 w-28" />
          <Skeleton variant="premium" className="h-5 w-24" />
        </div>
        <Skeleton variant="premium" className="h-5 w-5 shrink-0 rounded-full" />
      </div>
    </div>
  );
}

export const OrdersListSkeleton = memo(function OrdersListSkeleton() {
  return (
    <Surface variant="floating" className="relative overflow-hidden p-6">
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="relative z-10 space-y-6">
        <div className="flex flex-wrap gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton
              key={i}
              variant="premium"
              className={cn(
                "h-10 rounded-xl",
                i === 1 ? "w-14" : "w-30"
              )}
            />
          ))}
        </div>
        <div className="space-y-3">
          {Array.from({ length: CARD_COUNT }, (_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </Surface>
  );
});
