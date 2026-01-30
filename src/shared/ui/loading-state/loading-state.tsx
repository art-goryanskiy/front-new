"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
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
      className={`border shadow-lg ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <CardContent className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Spinner size={32} aria-label={message || "Загрузка"} />
          {message && (
            <p className="text-sm text-muted-foreground">{message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
