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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon, type IconName } from "@/shared/ui/icons/icon";
import { motion } from "framer-motion";
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
    key: "settings",
    label: USER_MENU_TEXTS.settings,
    icon: "settings",
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

  const avatarUrl = user?.profile?.avatar ?? null;
  useEffect(() => {
    setAvatarLoaded(false);
  }, [avatarUrl]);

  const handleProfile = useCallback(() => {
    router.push("/profile");
  }, [router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={USER_MENU_CLASSES.menu}
      >
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.key}
            onClick={
              item.onPress ??
              (item.key === "profile" ? handleProfile : undefined)
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
