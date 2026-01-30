"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GLOW_MENU_NAV_ITEMS } from "@/components/ui/glow-menu-constants";
import type { UserEntity } from "@/shared/api/generated/graphql";

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 200,
          }}
          className="fixed top-16 right-0 bottom-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-background shadow-xl md:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4 p-4">
            {GLOW_MENU_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                    isActive
                      ? "dark:text-primary-400 bg-primary/10 font-semibold text-primary dark:bg-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground dark:text-foreground dark:hover:bg-muted"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${
                      isActive
                        ? "dark:text-primary-400 text-primary"
                        : ""
                    }`}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="dark:bg-primary-400 ml-auto h-2 w-2 shrink-0 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}

            {!user && (
              <div className="border-t border-border pt-4">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    onLoginClick();
                    onClose();
                  }}
                >
                  Войти
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
});
