import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

/* Design-system v2 — warm light identity */
const BG = "#faf8f4";
const FG = "#1c1712";
const MUTED = "#5a5245";
const ACCENT = "#4f46e5";
const SURFACE = "#ffffff";
const BORDER = "#e8e2d6";

async function loadRoboto(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Roboto:wght@${weight}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());
    const url = /src:\s*url\((https:[^)]+)\)/.exec(css)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const [regular, medium] = await Promise.all([loadRoboto(400), loadRoboto(500)]);
  const fonts = [
    regular && { name: "Roboto", data: regular, weight: 400 as const, style: "normal" as const },
    medium && { name: "Roboto", data: medium, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 500; style: "normal" }[];
  const fontFamily = fonts.length ? "Roboto" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: 72,
          fontFamily,
        }}
      >
        {/* Subtle accent glow — top-right */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Top bar — name + role */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              background: ACCENT,
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            WA
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, fontWeight: 500, color: FG }}>{site.name}</span>
            <span style={{ fontSize: 18, fontWeight: 400, color: MUTED }}>{site.role}</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 58,
              fontWeight: 500,
              color: FG,
              letterSpacing: -1.6,
              lineHeight: 1.1,
            }}
          >
            I build production-grade web
          </span>
          <span
            style={{
              fontSize: 58,
              fontWeight: 500,
              color: FG,
              letterSpacing: -1.6,
              lineHeight: 1.1,
            }}
          >
            products that are fast, clear
          </span>
          <span
            style={{
              fontSize: 58,
              fontWeight: 500,
              color: ACCENT,
              letterSpacing: -1.6,
              lineHeight: 1.1,
            }}
          >
            and built to ship.
          </span>
          <span style={{ marginTop: 22, fontSize: 24, fontWeight: 400, color: MUTED }}>
            React · Next.js · TypeScript — {site.location}
          </span>
        </div>

        {/* Stats strip — light cards */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            { v: "5+", l: "Years in production" },
            { v: "30%", l: "Core Web Vitals improvement", accent: true },
            { v: "React · Next.js", l: "Primary stack" },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                padding: "18px 28px",
                background: SURFACE,
                border: `1px solid ${BORDER}`,
                borderRadius: 12,
              }}
            >
              <span
                style={{ fontSize: 32, fontWeight: 500, color: s.accent ? ACCENT : FG }}
              >
                {s.v}
              </span>
              <span style={{ fontSize: 18, fontWeight: 400, color: MUTED }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) },
  );
}
