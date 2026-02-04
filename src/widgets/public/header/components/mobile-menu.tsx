"use client";

import { memo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GLOW_MENU_NAV_ITEMS } from "@/components/ui/glow-menu-constants";
import { ThemeToggle } from "@/shared/ui/theme-toggle/theme-toggle";
import type { UserEntity } from "@/shared/api/generated/graphql";
import { X } from "lucide-react";

export const MOBILE_MENU_PANEL_ID = "mobile-menu-panel";

interface MobileMenuProps {
  isOpen: boolean;
  user: UserEntity | null;
  onClose: () => void;
  onLoginClick: () => void;
}

export const MobileMenu = memo(function MobileMenu({
  isOpen,
  user,
  onClose,
  onLoginClick,
}: MobileMenuProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Фокус на кнопку «Закрыть» при открытии
  useEffect(() => {
    if (isOpen) {
      const t = requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
      return () => cancelAnimationFrame(t);
    }
  }, [isOpen]);

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            key="mobile-menu-panel"
            id={MOBILE_MENU_PANEL_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 180,
            }}
            className="fixed top-16 right-0 bottom-0 z-50 flex w-80 max-w-[85vw] flex-col border-l border-border bg-background shadow-2xl md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Шапка: название + кнопка закрытия */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3">
              <Link
                href="/"
                onClick={onClose}
                className="text-sm font-semibold text-foreground transition-opacity hover:opacity-80"
              >
                Стандарт Плюс
              </Link>
              <Button
                ref={closeButtonRef}
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Закрыть меню"
                className="shrink-0 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Навигация */}
            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
              {GLOW_MENU_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? "border-l-2 border-primary bg-muted/50 font-medium text-foreground"
                        : "border-l-2 border-transparent text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 shrink-0 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Низ: тема + вход */}
            <div className="shrink-0 border-t border-border p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Тема
                </span>
                <ThemeToggle />
              </div>
              {!user && (
                <Button
                  variant="default"
                  className="mt-3 w-full"
                  onClick={() => {
                    onLoginClick();
                    onClose();
                  }}
                >
                  Войти
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
