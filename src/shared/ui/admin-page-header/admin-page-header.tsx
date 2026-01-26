"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/shared/ui/icons/icon";

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
}

export const AdminPageHeader = memo(function AdminPageHeader({
  title,
  description,
  actionButton,
  variant = "gradient",
}: AdminPageHeaderProps) {
  const titleClassName =
    variant === "gradient"
      ? "mb-1 text-2xl font-bold text-transparent bg-clip-text sm:text-3xl lg:text-4xl bg-gradient-to-r from-primary to-primary/80 sm:mb-2 break-words"
      : "mb-2 text-2xl font-bold text-foreground sm:text-3xl";

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="min-w-0 flex-1">
        <h1 className={titleClassName}>{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground sm:text-base lg:text-lg">
            {description}
          </p>
        )}
      </div>
      {actionButton && (
        <Button
          size="default"
          className="w-full shrink-0 font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:w-auto"
          onClick={actionButton.onPress}
        >
          {actionButton.icon && (
            <Icon
              name={actionButton.icon}
              className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
              size={20}
            />
          )}
          <span className="hidden sm:inline">
            {actionButton.label}
          </span>
          <span className="sm:hidden">
            {actionButton.mobileLabel || actionButton.label}
          </span>
        </Button>
      )}
    </div>
  );
});
