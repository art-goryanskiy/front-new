"use client";

import { useEffect } from "react";
import { reportWebVitals } from "@/shared/lib/analytics/web-vitals";

/**
 * Компонент монтируется один раз и подписывается на все Core Web Vitals.
 * Не рендерит ничего в DOM.
 */
export function WebVitalsReporter() {
  useEffect(() => {
    import("web-vitals").then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
      onINP(reportWebVitals);
    });
  }, []);

  return null;
}
