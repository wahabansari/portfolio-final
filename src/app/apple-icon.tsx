import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * The iOS home-screen icon.
 *
 * Drawn separately from `icon.tsx` rather than letting the 64px favicon be
 * scaled up: iOS applies its own rounded mask, so this one is a filled square
 * with the mark inset from the edges. A transparent or already-rounded source
 * ends up with visible corners once the mask is applied.
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
          background: "#4f46e5",
          color: "#ffffff",
          fontSize: 92,
          fontWeight: 500,
          fontFamily: "sans-serif",
          letterSpacing: 3,
        }}
      >
        WA
      </div>
    ),
    size,
  );
}
