"use client";

import { memo, useMemo } from "react";
import { Chip } from "@heroui/react";
import type { UserEntity } from "@/shared/api/generated/graphql";

interface UserTableStatusContentProps {
  user: UserEntity;
}

export const UserTableStatusContent = memo(
  function UserTableStatusContent({
    user,
  }: UserTableStatusContentProps) {
    const statusConfig = useMemo(() => {
      if (user.isBlocked) {
        return {
          color: "danger" as const,
          label: "Заблокирован",
        };
      }

      if (!user.isEmailVerified) {
        return {
          color: "warning" as const,
          label: "Не подтвержден",
        };
      }

      return {
        color: "success" as const,
        label: "Активен",
      };
    }, [user.isBlocked, user.isEmailVerified]);

    return (
      <Chip
        color={statusConfig.color}
        variant="flat"
        size="sm"
        className="font-semibold"
      >
        {statusConfig.label}
      </Chip>
    );
  }
);
