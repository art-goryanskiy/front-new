"use client";

import { Card, CardContent } from "@/components/ui/card";
import { memo } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState = memo(function EmptyState({
  title,
  description,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <Card className={`shadow-lg border ${className}`} role="status">
      <CardContent className="text-center py-16">
        {icon && (
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center"
            role="img"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <h3 className="text-foreground text-lg font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </CardContent>
    </Card>
  );
});
