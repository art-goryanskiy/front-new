"use client";

import { memo, ReactNode } from "react";

interface ListHeaderProps {
  title: string;
  description?: string;
  backButton?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const ListHeader = memo(function ListHeader({
  title,
  description,
  backButton,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: ListHeaderProps) {
  return (
    <div className={className}>
      {backButton}
      <div className="space-y-2">
        <h1 className={titleClassName}>{title}</h1>
        {description && (
          <p className={descriptionClassName}>{description}</p>
        )}
      </div>
    </div>
  );
});
