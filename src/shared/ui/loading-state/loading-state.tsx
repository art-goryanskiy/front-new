"use client";

import { Card, CardContent } from "@/components/ui/card";
import { OrbitalLoader } from "@/components/ui/orbital-loader";
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
        <OrbitalLoader
          message={message || "Загрузка"}
          messagePlacement="bottom"
          className="w-10 h-10"
        />
      </CardContent>
    </Card>
  );
});
