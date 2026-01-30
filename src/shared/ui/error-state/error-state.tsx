"use client";

import { Card, CardContent } from "@/components/ui/card";
import { memo } from "react";

interface ErrorStateProps {
  title?: string;
  message: string;
  className?: string;
}

export const ErrorState = memo(function ErrorState({
  title = "Ошибка загрузки",
  message,
  className = "",
}: ErrorStateProps) {
  return (
    <Card
      className={`border-destructive/30 bg-destructive/5 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <CardContent className="pt-6">
        <p className="font-semibold text-destructive">
          {title}: {message}
        </p>
      </CardContent>
    </Card>
  );
});
