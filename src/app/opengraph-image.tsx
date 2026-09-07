import { ImageResponse } from "next/og";
import { brandConfig } from "@/config/brand";

export const alt = "Tricity Rides — outstation taxis and airport cabs from Chandigarh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Typographic brand card. No photography is used, since none exists yet. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brandConfig.colors.primary,
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              background: brandConfig.colors.accent,
              color: brandConfig.colors.text,
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            TR
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ffffff", fontSize: 38, fontWeight: 700 }}>
              {brandConfig.name}
            </span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 22 }}>
              {brandConfig.geography.label}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              color: "#ffffff",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            Reliable outstation cabs from Chandigarh Tricity
          </span>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 28, maxWidth: 900 }}>
            One-way &amp; round-trip · Airport transfers · Confirmed quote on WhatsApp
          </span>
        </div>

        <div
          style={{
            display: "flex",
            height: 10,
            width: 260,
            borderRadius: 999,
            background: brandConfig.colors.accent,
          }}
        />
      </div>
    ),
    size
  );
}
