"use client";

import { Card, CardBody } from "@heroui/react";
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
      className={`border-danger-200 bg-linear-to-br from-danger-50 to-danger-100 shadow-lg ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <CardBody>
        <p className="text-danger-800 font-semibold">
          {title}: {message}
        </p>
      </CardBody>
    </Card>
  );
});
