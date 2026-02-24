"use client";

import { memo } from "react";
import { Surface } from "@/shared/ui/surface/surface";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const OrderPaymentReturnSkeleton = memo(
  function OrderPaymentReturnSkeleton() {
    return (
      <div className="mx-auto w-full max-w-lg">
        <Surface
          variant="floating"
          className={cn(
            "relative overflow-hidden p-8 text-center",
            "ring-1 ring-border/40"
          )}
        >
          <Skeleton
            variant="premium"
            className="mx-auto h-16 w-16 rounded-2xl"
          />
          <Skeleton
            variant="premium"
            className="mx-auto mt-6 h-8 w-56"
          />
          <Skeleton
            variant="premium"
            className="mx-auto mt-2 h-4 w-full max-w-sm"
          />
          <Skeleton
            variant="premium"
            className="mx-auto mt-1 h-3 w-32"
          />
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Skeleton
              variant="premium"
              className="h-11 w-[180px] rounded-lg"
            />
            <Skeleton
              variant="premium"
              className="h-11 w-[180px] rounded-lg"
            />
          </div>
        </Surface>
        <div className="mt-6 flex justify-center">
          <Skeleton variant="premium" className="h-9 w-36" />
        </div>
      </div>
    );
  }
);
