"use client";

import React, { useState, useRef, useEffect, JSX } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface FloatingNavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
}

export const FloatingNav = ({
  navItems,
  className,
  rightContent,
}: {
  navItems: FloatingNavItem[];
  className?: string;
  /** Слот справа (например кнопка «Войти» или UserMenu) */
  rightContent?: React.ReactNode;
}) => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (current) => {
      const prev = prevScrollY.current;
      prevScrollY.current = current;

      if (current < 30) {
        setVisible(true); // показывать меню вверху страницы (главная и т.п.)
      } else if (current > prev) {
        setVisible(false); // скролл вниз — скрыть
      } else {
        setVisible(true); // скролл вверх — показать
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed top-10 left-1/2 z-5000 flex max-w-fit -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/95 px-6 py-2 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-background/95",
          "pr-2 pl-6",
          className
        )}
      >
        {navItems.map((item, idx) => {
          const isActive = pathname === item.link;
          return (
            <Link
              key={`${item.link}-${idx}`}
              href={item.link}
              className={cn(
                "flex items-center gap-1.5 text-sm transition-colors",
                isActive
                  ? "font-semibold text-foreground dark:text-foreground"
                  : "text-muted-foreground hover:text-foreground dark:hover:text-foreground"
              )}
            >
              {item.icon && (
                <span className="block shrink-0 sm:hidden">
                  {item.icon}
                </span>
              )}
              <span className={item.icon ? "hidden sm:inline" : ""}>
                {item.name}
              </span>
            </Link>
          );
        })}
        {rightContent != null ? (
          <div className="pl-2">{rightContent}</div>
        ) : (
          <button
            type="button"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground dark:border-white/20"
          >
            <span>Войти</span>
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
