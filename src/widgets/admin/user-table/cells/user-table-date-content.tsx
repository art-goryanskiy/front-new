"use client";

import { memo, useMemo } from "react";
import type { UserEntity } from "@/shared/api/generated/graphql";

interface UserTableDateContentProps {
  user: UserEntity;
  field: "createdAt" | "updatedAt";
}

function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export const UserTableDateContent = memo(
  function UserTableDateContent({
    user,
    field,
  }: UserTableDateContentProps) {
    const date = user[field];

    const formattedDate = useMemo(
      () => (date ? formatDate(date) : null),
      [date]
    );

    if (!formattedDate) {
      return <span className="text-default-400">-</span>;
    }

    return (
      <span className="text-sm text-default-600 dark:text-default-400">
        {formattedDate}
      </span>
    );
  }
);
