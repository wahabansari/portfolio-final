import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The rounded blue "W" mark from the nav wordmark. */
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
          background: "#2563eb",
          color: "#ffffff",
          fontSize: 40,
          fontWeight: 600,
          fontFamily: "sans-serif",
          borderRadius: 16,
        }}
      >
        W
      </div>
    ),
    size,
  );
}
