"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
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
        variant="ghost"
        size="icon"
        aria-label="Поиск"
        onClick={onSearchClick}
        className="text-muted-foreground hover:text-foreground"
      >
        <Search className="h-5 w-5" />
      </Button>
      <ThemeToggle />
      {user ? (
        <UserMenu user={user} onLogout={onLogout} />
      ) : (
        <Button
          variant="secondary"
          onClick={onLoginClick}
          className="hidden sm:flex"
        >
          Войти
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Меню"
        onClick={onMobileMenuToggle}
        className="text-muted-foreground hover:text-foreground md:hidden"
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
