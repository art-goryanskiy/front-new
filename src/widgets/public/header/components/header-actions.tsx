"use client";

import { memo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, ShoppingCart } from "lucide-react";
import { UserMenu } from "@/shared/ui/user-menu/user-menu";
import { ThemeToggle } from "@/shared/ui/theme-toggle/theme-toggle";
import { useMyCart } from "@/entities/cart/api/use-my-cart";
import { PUBLIC_HEADER_CLASSES } from "../constants/public-header-constants";
import type { UserEntity } from "@/shared/api/generated/graphql";
import { cn } from "@/lib/utils";

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
  const { items } = useMyCart({ skip: !user });
  const cartCount = items.length;

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
      {user && (
        <Button
          variant="ghost"
          size="icon"
          asChild
          aria-label={cartCount > 0 ? `Корзина: ${cartCount}` : "Корзина"}
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Link href="/cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span
                className={cn(
                  "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
                )}
              >
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </Button>
      )}
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
