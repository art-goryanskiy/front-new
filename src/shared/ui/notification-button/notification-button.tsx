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
  animationKey = 0,
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
        <motion.span
          key={`glow-${animationKey}`}
          className={NOTIFICATION_BUTTON_CLASSES.glow}
          animate={
            animationKey > 0
              ? {
                  opacity: [0, 0.9, 0.25, 0],
                  scale: [0.8, 1.45, 1.15, 1],
                }
              : undefined
          }
          transition={{ duration: 0.65, ease: "easeOut" }}
        />
        <motion.div
          key={animationKey}
          animate={
            animationKey > 0
              ? {
                  rotate: [0, -16, 14, -10, 8, -5, 0],
                }
              : undefined
          }
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="origin-top"
        >
          <Bell
            className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5"
            size={iconSize}
          />
        </motion.div>
        {showBadge && (
          <motion.div
            key={`badge-${animationKey}-${count}`}
            animate={
              animationKey > 0
                ? {
                    scale: [1, 1.2, 1.05, 1],
                  }
                : undefined
            }
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <motion.div
              animate={
                count > 0
                  ? {
                      boxShadow: [
                        "0 0 0px rgba(239,68,68,0.0)",
                        "0 0 10px rgba(239,68,68,0.35)",
                        "0 0 0px rgba(239,68,68,0.0)",
                      ],
                    }
                  : undefined
              }
              transition={{
                duration: 2.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="rounded-full"
            >
              <Badge
                variant="destructive"
                className={NOTIFICATION_BUTTON_CLASSES.badge}
                id={badgeId}
                aria-label={`${count} уведомлений`}
              >
                {formattedCount}
              </Badge>
            </motion.div>
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
});
