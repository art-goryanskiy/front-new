"use client";

import { memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { Home } from "lucide-react";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import { CategoryType } from "@/shared/api/generated/graphql";
import type { UserEntity } from "@/shared/api/generated/graphql";

const EDUCATION_CATEGORIES = [
  {
    label: CATEGORY_TYPE_LABELS.QUALIFICATION_UPGRADE,
    path: "/qualification-upgrade",
    type: CategoryType.QualificationUpgrade,
  },
  {
    label: CATEGORY_TYPE_LABELS.PROFESSIONAL_RETRAINING,
    path: "/professional-retraining",
    type: CategoryType.ProfessionalRetraining,
  },
  {
    label: CATEGORY_TYPE_LABELS.PROFESSIONAL_EDUCATION,
    path: "/professional-education",
    type: CategoryType.ProfessionalEducation,
  },
] as const;

interface MobileMenuProps {
  isOpen: boolean;
  user: UserEntity | null;
  onClose: () => void;
  onCategoryClick: (path: string) => void;
  onLoginClick: () => void;
}

export const MobileMenu = memo(function MobileMenu({
  isOpen,
  user,
  onClose,
  onCategoryClick,
  onLoginClick,
}: MobileMenuProps) {
  const pathname = usePathname();

  const handleCategoryClick = useCallback(
    (path: string) => {
      onCategoryClick(path);
      onClose();
    },
    [onCategoryClick, onClose]
  );

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
          className="fixed top-16 right-0 bottom-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-white shadow-xl md:hidden dark:bg-slate-900"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-4 p-4">
            <Link
              href="/"
              onClick={onClose}
              className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                pathname === "/"
                  ? "bg-primary-50 font-semibold text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                  : "text-default-700 hover:bg-default-100 hover:text-default-900 dark:text-foreground dark:hover:bg-content2 dark:hover:text-foreground"
              }`}
            >
              <Home
                className={`h-5 w-5 transition-colors ${
                  pathname === "/"
                    ? ""
                    : "dark:text-foreground/90 group-hover:dark:text-foreground"
                }`}
              />
              <span>Главная</span>
            </Link>

            <div className="flex flex-col gap-2">
              <div className="px-4 py-2 text-xs font-semibold tracking-wider text-default-500 uppercase dark:text-foreground/70">
                Обучение
              </div>
              {EDUCATION_CATEGORIES.map((category) => (
                <button
                  key={category.path}
                  onClick={() => handleCategoryClick(category.path)}
                  className={`group flex items-center justify-between rounded-lg px-4 py-3 text-left transition-colors ${
                    pathname === category.path
                      ? "bg-primary-50 font-semibold text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                      : "text-default-700 hover:bg-default-100 hover:text-default-900 dark:text-foreground dark:hover:bg-content2 dark:hover:text-foreground"
                  }`}
                >
                  <span>{category.label}</span>
                  {pathname === category.path && (
                    <div className="h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-400" />
                  )}
                </button>
              ))}
            </div>

            {!user && (
              <div className="border-t border-default-200 pt-4 dark:border-default-800">
                <Button
                  color="primary"
                  variant="flat"
                  fullWidth
                  onPress={() => {
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
