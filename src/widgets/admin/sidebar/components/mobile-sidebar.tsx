"use client";

import { MENU_ITEMS } from "@/shared/constants/categories";
import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import { MobileSidebarNavItem } from "./mobile-sidebar-nav-item";

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

  const items = useMemo(
    () => [HOME_MENU_ITEM, USERS_MENU_ITEM, ...MENU_ITEMS],
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
                isActive={pathname === item.path}
                onNavigate={handleNavigate}
              />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
});
