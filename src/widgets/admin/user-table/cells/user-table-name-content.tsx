"use client";

import { memo, useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserEntity } from "@/shared/api/generated/graphql";

interface UserTableNameContentProps {
  user: UserEntity;
}

function getUserInitials(user: UserEntity): string {
  const firstName = user.firstName || user.profile?.firstName;
  const lastName = user.lastName || user.profile?.lastName;

  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (firstName) {
    return firstName[0].toUpperCase();
  }
  if (user.email) {
    return user.email[0].toUpperCase();
  }
  return "U";
}

function getUserDisplayName(user: UserEntity): string {
  const firstName = user.firstName || user.profile?.firstName;
  const lastName = user.lastName || user.profile?.lastName;

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  if (firstName) {
    return firstName;
  }
  return user.email;
}

function getUserPhone(user: UserEntity): string | null {
  return user.phone || user.profile?.phone || null;
}

export const UserTableNameContent = memo(
  function UserTableNameContent({ user }: UserTableNameContentProps) {
    const displayName = useMemo(
      () => getUserDisplayName(user),
      [user]
    );

    const initials = useMemo(() => getUserInitials(user), [user]);

    const phone = useMemo(() => getUserPhone(user), [user]);

    const avatarAlt = useMemo(
      () => `Аватар пользователя ${displayName}`,
      [displayName]
    );

    return (
      <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3 lg:gap-4">
        <Avatar className="hidden h-9 w-9 shrink-0 shadow-md transition-transform group-hover:scale-110 sm:flex">
          <AvatarImage src={user.profile?.avatar} alt={avatarAlt} />
          <AvatarFallback className="text-xs font-bold text-primary sm:text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex w-full min-w-0 flex-1 flex-col overflow-hidden">
          <p
            className="line-clamp-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary sm:text-base"
            title={displayName}
          >
            {displayName}
          </p>
          {phone && (
            <p
              className="line-clamp-1 text-xs text-muted-foreground"
              title={phone}
            >
              {phone}
            </p>
          )}
        </div>
      </div>
    );
  }
);
