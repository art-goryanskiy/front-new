"use client";

import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Surface } from "@/shared/ui/surface/surface";

export const AdminCategoriesSkeleton = memo(
  function AdminCategoriesSkeleton() {
    return (
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1">
            <Skeleton variant="premium" className="h-8 w-40" />
            <Skeleton variant="premium" className="h-4 w-72" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Surface
              key={i}
              variant="floating"
              className="p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton
                      variant="premium"
                      className="h-5 w-5 rounded-md"
                    />
                    <Skeleton
                      variant="premium"
                      className="h-5 w-36"
                    />
                  </div>
                  <Skeleton
                    variant="premium"
                    className="h-4 w-full max-w-[18rem]"
                  />
                  <div className="flex gap-2 pt-1">
                    <Skeleton
                      variant="premium"
                      className="h-6 w-16 rounded-full"
                    />
                    <Skeleton
                      variant="premium"
                      className="h-6 w-20 rounded-full"
                    />
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  <Skeleton
                    variant="premium"
                    className="h-9 w-24 rounded-md"
                  />
                  <Skeleton
                    variant="premium"
                    className="h-9 w-28 rounded-md"
                  />
                </div>
              </div>
            </Surface>
          ))}
        </div>
      </section>
    );
  }
);
