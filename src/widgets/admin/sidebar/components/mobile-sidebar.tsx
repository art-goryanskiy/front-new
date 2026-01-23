"use client";

import { memo, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MENU_ITEMS } from "@/shared/constants/categories";
import { MobileSidebarNavItem } from "./mobile-sidebar-nav-item";
import { SIDEBAR_CLASSES } from "../constants/sidebar-constants";

const HOME_MENU_ITEM = {
  label: "Главная",
  icon: "home" as const,
  path: "/admin",
  color: "default" as const,
};

const USERS_MENU_ITEM = {
  label: "Пользователи",
  icon: "users" as const,
  path: "/admin/users",
  color: "default" as const,
};

export const MobileSidebar = memo(function MobileSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const isHomeActive = useMemo(
    () => pathname === "/admin",
    [pathname]
  );
  const isUsersActive = useMemo(
    () => pathname === "/admin/users",
    [pathname]
  );

  return (
    <aside className={SIDEBAR_CLASSES.mobile.base}>
      <nav className={SIDEBAR_CLASSES.mobile.nav}>
        <MobileSidebarNavItem
          item={HOME_MENU_ITEM}
          isActive={isHomeActive}
          onNavigate={handleNavigate}
        />
        <MobileSidebarNavItem
          item={USERS_MENU_ITEM}
          isActive={isUsersActive}
          onNavigate={handleNavigate}
        />
        {MENU_ITEMS.map((item) => (
          <MobileSidebarNavItem
            key={item.path}
            item={item}
            isActive={pathname === item.path}
            onNavigate={handleNavigate}
          />
        ))}
      </nav>
    </aside>
  );
});
