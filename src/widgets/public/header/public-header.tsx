"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  PUBLIC_HEADER_CLASSES,
  PUBLIC_HEADER_ANIMATIONS,
} from "./constants/public-header-constants";
import { HeaderLogo } from "./components/header-logo";
import { DesktopNavigation } from "./components/desktop-navigation";
import { HeaderActions } from "./components/header-actions";
import { MobileMenu } from "./components/mobile-menu";
import { SearchPanel } from "./components/search-panel";
import { usePublicHeaderState } from "./hooks/use-public-header-state";

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
    handleMobileCategoryClick,
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
            <DesktopNavigation isMounted={state.isMounted} />
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
        onCategoryClick={handleMobileCategoryClick}
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
