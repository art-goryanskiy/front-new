"use client";

import { memo, useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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

  const handleSelect = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const linkClass = isEducationActive
    ? "font-semibold text-primary"
    : "text-muted-foreground hover:text-primary";

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
        <Home className="text-muted-foreground hover:text-primary" />
      </Link>

      {isMounted ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`text-sm font-medium ${linkClass} transition-colors`}
            >
              Обучение
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent aria-label="Категории обучения">
            {EDUCATION_CATEGORIES.map((category) => (
              <DropdownMenuItem
                key={category.path}
                onClick={() => handleSelect(category.path)}
                className={
                  pathname === category.path
                    ? "font-semibold text-primary"
                    : ""
                }
              >
                {category.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="ghost"
          className={`text-sm font-medium ${linkClass}`}
          onClick={() => router.push("/qualification-upgrade")}
        >
          Обучение
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      )}
    </nav>
  );
});
