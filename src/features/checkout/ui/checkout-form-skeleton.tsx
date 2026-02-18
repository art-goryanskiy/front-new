"use client";

import { memo } from "react";
import { Surface } from "@/shared/ui/surface/surface";
import { Skeleton } from "@/components/ui/skeleton";

export const CheckoutFormSkeleton = memo(
  function CheckoutFormSkeleton() {
    return (
      <div className="space-y-6">
        <Surface variant="floating" className="p-6">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="premium"
                className="h-10 flex-1 rounded-xl"
              />
            ))}
          </div>
        </Surface>

        <Surface variant="floating" className="space-y-6 p-6">
          <Skeleton variant="premium" className="h-6 w-48" />
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton variant="premium" className="h-4 w-20" />
                <Skeleton
                  variant="premium"
                  className="h-10 w-full rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Skeleton variant="premium" className="h-4 w-24" />
                <Skeleton
                  variant="premium"
                  className="h-10 w-full rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton variant="premium" className="h-4 w-28" />
              <Skeleton
                variant="premium"
                className="h-10 w-full rounded-xl"
              />
            </div>
          </div>
        </Surface>
      </div>
    );
  }
);
