"use client";

import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const NewsDetailSkeleton = memo(function NewsDetailSkeleton() {
  return (
    <article className="space-y-6">
      <Skeleton
        variant="premium"
        className="aspect-[21/9] w-full rounded-2xl"
      />
      <div className="space-y-3">
        <Skeleton variant="premium" className="h-8 w-20" />
        <Skeleton
          variant="premium"
          className="h-9 w-full max-w-2xl"
        />
        <Skeleton variant="premium" className="h-6 w-3/4" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton
            key={i}
            variant="premium"
            className="h-4 w-full"
          />
        ))}
      </div>
    </article>
  );
});
