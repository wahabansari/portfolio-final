import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/* Design-system v2 — warm light identity */
const BG = "#faf8f4";
const BORDER = "#e8e2d6";
const ACCENT_TOP = "#4f46e5";
const ACCENT_BOTTOM = "#3730a3";
const FG = "#ffffff";

/**
 * Favicon — warm paper rounded tile holding the brand mark: a single-stroke
 * "WA" ligature on a vertical indigo gradient. Mirrors BrandMark in the UI
 * so the tab icon, apple icon, OG card and header logo all read as one mark.
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
          borderRadius: 16,
          border: `1px solid ${BORDER}`,
        }}
      >
        <BrandTile size={52} />
      </div>
    ),
    size,
  );
}

function BrandTile({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <defs>
        <linearGradient id="brand-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT_TOP} />
          <stop offset="100%" stopColor={ACCENT_BOTTOM} />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#brand-g)" />
      <path
        d="M8 27 L11 12.5 14.6 20.5 20 8.5 25.4 20.5 29 12.5 32 27"
        fill="none"
        stroke={FG}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}