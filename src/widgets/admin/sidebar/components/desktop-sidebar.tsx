"use client";

import { memo, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSidebarStore } from "@/shared/store/sidebar-store";
import { MENU_ITEMS } from "@/shared/constants/categories";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarNavItem } from "./sidebar-nav-item";
import { SidebarFooter } from "./sidebar-footer";
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

export const DesktopSidebar = memo(function DesktopSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const toggleSidebar = useSidebarStore(
    (state) => state.toggleSidebar
  );

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

  const asideClassName = useMemo(
    () =>
      `${SIDEBAR_CLASSES.desktop.base} ${
        isCollapsed
          ? SIDEBAR_CLASSES.desktop.collapsed
          : SIDEBAR_CLASSES.desktop.expanded
      }`,
    [isCollapsed]
  );

  return (
    <aside className={asideClassName}>
      <SidebarLogo />
      <nav className={SIDEBAR_CLASSES.desktop.nav}>
        <SidebarNavItem
          item={HOME_MENU_ITEM}
          isActive={isHomeActive}
          isCollapsed={isCollapsed}
          onNavigate={handleNavigate}
        />
        <SidebarNavItem
          item={USERS_MENU_ITEM}
          isActive={isUsersActive}
          isCollapsed={isCollapsed}
          onNavigate={handleNavigate}
        />
        {MENU_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.path}
            item={item}
            isActive={pathname === item.path}
            isCollapsed={isCollapsed}
            onNavigate={handleNavigate}
          />
        ))}
      </nav>
      <SidebarFooter
        isCollapsed={isCollapsed}
        onToggle={toggleSidebar}
      />
    </aside>
  );
});
