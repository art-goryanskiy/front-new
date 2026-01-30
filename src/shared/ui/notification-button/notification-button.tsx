"use client";

import { memo, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { NOTIFICATION_BUTTON_CLASSES } from "./constants/notification-button-constants";
import type { NotificationButtonProps } from "./types/notification-button.types";

const formatCount = (num: number): string => {
  if (num > 99) return "99+";
  return num.toString();
};

export const NotificationButton = memo(function NotificationButton({
  count = 0,
  onClick,
  size = "md",
  className,
}: NotificationButtonProps) {
  const iconSize = useMemo(
    () => (size === "sm" ? 16 : size === "md" ? 20 : 24),
    [size]
  );
  const showBadge = useMemo(() => count > 0, [count]);
  const formattedCount = useMemo(() => formatCount(count), [count]);
  const badgeId = useMemo(
    () => `notification-count-${count}`,
    [count]
  );

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={className}
    >
      <Button
        variant="ghost"
        size="icon"
        className={NOTIFICATION_BUTTON_CLASSES.button}
        onClick={handleClick}
        aria-label="Уведомления"
        aria-describedby={showBadge ? badgeId : undefined}
      >
        <Bell
          className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5"
          size={iconSize}
        />
        {showBadge && (
          <Badge
            variant="destructive"
            className={NOTIFICATION_BUTTON_CLASSES.badge}
            id={badgeId}
            aria-label={`${count} уведомлений`}
          >
            {formattedCount}
          </Badge>
        )}
      </Button>
    </motion.div>
  );
});
