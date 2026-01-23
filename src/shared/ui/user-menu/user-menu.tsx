"use client";

import { memo, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Icon, type IconName } from "@/shared/ui/icons/icon";
import {
  USER_MENU_TEXTS,
  USER_MENU_CLASSES,
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
  const userEmail = user?.email || "User";
  const userInitial = useMemo(
    () => userEmail.charAt(0).toUpperCase(),
    [userEmail]
  );

  const handleMenuItemPress = useCallback(
    (key: string) => {
      if (key === "profile") {
        router.push("/profile");
      }
    },
    [router]
  );

  const allMenuItems = useMemo(
    () => [
      ...menuItems.map((item) => ({
        ...item,
        onPress:
          item.onPress ||
          (item.key === "profile"
            ? () => handleMenuItemPress(item.key)
            : undefined),
      })),
      {
        key: "logout",
        label: USER_MENU_TEXTS.logout,
        icon: "log-out" as IconName,
        onPress: onLogout,
        color: "danger" as const,
      },
    ],
    [menuItems, onLogout, handleMenuItemPress]
  );

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={USER_MENU_CLASSES.trigger}
          aria-label="Меню пользователя"
        >
          <Avatar
            size="md"
            name={userEmail}
            className={USER_MENU_CLASSES.avatar}
            fallback={
              <span className="text-xs font-semibold text-white sm:text-sm">
                {userInitial}
              </span>
            }
          />
          <ChevronDown
            className="hidden h-4 w-4 shrink-0 text-slate-400 md:block"
            size={16}
            aria-hidden="true"
          />
        </motion.button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Меню пользователя"
        variant="flat"
        classNames={{
          base: USER_MENU_CLASSES.menu,
        }}
      >
        {allMenuItems.map((item) => (
          <DropdownItem
            key={item.key}
            startContent={
              <Icon name={item.icon} className="h-4 w-4" size={16} />
            }
            color={item.color}
            onPress={item.onPress}
            className={
              item.color === "danger" ? "text-danger" : undefined
            }
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
});
