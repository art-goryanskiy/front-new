"use client";

import { memo } from "react";
import { Surface } from "@/shared/ui/surface/surface";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const CartPageSkeleton = memo(function CartPageSkeleton() {
  return (
    <div className="space-y-6">
      <Surface
        variant="floating"
        className="relative overflow-hidden p-6"
      >
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative z-10 space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-xl border border-border/40 bg-background/40 p-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="flex min-w-0 flex-1 gap-3 sm:gap-4">
                <Skeleton
                  variant="premium"
                  className="h-20 w-28 shrink-0 rounded-lg"
                />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton
                    variant="premium"
                    className="h-4 w-full max-w-[200px]"
                  />
                  <Skeleton variant="premium" className="h-3 w-24" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="flex items-center gap-2">
                  <Skeleton
                    variant="premium"
                    className="h-9 w-9 rounded-lg"
                  />
                  <Skeleton variant="premium" className="h-4 w-8" />
                  <Skeleton
                    variant="premium"
                    className="h-9 w-9 rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton variant="premium" className="h-5 w-16" />
                  <Skeleton
                    variant="premium"
                    className="h-9 w-9 rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Surface>

      <Surface
        variant="floating"
        className={cn(
          "flex flex-col gap-4 rounded-2xl border border-border/60 p-6",
          "sm:flex-row sm:items-center sm:justify-between"
        )}
      >
        <Skeleton variant="premium" className="h-6 w-32" />
        <Skeleton
          variant="premium"
          className="h-10 w-full rounded-xl sm:w-40"
        />
      </Surface>
    </div>
  );
});
