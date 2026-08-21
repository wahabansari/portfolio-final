import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The rounded indigo "W" mark from the nav. */
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
          background: "#1a73e8",
          color: "#ffffff",
          fontSize: 42,
          fontWeight: 500,
          fontFamily: "sans-serif",
          borderRadius: 999,
        }}
      >
        W
      </div>
    ),
    size,
  );
}
