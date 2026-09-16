import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/* Design-system v2 — warm light identity */
const BG = "#faf8f4";
const ACCENT = "#4f46e5";
const BORDER = "#e8e2d6";

/**
 * Favicon — warm paper background, indigo "WA" mark. The rounded corners
 * match the site's radius tokens (border-radius: 16px at 64px).
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
          color: ACCENT,
          fontSize: 30,
          fontWeight: 500,
          fontFamily: "sans-serif",
          borderRadius: 16,
          border: `1px solid ${BORDER}`,
          letterSpacing: 1,
        }}
      >
        WA
      </div>
    ),
    size,
  );
}
