"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/shared/ui/back-button/back-button";

interface PageHeaderWithBackProps {
  title: string;
  description?: string;
  actionButton?: {
    label: string;
    onPress: () => void;
  };
  backButton?: {
    label?: string;
    variant?: "button" | "icon";
  };
}

export const PageHeaderWithBack = memo(function PageHeaderWithBack({
  title,
  description,
  actionButton,
  backButton = { variant: "icon" },
}: PageHeaderWithBackProps) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="flex items-center gap-4">
      {backButton.variant === "icon" ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="shrink-0"
          aria-label={backButton.label || "Назад"}
        >
          ←
        </Button>
      ) : (
        <BackButton label={backButton.label} className="shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actionButton && (
        <Button
          size="lg"
          onClick={actionButton.onPress}
          className="shrink-0"
        >
          {actionButton.label}
        </Button>
      )}
    </div>
  );
});
