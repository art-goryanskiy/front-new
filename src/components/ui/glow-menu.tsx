"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GlowMenuSubItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface GlowMenuItem {
  icon: LucideIcon | React.FC<{ className?: string }>;
  label: string;
  href?: string;
  gradient: string;
  iconColor: string;
  children?: GlowMenuSubItem[];
}

export interface GlowMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: GlowMenuItem[];
  /** Подсветка пункта по label (например "О нас", "Обучение") */
  activeItem?: string;
  /** Текущий pathname — для подсветки родителя при открытой дочерней странице */
  pathname?: string;
  onItemClick?: (label: string) => void;
}

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

/* Primary palette (#e50914) */
const NAV_GLOW_LIGHT =
  "bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(229,9,20,0.12)_30%,rgba(229,9,20,0.18)_60%,rgba(229,9,20,0.1)_90%,transparent_100%)]";
const NAV_GLOW_DARK =
  "bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(229,9,20,0.15)_30%,rgba(229,9,20,0.22)_60%,rgba(229,9,20,0.12)_90%,transparent_100%)]";

export const MenuBar = React.forwardRef<
  HTMLDivElement,
  GlowMenuProps
>(({ className, items, activeItem, pathname, onItemClick }, ref) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const isDarkTheme = mounted && theme === "dark";
  const [openDropdown, setOpenDropdown] = React.useState<
    string | null
  >(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  return (
    <motion.nav
      ref={ref}
      className={cn(
        "relative overflow-visible rounded-2xl border border-border/40 bg-linear-to-b from-background/80 to-background/40 p-2 shadow-lg backdrop-blur-lg",
        className
      )}
      initial="initial"
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute -inset-2 z-0 rounded-3xl from-transparent to-transparent",
          isDarkTheme ? NAV_GLOW_DARK : NAV_GLOW_LIGHT
        )}
        variants={navGlowVariants}
      />
      <ul className="relative z-10 flex items-center gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            (activeItem === item.label ||
              (pathname != null &&
                item.children?.some(
                  (c) =>
                    pathname === c.href || pathname.startsWith(c.href + "/")
                ))) ??
            false;
          const hasDropdown =
            item.children && item.children.length > 0;
          const isDropdownOpen = openDropdown === item.label;

          const content = (
            <motion.div
              className="group relative block min-h-10 overflow-visible rounded-xl"
              style={{ perspective: "600px" }}
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 z-0 rounded-2xl"
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
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
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
                    "transition-colors duration-300 group-hover:text-inherit",
                    item.iconColor
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>{item.label}</span>
                {hasDropdown && (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isDropdownOpen && "rotate-180"
                    )}
                  />
                )}
              </motion.div>
              <motion.div
                className={cn(
                  "pointer-events-none absolute inset-0 z-10 flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
                variants={backVariants}
                transition={sharedTransition}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center top",
                  rotateX: 90,
                }}
                aria-hidden
              >
                <span
                  className={cn(
                    "transition-colors duration-300 group-hover:text-inherit",
                    item.iconColor
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>{item.label}</span>
              </motion.div>
            </motion.div>
          );

          return (
            <motion.li key={item.label} className="relative">
              <div ref={dropdownRef} className="relative">
                {hasDropdown ? (
                  <button
                    type="button"
                    onPointerDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenDropdown((prev) =>
                        prev === item.label ? null : item.label
                      );
                    }}
                    className="block w-full cursor-pointer text-left"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    {content}
                  </button>
                ) : item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => onItemClick?.(item.label)}
                    className="block w-full"
                  >
                    {content}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => onItemClick?.(item.label)}
                    className="block w-full"
                  >
                    {content}
                  </button>
                )}

                <AnimatePresence>
                  {hasDropdown && isDropdownOpen && item.children && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 z-50 mt-2 min-w-[280px] overflow-hidden rounded-2xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur-xl"
                    >
                      {item.children.map((sub) => {
                        const SubIcon = sub.icon;
                        const isCurrentPage =
                          pathname != null &&
                          (pathname === sub.href || pathname.startsWith(sub.href + "/"));
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpenDropdown(null)}
                            className={cn(
                              "flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted",
                              isCurrentPage && "bg-primary/10 font-medium text-primary"
                            )}
                          >
                            {SubIcon ? (
                              <SubIcon className="h-5 w-5 shrink-0 text-primary" />
                            ) : null}
                            <span className="text-sm font-medium text-foreground">
                              {sub.label}
                            </span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
  );
});

MenuBar.displayName = "MenuBar";
