import { NextRequest, NextResponse } from "next/server";

interface VitalPayload {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
  navigationType: string;
  url: string;
}

/**
 * POST /api/vitals
 *
 * Принимает Core Web Vitals от клиента.
 * Сейчас логирует на сервере — заменить на отправку
 * в свою аналитику (Clickhouse, Grafana, GA4 Measurement Protocol и др.)
 */
export async function POST(request: NextRequest) {
  try {
    const payload: VitalPayload = await request.json();

    // В production можно отправить в любую систему:
    // await sendToClickhouse(payload);
    // await sendToGrafanaLoki(payload);
    // await fetch('https://www.google-analytics.com/mp/collect', ...)

    if (process.env.NODE_ENV !== "production") {
      const emoji =
        payload.rating === "good"
          ? "✅"
          : payload.rating === "needs-improvement"
            ? "⚠️"
            : "🔴";
      console.log(
        `${emoji} [vitals] ${payload.name} ${Math.round(payload.value)}ms (${payload.rating}) — ${payload.url}`
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
