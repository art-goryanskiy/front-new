"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/shared/ui/back-button/back-button";
import { Surface } from "@/shared/ui/surface/surface";

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
    <Surface
      variant="floating"
      className="relative overflow-hidden p-4 sm:p-5 lg:p-6"
    >
      {/* subtle shader-lite (matches admin headers) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-[radial-gradient(circle_at_top,var(--color-primary),transparent_55%)]/[10] absolute -top-24 left-1/2 h-[320px] w-[720px] -translate-x-1/2 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/25" />
      </div>

      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-start gap-3">
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
            <BackButton
              label={backButton.label}
              className="shrink-0"
            />
          )}

          <div className="min-w-0 space-y-2">
            <h1 className="text-2xl font-bold wrap-break-word text-foreground sm:text-3xl lg:text-4xl">
              {title}
            </h1>
            {description ? (
              <p className="text-sm text-muted-foreground sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {actionButton ? (
          <Button
            size="default"
            onClick={actionButton.onPress}
            className="w-full shrink-0 font-semibold shadow-sm transition-shadow hover:shadow-md sm:w-auto"
          >
            {actionButton.label}
          </Button>
        ) : null}
      </div>
    </Surface>
  );
});
