"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  PUBLIC_HEADER_CLASSES,
  PUBLIC_HEADER_ANIMATIONS,
  FLOATING_NAV_ITEMS,
} from "./constants/public-header-constants";
import { HeaderLogo } from "./components/header-logo";
import { HeaderActions } from "./components/header-actions";
import { MobileMenu } from "./components/mobile-menu";
import { SearchPanel } from "./components/search-panel";
import { usePublicHeaderState } from "./hooks/use-public-header-state";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/shared/ui/user-menu/user-menu";
import { HeaderNav } from "./components/header-nav";

export const PublicHeader = memo(function PublicHeader() {
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
        <div className={PUBLIC_HEADER_CLASSES.container}>
          <div className={PUBLIC_HEADER_CLASSES.content}>
            <HeaderLogo />
            <div
              className="hidden md:block md:min-w-0 md:flex-1"
              aria-hidden
            />
            <HeaderNav />
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
