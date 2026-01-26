"use client";

import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import type {
  UserEntity,
  UserRole,
} from "@/shared/api/generated/graphql";

interface UserTableRoleContentProps {
  user: UserEntity;
}

const ROLE_VARIANTS: Record<UserRole, "default" | "secondary"> = {
  ADMIN: "default",
  USER: "secondary",
};

const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Администратор",
  USER: "Пользователь",
};

export const UserTableRoleContent = memo(
  function UserTableRoleContent({ user }: UserTableRoleContentProps) {
    return (
      <Badge variant={ROLE_VARIANTS[user.role]} className="font-semibold">
        {ROLE_LABELS[user.role]}
      </Badge>
    );
  }
);
