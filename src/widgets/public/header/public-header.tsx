"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  PUBLIC_HEADER_CLASSES,
  PUBLIC_HEADER_ANIMATIONS,
} from "./constants/public-header-constants";
import { HeaderLogo } from "./components/header-logo";
import { HeaderActions } from "./components/header-actions";
import { MobileMenu } from "./components/mobile-menu";
import { SearchPanel } from "./components/search-panel";
import { usePublicHeaderState } from "./hooks/use-public-header-state";
import { MenuBar } from "@/components/ui/glow-menu";
import { GLOW_MENU_HEADER_ITEMS } from "./constants/glow-menu-header-items";
import { usePathname } from "next/navigation";

function getActiveMenuLabel(pathname: string): string | undefined {
  if (pathname === "/") return "Главная";
  if (
    pathname.startsWith("/qualification-upgrade") ||
    pathname.startsWith("/professional-retraining") ||
    pathname.startsWith("/professional-education")
  ) {
    return "Обучение";
  }
  return undefined;
}

export const PublicHeader = memo(function PublicHeader() {
  const pathname = usePathname();
  const {
    state,
    user,
    handleLogout,
    handleSearchIconClick,
    handleSearchChange,
    handleSearchFocus,
    handleSearchSelect,
    handleSearchClose,
    toggleMobileMenu,
    closeMobileMenu,
    handleLoginClick,
  } = usePublicHeaderState();

  return (
    <>
      <motion.header
        {...PUBLIC_HEADER_ANIMATIONS.header}
        className={PUBLIC_HEADER_CLASSES.header}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
        <div className={PUBLIC_HEADER_CLASSES.container}>
          <div className={PUBLIC_HEADER_CLASSES.content}>
            <HeaderLogo />
            <nav className="hidden md:flex md:min-w-0 md:flex-1 md:justify-center">
              <MenuBar
                items={GLOW_MENU_HEADER_ITEMS}
                activeItem={getActiveMenuLabel(pathname)}
                className="py-0"
              />
            </nav>
            <HeaderActions
              user={user}
              isMobileMenuOpen={state.isMobileMenuOpen}
              onSearchClick={handleSearchIconClick}
              onMobileMenuToggle={toggleMobileMenu}
              onLoginClick={handleLoginClick}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={state.isMobileMenuOpen}
        user={user}
        onClose={closeMobileMenu}
        onLoginClick={handleLoginClick}
      />

      <SearchPanel
        isExpanded={state.isSearchExpanded}
        searchValue={state.searchValue}
        isSearchOpen={state.isSearchOpen}
        onSearchChange={handleSearchChange}
        onSearchFocus={handleSearchFocus}
        onSearchClose={handleSearchClose}
        onSearchSelect={handleSearchSelect}
      />
    </>
  );
});
