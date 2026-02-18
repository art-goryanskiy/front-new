"use client";

import { memo, ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PROGRAM_LIST_CLASSES } from "./constants/program-list-constants";

export const ProgramListSkeleton = memo(function ProgramListSkeleton({
  backButton,
}: {
  backButton?: ReactNode;
}) {
  return (
    <div className={PROGRAM_LIST_CLASSES.container}>
      {backButton}
      <div className={PROGRAM_LIST_CLASSES.header}>
        <Skeleton
          variant="premium"
          className="mb-4 h-10 w-72 sm:h-12 sm:w-96"
        />
        <Skeleton
          variant="premium"
          className="h-6 w-full max-w-3xl"
        />
      </div>
      <div className={PROGRAM_LIST_CLASSES.grid}>
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-border/40 bg-card/60"
          >
            <Skeleton
              variant="premium"
              className="aspect-[4/3] w-full"
            />
            <div className="space-y-2 p-4">
              <Skeleton variant="premium" className="h-5 w-full" />
              <Skeleton variant="premium" className="h-4 w-20" />
              <Skeleton
                variant="premium"
                className="mt-2 h-9 w-28 rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
