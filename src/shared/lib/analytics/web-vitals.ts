import type { Metric } from "web-vitals";

/**
 * Отправляем метрики на /api/vitals (или в любую аналитику).
 * В dev-режиме выводим в консоль с цветовой индикацией.
 */
export function reportWebVitals(metric: Metric): void {
  if (process.env.NODE_ENV === "development") {
    const color =
      metric.rating === "good"
        ? "#22c55e"
        : metric.rating === "needs-improvement"
          ? "#f59e0b"
          : "#ef4444";

    console.log(
      `%c[Web Vitals] %c${metric.name}%c ${Math.round(metric.value)}ms — %c${metric.rating}`,
      "color:#6b7280;font-weight:bold",
      "color:#3b82f6;font-weight:bold",
      "color:inherit",
      `color:${color};font-weight:bold`
    );
  }

  // Отправка на собственный endpoint
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    url: window.location.pathname,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/vitals", body);
  } else {
    fetch("/api/vitals", {
      body,
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }).catch(() => {
      // игнорируем ошибки — аналитика не должна влиять на UX
    });
  }
}
