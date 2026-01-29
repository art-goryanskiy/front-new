"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { MENU_ITEMS } from "@/shared/constants/categories";
import { useSidebarStore } from "@/shared/store/sidebar-store";
import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import { SIDEBAR_CLASSES } from "../constants/sidebar-constants";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarLogo } from "./sidebar-logo";
import { SidebarNavItem } from "./sidebar-nav-item";

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
    <aside className={asideClassName} aria-label="Навигация админки">
      <div className={SIDEBAR_CLASSES.desktop.logoSection}>
        <SidebarLogo />
      </div>

      <ScrollArea className="flex-1">
        <nav className="space-y-1 p-2">
          <SidebarNavItem
            item={HOME_MENU_ITEM}
            isActive={pathname === "/admin"}
            isCollapsed={isCollapsed}
            onNavigate={handleNavigate}
          />

          <SidebarNavItem
            item={USERS_MENU_ITEM}
            isActive={pathname === "/admin/users"}
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
      </ScrollArea>

      <div className={SIDEBAR_CLASSES.desktop.footer}>
        <SidebarFooter
          isCollapsed={isCollapsed}
          onToggle={toggleSidebar}
        />
      </div>
    </aside>
  );
});
