"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/shared/ui/icons/icon";
import { memo, useCallback, useMemo } from "react";
import {
  ICON_SIZES,
  SIDEBAR_CLASSES,
} from "../constants/sidebar-constants";
import type { SidebarNavItemProps } from "../types/sidebar.types";

export const SidebarNavItem = memo(function SidebarNavItem({
  item,
  isActive,
  isCollapsed,
  onNavigate,
}: SidebarNavItemProps) {
  const handleClick = useCallback(() => {
    onNavigate(item.path);
  }, [onNavigate, item.path]);

  const buttonClasses = useMemo(() => {
    const sizeClass = isCollapsed
      ? SIDEBAR_CLASSES.navItem.collapsed
      : SIDEBAR_CLASSES.navItem.expanded;

    const stateClass = isActive
      ? SIDEBAR_CLASSES.navItem.active
      : SIDEBAR_CLASSES.navItem.inactive;

    return `${SIDEBAR_CLASSES.navItem.base} ${sizeClass} ${stateClass}`;
  }, [isCollapsed, isActive]);

  const iconClasses = useMemo(() => {
    if (isActive)
      return `${SIDEBAR_CLASSES.navItem.icon} ${SIDEBAR_CLASSES.navItem.iconActive}`;
    return `${SIDEBAR_CLASSES.navItem.icon} text-muted-foreground group-hover:text-foreground`;
  }, [isActive]);

  const button = (
    <Button
      key={item.path}
      variant="ghost"
      className={buttonClasses}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className={`mr-3 grid h-9 w-9 place-items-center rounded-lg border transition-colors ${
          isActive
            ? "border-primary/20 bg-primary/10"
            : "border-transparent group-hover:border-border/60"
        }`}
      >
        <Icon
          name={item.icon}
          className={iconClasses}
          size={ICON_SIZES.desktop}
          aria-label={item.label}
        />
      </span>

      {!isCollapsed && (
        <span className={SIDEBAR_CLASSES.navItem.label}>
          {item.label}
        </span>
      )}
    </Button>
  );

  return isCollapsed ? (
    <TooltipProvider key={item.path}>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    button
  );
});
