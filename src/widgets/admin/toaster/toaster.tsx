"use client";

import { useToastState } from "@/shared/store/toast-store";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useMemo } from "react";
import {
  TOASTER_ANIMATIONS,
  TOASTER_CLASSES,
  TOASTER_CONFIG,
  TOASTER_ICONS,
  getToastClasses,
} from "./constants/toaster-constants";

export const Toaster = memo(function Toaster() {
  const { toast, clearToast } = useToastState();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast();
      }, TOASTER_CONFIG.autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

  const toastClasses = useMemo(
    () => (toast ? getToastClasses(toast.type) : ""),
    [toast]
  );

  const toastIcon = useMemo(
    () => (toast ? TOASTER_ICONS[toast.type] : null),
    [toast]
  );

  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        {...TOASTER_ANIMATIONS}
        className={TOASTER_CLASSES.container}
      >
        <div className={toastClasses}>
          <div className={TOASTER_CLASSES.content}>
            <span className={TOASTER_CLASSES.icon}>{toastIcon}</span>
            <span className={TOASTER_CLASSES.message}>
              {toast.message}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});
