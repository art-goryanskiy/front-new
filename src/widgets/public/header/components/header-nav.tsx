"use client";

import { memo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { HEADER_NAV_ITEMS } from "../constants/public-header-constants";
import { PUBLIC_HEADER_CLASSES } from "../constants/public-header-constants";

export const HeaderNav = memo(function HeaderNav() {
  const pathname = usePathname();
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openLabel) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpenLabel(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [openLabel]);

  const isEducationActive = HEADER_NAV_ITEMS[1].children.some(
    (c) => c.href === pathname
  );

  return (
    <nav className={PUBLIC_HEADER_CLASSES.nav} ref={menuRef}>
      <Link
        href="/"
        className={cn(
          pathname === "/"
            ? PUBLIC_HEADER_CLASSES.navLinkActive
            : PUBLIC_HEADER_CLASSES.navLink
        )}
      >
        Главная
      </Link>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenLabel(openLabel ? null : "Обучение")}
          className={cn(
            "flex items-center gap-0.5 text-sm font-medium transition-colors",
            isEducationActive
              ? PUBLIC_HEADER_CLASSES.navLinkActive
              : PUBLIC_HEADER_CLASSES.navLink
          )}
          aria-expanded={openLabel === "Обучение"}
          aria-haspopup="true"
        >
          Обучение
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              openLabel && "rotate-180"
            )}
          />
        </button>
        {openLabel === "Обучение" && (
          <div
            className="absolute top-full left-0 z-50 mt-1 min-w-[200px] rounded-lg border border-border bg-background py-1 shadow-lg"
            role="menu"
          >
            {HEADER_NAV_ITEMS[1].children.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpenLabel(null)}
                className={cn(
                  "block px-4 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "dark:text-primary-400 bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
});
