"use client";

import { memo } from "react";
import { Chip } from "@heroui/react";
import type {
  UserEntity,
  UserRole,
} from "@/shared/api/generated/graphql";

interface UserTableRoleContentProps {
  user: UserEntity;
}

const ROLE_COLORS: Record<
  UserRole,
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
> = {
  ADMIN: "primary",
  USER: "default",
};

const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: "Администратор",
  USER: "Пользователь",
};

export const UserTableRoleContent = memo(
  function UserTableRoleContent({ user }: UserTableRoleContentProps) {
    return (
      <Chip
        color={ROLE_COLORS[user.role]}
        variant="flat"
        size="sm"
        className="font-semibold"
      >
        {ROLE_LABELS[user.role]}
      </Chip>
    );
  }
);
