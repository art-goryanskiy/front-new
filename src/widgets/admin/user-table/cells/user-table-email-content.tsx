"use client";

import { memo } from "react";
import type { UserEntity } from "@/shared/api/generated/graphql";

interface UserTableEmailContentProps {
  user: UserEntity;
}

export const UserTableEmailContent = memo(
  function UserTableEmailContent({
    user,
  }: UserTableEmailContentProps) {
    return (
      <div className="flex min-w-0 flex-col">
        <p
          className="line-clamp-1 text-sm font-semibold text-default-900 transition-colors group-hover:text-primary-600 sm:text-base"
          title={user.email}
        >
          {user.email}
        </p>
      </div>
    );
  }
);
