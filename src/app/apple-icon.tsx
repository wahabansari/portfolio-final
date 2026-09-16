import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const ACCENT_TOP = "#4f46e5";
const ACCENT_BOTTOM = "#3730a3";
const FG = "#ffffff";

/**
 * The iOS home-screen icon.
 *
 * iOS applies its own rounded mask, so this is a filled indigo-gradient square
 * with the brand glyph inset — the mark's tile IS the icon background here,
 * with the same gradient as the header mark scaled up. The single-stroke
 * "WA" ligature is drawn large enough to stay confident under the mask.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(180deg, ${ACCENT_TOP} 0%, ${ACCENT_BOTTOM} 100%)`,
        }}
      >
        <svg width={136} height={136} viewBox="0 0 40 40">
          <path
            d="M8 27 L11 12.5 14.6 20.5 20 8.5 25.4 20.5 29 12.5 32 27"
            fill="none"
            stroke={FG}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}