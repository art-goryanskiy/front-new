"use client";

import { memo, useCallback, useMemo } from "react";
import { Button, Tooltip } from "@heroui/react";
import { Icon } from "@/shared/ui/icons/icon";
import { SIDEBAR_CLASSES, ICON_SIZES } from "../constants/sidebar-constants";
import type { SidebarNavItemProps } from "../types/sidebar.types";

export const MobileSidebarNavItem = memo(function MobileSidebarNavItem({
  item,
  isActive,
  onNavigate,
}: Omit<SidebarNavItemProps, "isCollapsed">) {
  const handlePress = useCallback(() => {
    onNavigate(item.path);
  }, [onNavigate, item.path]);

  const buttonClasses = useMemo(
    () =>
      `${SIDEBAR_CLASSES.navItem.mobile.base} ${
        isActive
          ? SIDEBAR_CLASSES.navItem.mobile.active
          : SIDEBAR_CLASSES.navItem.mobile.inactive
      }`,
    [isActive]
  );

  const button = (
    <Button
      key={item.path}
      variant={isActive ? "solid" : "light"}
      color={isActive ? item.color : "default"}
      isIconOnly
      className={buttonClasses}
      onPress={handlePress}
      aria-label={item.label}
    >
      <Icon name={item.icon} size={ICON_SIZES.mobile} aria-hidden="true" />
    </Button>
  );

  return (
    <Tooltip
      key={item.path}
      content={item.label}
      placement="top"
      classNames={{
        content: SIDEBAR_CLASSES.tooltip.content,
      }}
    >
      {button}
    </Tooltip>
  );
});
