"use client";

import { memo, useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Home, ChevronDown } from "lucide-react";
import { PUBLIC_HEADER_CLASSES } from "../constants/public-header-constants";
import { CATEGORY_TYPE_LABELS } from "@/shared/constants/categories";
import { CategoryType } from "@/shared/api/generated/graphql";

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

interface DesktopNavigationProps {
  isMounted: boolean;
}

export const DesktopNavigation = memo(function DesktopNavigation({
  isMounted,
}: DesktopNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isEducationActive = useMemo(
    () => EDUCATION_CATEGORIES.some((cat) => pathname === cat.path),
    [pathname]
  );

  const handleDropdownAction = useCallback(
    (key: string | number) => {
      const category = EDUCATION_CATEGORIES.find(
        (cat) => cat.path === key
      );
      if (category) {
        router.push(category.path);
      }
    },
    [router]
  );

  return (
    <nav className={PUBLIC_HEADER_CLASSES.nav}>
      <Link
        href="/"
        className={
          pathname === "/"
            ? PUBLIC_HEADER_CLASSES.navLinkActive
            : PUBLIC_HEADER_CLASSES.navLink
        }
        aria-label="Главная"
      >
        <Home className="text-default-600 hover:text-primary-600 dark:text-foreground dark:hover:text-primary-400" />
      </Link>

      {isMounted ? (
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Button
              variant="light"
              className={`text-sm font-medium ${
                isEducationActive
                  ? "font-semibold text-primary-600 dark:text-primary-400"
                  : "text-default-700 hover:text-primary-600 dark:text-foreground dark:hover:text-primary-400"
              } transition-colors`}
              endContent={<ChevronDown className="h-4 w-4" />}
            >
              Обучение
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Категории обучения"
            onAction={handleDropdownAction}
          >
            {EDUCATION_CATEGORIES.map((category) => (
              <DropdownItem
                key={category.path}
                textValue={category.label}
                className={
                  pathname === category.path
                    ? "font-semibold text-primary-600 dark:text-primary-400"
                    : "dark:text-foreground"
                }
              >
                {category.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button
          variant="light"
          className={`text-sm font-medium ${
            isEducationActive
              ? "font-semibold text-primary-600 dark:text-primary-400"
              : "text-default-700 hover:text-primary-600 dark:text-foreground dark:hover:text-primary-400"
          } transition-colors`}
          endContent={<ChevronDown className="h-4 w-4" />}
          onPress={() => router.push("/qualification-upgrade")}
        >
          Обучение
        </Button>
      )}
    </nav>
  );
});
