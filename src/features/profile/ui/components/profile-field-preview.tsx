"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface ProfileFieldPreviewProps {
  label: string;
  value: string | null | undefined;
  className?: string;
}

export const ProfileFieldPreview = memo(function ProfileFieldPreview({
  label,
  value,
  className,
}: ProfileFieldPreviewProps) {
  const hasValue = Boolean(value && value.trim());

  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-muted/10 px-3 py-2.5 sm:px-4 sm:py-3",
        className
      )}
    >
      <div className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
      <div
        className={cn(
          "mt-1 min-h-5 text-sm font-medium text-foreground",
          !hasValue && "font-normal text-muted-foreground/80 italic"
        )}
      >
        {hasValue ? value : "Не указано"}
      </div>
    </div>
  );
});
