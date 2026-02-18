"use client";

import { memo } from "react";
import { Surface } from "@/shared/ui/surface/surface";
import { Skeleton } from "@/components/ui/skeleton";

export const OrderPaymentSkeleton = memo(
  function OrderPaymentSkeleton() {
    return (
      <div className="space-y-6">
        <Surface
          variant="floating"
          className="relative overflow-hidden p-6"
        >
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative z-10 space-y-4">
            <Skeleton variant="premium" className="h-8 w-48" />
            <Skeleton variant="premium" className="h-6 w-64" />
            <div className="flex gap-2 pt-2">
              <Skeleton
                variant="premium"
                className="h-10 w-32 rounded-xl"
              />
              <Skeleton
                variant="premium"
                className="h-10 w-24 rounded-xl"
              />
            </div>
          </div>
        </Surface>
        <Surface variant="floating" className="p-6">
          <div className="flex gap-2">
            <Skeleton
              variant="premium"
              className="h-10 flex-1 rounded-xl"
            />
            <Skeleton
              variant="premium"
              className="h-10 flex-1 rounded-xl"
            />
          </div>
          <div className="mt-6 space-y-4">
            <Skeleton
              variant="premium"
              className="h-24 w-full rounded-xl"
            />
            <Skeleton
              variant="premium"
              className="h-12 w-full rounded-xl"
            />
          </div>
        </Surface>
      </div>
    );
  }
);
