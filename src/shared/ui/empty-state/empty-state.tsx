"use client";

import { Card, CardContent } from "@/components/ui/card";
import { memo } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const EmptyState = memo(function EmptyState({
  title,
  description,
  icon,
  actions,
  className = "",
}: EmptyStateProps) {
  return (
    <Card className={`border shadow-lg ${className}`} role="status">
      <CardContent className="py-16 text-center">
        {icon && (
          <div
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted"
            role="img"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {actions && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  );
});
