"use client";

import { Card, CardBody, Spinner } from "@heroui/react";
import { memo } from "react";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState = memo(function LoadingState({
  message,
  className = "",
}: LoadingStateProps) {
  return (
    <Card
      className={`shadow-lg border-none ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <CardBody className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Spinner
            size="lg"
            color="primary"
            aria-label={message || "Загрузка"}
          />
          {message && <p className="text-default-600 text-sm">{message}</p>}
        </div>
      </CardBody>
    </Card>
  );
});
