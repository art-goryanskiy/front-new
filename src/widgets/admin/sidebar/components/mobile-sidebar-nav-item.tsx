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

export const MobileSidebarNavItem = memo(
  function MobileSidebarNavItem({
    item,
    isActive,
    onNavigate,
  }: Omit<SidebarNavItemProps, "isCollapsed">) {
    const handleClick = useCallback(() => {
      onNavigate(item.path);
    }, [onNavigate, item.path]);

    const buttonClasses = useMemo(() => {
      const stateClass = isActive
        ? SIDEBAR_CLASSES.navItem.mobile.active
        : SIDEBAR_CLASSES.navItem.mobile.inactive;

      return `${SIDEBAR_CLASSES.navItem.mobile.base} ${stateClass}`;
    }, [isActive]);

    const iconClassName = useMemo(() => {
      return isActive ? "text-primary" : "text-muted-foreground";
    }, [isActive]);

    const button = (
      <Button
        key={item.path}
        variant="ghost"
        size="icon"
        className={buttonClasses}
        onClick={handleClick}
        aria-label={item.label}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon
          name={item.icon}
          size={ICON_SIZES.mobile}
          className={iconClassName}
          aria-hidden="true"
        />
      </Button>
    );

    return (
      <TooltipProvider key={item.path}>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="top">{item.label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);
