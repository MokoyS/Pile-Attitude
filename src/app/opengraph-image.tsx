import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "L'Atelier Pile-Attitude — Studio de Pilates sur machines à Chatou (78)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#aab8a5",
          padding: "64px 80px",
          position: "relative",
        }}
      >
        {/* Geometric accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "420px",
            height: "100%",
            backgroundColor: "#5f3b61",
            opacity: 0.15,
          }}
        />

        {/* Label */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: "14px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#ffffff",
            opacity: 0.7,
            marginBottom: "20px",
          }}
        >
          Studio de Pilates — Chatou (78)
        </div>

        {/* Main title */}
        <div
          style={{
            fontFamily: "serif",
            fontStyle: "italic",
            fontSize: "88px",
            lineHeight: 0.9,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: "28px",
          }}
        >
          L&apos;Atelier
          <br />
          Pile-Attitude
        </div>

        {/* Divider */}
        <div
          style={{
            width: "56px",
            height: "1px",
            backgroundColor: "#ffffff",
            opacity: 0.5,
            marginBottom: "24px",
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: "18px",
            color: "#ffffff",
            opacity: 0.85,
            letterSpacing: "0.02em",
          }}
        >
          Bienveillance · Plaisir · Progrès
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontFamily: "sans-serif",
            fontSize: "14px",
            color: "#ffffff",
            opacity: 0.5,
            letterSpacing: "0.05em",
          }}
        >
          atelier-pile-attitude.fr
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
