"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";

type IconColor =
  | "text-primary"
  | "text-primary-600"
  | "text-blue-500"
  | "text-foreground";

interface MenuItemBase {
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  label: string;
  gradient: string;
  iconColor: IconColor;
}

interface MenuItemLink extends MenuItemBase {
  href: string;
  children?: never;
}

interface MenuItemWithChildren extends MenuItemBase {
  href?: never;
  children: (MenuItemBase & { href: string })[];
}

export type MenuItem = MenuItemLink | MenuItemWithChildren;

interface MenuBarProps {
  className?: string;
  items: MenuItem[];
  activeItem?: string;
  onItemClick?: (label: string) => void;
}

const ICON_HOVER_CLASS: Record<IconColor, string> = {
  "text-primary": "group-hover:text-primary",
  "text-primary-600": "group-hover:text-primary-600",
  "text-blue-500": "group-hover:text-blue-500",
  "text-foreground": "group-hover:text-foreground",
};

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
      scale: {
        duration: 0.5,
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
  },
};

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

function isItemWithChildren(
  item: MenuItem
): item is MenuItemWithChildren {
  return (
    "children" in item &&
    Array.isArray(item.children) &&
    item.children.length > 0
  );
}

export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className, items, activeItem, onItemClick }, ref) => {
    const pathname = usePathname();
    const [openDropdownLabel, setOpenDropdownLabel] = React.useState<
      string | null
    >(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const { theme, resolvedTheme } = useTheme();
    const isDarkTheme = resolvedTheme === "dark" || theme === "dark";

    React.useEffect(() => {
      if (!openDropdownLabel) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setOpenDropdownLabel(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [openDropdownLabel]);

    return (
      <div ref={ref} className={cn("relative", className)}>
        <motion.nav
          className={cn(
            "relative overflow-hidden rounded-2xl border border-border/40 bg-linear-to-b from-background/80 to-background/40 p-2 shadow-lg backdrop-blur-lg",
            "border-border from-background/90 to-background/50"
          )}
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            className="pointer-events-none absolute -inset-2 z-0 rounded-3xl to-transparent"
            style={{
              background: isDarkTheme
                ? "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(96,165,250,0.3) 0%, rgba(192,132,252,0.3) 30%, rgba(248,113,113,0.3) 60%, transparent 90%)"
                : "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(96,165,250,0.2) 0%, rgba(192,132,252,0.2) 30%, rgba(248,113,113,0.2) 60%, transparent 90%)",
            }}
            variants={navGlowVariants}
          />
          <ul className="relative z-10 flex items-center gap-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.label === activeItem ||
                (isItemWithChildren(item) &&
                  item.children.some((c) => c.href === pathname));
              const hoverClass = ICON_HOVER_CLASS[item.iconColor];

              const content = (
                <>
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-0"
                    variants={glowVariants}
                    animate={isActive ? "hover" : "initial"}
                    style={{
                      background: item.gradient,
                      opacity: isActive ? 1 : 0,
                      borderRadius: "16px",
                    }}
                  />
                  <motion.div
                    className={cn(
                      "relative z-10 flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 transition-colors",
                      isActive
                        ? "text-foreground dark:text-foreground"
                        : "text-muted-foreground group-hover:text-foreground dark:text-muted-foreground dark:group-hover:text-foreground"
                    )}
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center bottom",
                    }}
                  >
                    <span
                      className={cn(
                        "transition-colors duration-300",
                        isActive ? item.iconColor : "text-foreground",
                        hoverClass
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>{item.label}</span>
                    {isItemWithChildren(item) && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform",
                          openDropdownLabel === item.label &&
                            "rotate-180"
                        )}
                      />
                    )}
                  </motion.div>
                  <motion.div
                    className={cn(
                      "absolute inset-0 z-10 flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 transition-colors",
                      isActive
                        ? "text-foreground dark:text-foreground"
                        : "text-muted-foreground group-hover:text-foreground dark:text-muted-foreground dark:group-hover:text-foreground"
                    )}
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      rotateX: 90,
                    }}
                  >
                    <span
                      className={cn(
                        "transition-colors duration-300",
                        isActive ? item.iconColor : "text-foreground",
                        hoverClass
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>{item.label}</span>
                    {isItemWithChildren(item) && (
                      <ChevronDown className="h-4 w-4 shrink-0 rotate-180" />
                    )}
                  </motion.div>
                </>
              );

              if (isItemWithChildren(item)) {
                return (
                  <motion.li
                    key={item.label}
                    className="relative"
                    ref={dropdownRef}
                  >
                    <motion.div
                      className="group relative block overflow-visible rounded-xl"
                      style={{ perspective: "600px" }}
                      whileHover="hover"
                      initial="initial"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdownLabel((prev) =>
                            prev === item.label ? null : item.label
                          )
                        }
                        className="block w-full text-left"
                        aria-expanded={
                          openDropdownLabel === item.label
                        }
                        aria-haspopup="true"
                      >
                        {content}
                      </button>
                      {openDropdownLabel === item.label && (
                        <div
                          className="absolute top-full left-0 z-50 mt-1 min-w-[220px] rounded-xl border border-border bg-background py-1 shadow-lg border-border bg-background"
                          role="menu"
                        >
                          {item.children.map((child) => {
                            const ChildIcon = child.icon;
                            const isChildActive =
                              pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                role="menuitem"
                                onClick={() =>
                                  setOpenDropdownLabel(null)
                                }
                                className={cn(
                                  "flex items-center gap-2 px-4 py-2 text-sm transition-colors",
                                  isChildActive
                                    ? "bg-primary/10 font-medium text-primary dark:bg-primary/20 dark:text-primary-400"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-foreground dark:hover:bg-muted"
                                )}
                              >
                                <ChildIcon className="h-4 w-4 shrink-0" />
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  </motion.li>
                );
              }

              return (
                <motion.li key={item.label} className="relative">
                  <motion.div
                    className="group relative block overflow-visible rounded-xl"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    {onItemClick ? (
                      <button
                        onClick={() => onItemClick(item.label)}
                        className="block w-full text-left"
                      >
                        {content}
                      </button>
                    ) : (
                      <Link href={item.href} className="block w-full">
                        {content}
                      </Link>
                    )}
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </motion.nav>
      </div>
    );
  }
);

MenuBar.displayName = "MenuBar";
