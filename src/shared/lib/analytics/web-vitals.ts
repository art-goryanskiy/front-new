import type { Metric } from "web-vitals";

const METRIKA_ID = 106976069;

type YmFn = (id: number, action: string, ...args: unknown[]) => void;

function getYm(): YmFn | undefined {
  return (window as Window & { ym?: YmFn }).ym;
}

/**
 * Отправляем метрики на /api/vitals и в Яндекс.Метрику.
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

  // Отправка в Яндекс.Метрику через параметры визита
  const ym = getYm();
  if (typeof ym === "function") {
    ym(METRIKA_ID, "params", {
      webVitals: {
        [metric.name]: {
          value: Math.round(metric.value),
          rating: metric.rating,
        },
      },
    });
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
