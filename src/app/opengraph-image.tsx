import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ООО ЦОК СТАНДАРТ ПЛЮС — Профессиональное обучение";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(59,130,246,0.15)",
          border: "1px solid rgba(59,130,246,0.4)",
          borderRadius: "100px",
          padding: "6px 20px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#3b82f6",
          }}
        />
        <span
          style={{
            color: "#93c5fd",
            fontSize: "18px",
            letterSpacing: "0.05em",
            fontWeight: 500,
          }}
        >
          Центр обучения и консультирования
        </span>
      </div>

      {/* Main title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          marginBottom: "32px",
        }}
      >
        <span
          style={{
            color: "#f1f5f9",
            fontSize: "52px",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          ООО ЦОК СТАНДАРТ ПЛЮС
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          color: "#94a3b8",
          fontSize: "24px",
          textAlign: "center",
          maxWidth: "780px",
          lineHeight: 1.5,
        }}
      >
        Повышение квалификации · Профессиональная переподготовка ·
        Охрана труда
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          height: "4px",
          background:
            "linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6)",
        }}
      />
    </div>,
    size
  );
}
