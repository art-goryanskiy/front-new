"use client";

import { useLogout } from "@/features/auth/api/use-logout";
import { useIsMobile } from "@/shared/lib/hooks/use-is-mobile";
import { useKeyboardShortcut } from "@/shared/lib/hooks/use-keyboard-shortcut";
import { useAuthUser } from "@/shared/store/auth-store";
import { useSearchState } from "@/shared/store/search-store";
import { NotificationButton } from "@/shared/ui/notification-button/notification-button";
import { SEARCH_INPUT_TEXTS } from "@/shared/ui/search-input/constants/search-input-constants";
import { SearchInput } from "@/shared/ui/search-input/search-input";
import { ThemeToggle } from "@/shared/ui/theme-toggle/theme-toggle";
import { UserMenu } from "@/shared/ui/user-menu/user-menu";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import {
  HEADER_ANIMATIONS,
  HEADER_CLASSES,
} from "./constants/header-constants";

export const Header = memo(function Header() {
  const user = useAuthUser();
  const { logout } = useLogout();
  const router = useRouter();
  const pathname = usePathname();
  const {
    searchQuery,
    setSearchQuery,
    openCommandPalette,
    setSearchOriginPath,
    isCommandPaletteOpen,
  } = useSearchState();
  const isMobile = useIsMobile();

  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/login");
  }, [logout, router]);

  const handleOpenCommandPalette = useCallback(() => {
    if (pathname) {
      setSearchOriginPath(pathname);
    }
    openCommandPalette();
  }, [pathname, setSearchOriginPath, openCommandPalette]);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      if (value.length > 0 && !isCommandPaletteOpen) {
        handleOpenCommandPalette();
      }
    },
    [setSearchQuery, isCommandPaletteOpen, handleOpenCommandPalette]
  );

  const placeholder = useMemo(
    () =>
      isMobile
        ? SEARCH_INPUT_TEXTS.defaultPlaceholder
        : SEARCH_INPUT_TEXTS.adminPlaceholder,
    [isMobile]
  );

  const notificationSize = useMemo(
    () => (isMobile ? "sm" : "md"),
    [isMobile]
  );

  useKeyboardShortcut({
    key: "k",
    metaKey: true,
    onPress: handleOpenCommandPalette,
  });

  return (
    <motion.header
      {...HEADER_ANIMATIONS.header}
      className={HEADER_CLASSES.header}
    >
      <div className={HEADER_CLASSES.container}>
        <div className={HEADER_CLASSES.content}>
          <div className={HEADER_CLASSES.searchWrapper}>
            <SearchInput
              value={searchQuery}
              onValueChange={handleSearchChange}
              placeholder={placeholder}
              onFocus={handleOpenCommandPalette}
              showKeyboardHint={true}
            />
          </div>

          <div className={HEADER_CLASSES.actions}>
            <ThemeToggle />
            <NotificationButton count={3} size={notificationSize} />
            <UserMenu
              user={user}
              onLogout={handleLogout}
              role="Администратор"
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
});
