"use client";

import { MENU_ITEMS } from "@/shared/constants/categories";
import { useAdminNavState } from "@/shared/store/admin-nav-store";
import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import { MobileSidebarNavItem } from "./mobile-sidebar-nav-item";
import type { MenuItem } from "../types/sidebar.types";

const HOME_MENU_ITEM: MenuItem = {
  label: "Главная",
  icon: "home" as const,
  path: "/admin",
  color: "default" as const,
};

const USERS_MENU_ITEM: MenuItem = {
  label: "Пользователи",
  icon: "users" as const,
  path: "/admin/users",
  color: "default" as const,
};

const ORDERS_MENU_ITEM: MenuItem = {
  label: "Заявки",
  icon: "inbox" as const,
  path: "/admin/orders",
  color: "default" as const,
};

const EDUCATION_DOCUMENTS_MENU_ITEM: MenuItem = {
  label: "Документы",
  icon: "file-text" as const,
  path: "/admin/education-documents",
  color: "default" as const,
};

function isNavItemActive(
  pathname: string,
  itemPath: string
): boolean {
  if (itemPath === "/admin") return pathname === "/admin";
  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
}

export const MobileSidebar = memo(function MobileSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { activeCategoryType } = useAdminNavState();

  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const items = useMemo<MenuItem[]>(
    () => [
      HOME_MENU_ITEM,
      USERS_MENU_ITEM,
      ORDERS_MENU_ITEM,
      EDUCATION_DOCUMENTS_MENU_ITEM,
      ...MENU_ITEMS,
    ],
    []
  );

  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="pointer-events-none flex justify-center pb-3">
        <div className="pointer-events-auto w-fit rounded-2xl border border-border/60 bg-background/80 px-2 py-2 shadow-sm backdrop-blur-md">
          <nav className="flex items-center gap-1">
            {items.map((item) => (
              <MobileSidebarNavItem
                key={item.path}
                item={item}
                isActive={
                  pathname.startsWith("/admin/category/") &&
                  activeCategoryType &&
                  item.type
                    ? activeCategoryType === item.type
                    : isNavItemActive(pathname, item.path)
                }
                onNavigate={handleNavigate}
              />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
});
