"use client";

import { memo, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
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
        return { variant: "destructive" as const, label: "Заблокирован" };
      }
      if (!user.isEmailVerified) {
        return { variant: "warning" as const, label: "Не подтвержден" };
      }
      return { variant: "success" as const, label: "Активен" };
    }, [user.isBlocked, user.isEmailVerified]);

    return (
      <Badge variant={statusConfig.variant} className="font-semibold">
        {statusConfig.label}
      </Badge>
    );
  }
);
