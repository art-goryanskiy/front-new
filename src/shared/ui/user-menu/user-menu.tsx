"use client";

import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon, type IconName } from "@/shared/ui/icons/icon";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  USER_MENU_CLASSES,
  USER_MENU_TEXTS,
} from "./constants/user-menu-constants";
import type { UserMenuProps } from "./types/user-menu.types";

const DEFAULT_MENU_ITEMS: ReadonlyArray<{
  key: string;
  label: string;
  icon: IconName;
}> = [
  {
    key: "profile",
    label: USER_MENU_TEXTS.profile,
    icon: "user",
  },
  {
    key: "orders",
    label: USER_MENU_TEXTS.myOrders,
    icon: "file-text",
  },
] as const;

export const UserMenu = memo(function UserMenu({
  user,
  onLogout,
  menuItems = DEFAULT_MENU_ITEMS,
}: UserMenuProps) {
  const router = useRouter();
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const userEmail = user?.email || "User";
  const userInitial = useMemo(
    () => userEmail.charAt(0).toUpperCase(),
    [userEmail]
  );

  const displayName = useMemo(() => {
    const first = user?.firstName ?? user?.profile?.firstName ?? "";
    const last = user?.lastName ?? user?.profile?.lastName ?? "";
    const name = [first, last].filter(Boolean).join(" ").trim();
    return name || userEmail;
  }, [user?.firstName, user?.lastName, user?.profile?.firstName, user?.profile?.lastName, userEmail]);

  const avatarUrl = user?.profile?.avatar ?? null;
  useEffect(() => {
    setAvatarLoaded(false);
  }, [avatarUrl]);

  const handleProfile = useCallback(() => {
    router.push("/profile");
  }, [router]);

  const handleOrders = useCallback(() => {
    router.push("/orders");
  }, [router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          data-user-menu
          className={USER_MENU_CLASSES.trigger}
          aria-label="Меню пользователя"
        >
          <Avatar aria-hidden className={USER_MENU_CLASSES.avatar}>
            {user?.profile?.avatar ? (
              <Image
                src={user.profile.avatar}
                alt={userEmail}
                fill
                sizes="40px"
                className="object-cover"
                onLoad={() => setAvatarLoaded(true)}
              />
            ) : null}
            <AvatarFallback
              className={cn(
                "bg-primary text-xs font-semibold text-primary-foreground sm:text-sm",
                avatarLoaded && "hidden"
              )}
            >
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <ChevronDown
            className="hidden h-4 w-4 shrink-0 text-muted-foreground md:block"
            size={16}
            aria-hidden="true"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={USER_MENU_CLASSES.menu}
        data-user-menu
      >
        <DropdownMenuLabel className="font-normal">
          <span className="truncate block">{displayName}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.key}
            onClick={
              item.onPress ??
              (item.key === "profile"
                ? handleProfile
                : item.key === "orders"
                  ? handleOrders
                  : undefined)
            }
          >
            <Icon
              name={item.icon}
              className="mr-2 h-4 w-4"
              size={16}
            />
            {item.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={onLogout}
          className="text-destructive focus:text-destructive"
        >
          <Icon name="log-out" className="mr-2 h-4 w-4" size={16} />
          {USER_MENU_TEXTS.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
