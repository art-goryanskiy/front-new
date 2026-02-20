"use client";

import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/shared/ui/icons/icon";
import { Surface } from "@/shared/ui/surface/surface";
import { memo } from "react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actionButton?: {
    label: string;
    mobileLabel?: string;
    onPress: () => void;
    icon?: IconName;
  };
  variant?: "default" | "gradient";
  /** Скрыть заголовок (если он вынесен в sticky на странице) */
  hideTitle?: boolean;
}

export const AdminPageHeader = memo(function AdminPageHeader({
  title,
  description,
  actionButton,
  variant = "gradient",
  hideTitle,
}: AdminPageHeaderProps) {
  const titleClassName =
    variant === "gradient"
      ? "text-2xl font-bold text-transparent bg-clip-text sm:text-3xl lg:text-4xl bg-linear-to-r from-primary to-primary/80 break-words"
      : "text-2xl font-bold text-foreground sm:text-3xl";

  return (
    <Surface
      variant="floating"
      className="relative overflow-hidden p-4 sm:p-5 lg:p-6"
    >
      {/* subtle shader-lite, like AdminHero but calmer */}
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-[radial-gradient(circle_at_top,var(--color-primary),transparent_55%)]/[10] absolute -top-24 left-1/2 h-[320px] w-[720px] -translate-x-1/2 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background/25" />
      </div>

      <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1 space-y-2">
          {!hideTitle && <h1 className={titleClassName}>{title}</h1>}
          {description ? (
            <p className="text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          ) : null}
        </div>

        {actionButton ? (
          <Button
            size="default"
            className="w-full shrink-0 font-semibold shadow-sm transition-shadow hover:shadow-md sm:w-auto"
            onClick={actionButton.onPress}
          >
            {actionButton.icon ? (
              <Icon
                name={actionButton.icon}
                className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                size={20}
              />
            ) : null}
            <span className="hidden sm:inline">
              {actionButton.label}
            </span>
            <span className="sm:hidden">
              {actionButton.mobileLabel || actionButton.label}
            </span>
          </Button>
        ) : null}
      </div>
    </Surface>
  );
});
