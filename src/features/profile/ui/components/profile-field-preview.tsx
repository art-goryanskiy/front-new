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
        "rounded-xl border border-border/60 bg-muted/10 px-4 py-3",
        className
      )}
    >
      <div className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
      <div
        className={cn(
          "mt-1 text-sm font-medium text-foreground",
          !hasValue && "font-normal text-muted-foreground"
        )}
      >
        {hasValue ? value : "Не указано"}
      </div>
    </div>
  );
});
