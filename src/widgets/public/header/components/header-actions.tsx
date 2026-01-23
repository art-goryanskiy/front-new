"use client";

import { memo } from "react";
import { Button } from "@heroui/react";
import { Search, Menu, X } from "lucide-react";
import { UserMenu } from "@/shared/ui/user-menu/user-menu";
import { ThemeToggle } from "@/shared/ui/theme-toggle/theme-toggle";
import { PUBLIC_HEADER_CLASSES } from "../constants/public-header-constants";
import type { UserEntity } from "@/shared/api/generated/graphql";

interface HeaderActionsProps {
  user: UserEntity | null;
  isMobileMenuOpen: boolean;
  onSearchClick: () => void;
  onMobileMenuToggle: () => void;
  onLoginClick: () => void;
  onLogout: () => void;
}

export const HeaderActions = memo(function HeaderActions({
  user,
  isMobileMenuOpen,
  onSearchClick,
  onMobileMenuToggle,
  onLoginClick,
  onLogout,
}: HeaderActionsProps) {
  return (
    <div className={PUBLIC_HEADER_CLASSES.actions}>
      <Button
        isIconOnly
        variant="light"
        aria-label="Поиск"
        onPress={onSearchClick}
        className="text-default-600 hover:text-primary-600 dark:text-foreground dark:hover:text-primary-400"
      >
        <Search className="h-5 w-5" />
      </Button>
      <ThemeToggle />
      {user ? (
        <UserMenu user={user} onLogout={onLogout} />
      ) : (
        <Button
          color="primary"
          variant="flat"
          onPress={onLoginClick}
          className="hidden sm:flex"
        >
          Войти
        </Button>
      )}
      <Button
        isIconOnly
        variant="light"
        aria-label="Меню"
        onPress={onMobileMenuToggle}
        className="text-default-600 hover:text-primary-600 md:hidden dark:text-foreground dark:hover:text-primary-400"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
});
