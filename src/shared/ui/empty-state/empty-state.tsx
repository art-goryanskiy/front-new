"use client";

import { Card, CardBody } from "@heroui/react";
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
    <Card className={`shadow-lg border-none ${className}`} role="status">
      <CardBody className="text-center py-16">
        {icon && (
          <div
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-default-100 flex items-center justify-center"
            role="img"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
        <h3 className="text-default-700 text-lg font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-default-500 text-sm">{description}</p>
        )}
      </CardBody>
    </Card>
  );
});
