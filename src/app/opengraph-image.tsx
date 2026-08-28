import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

const ACCENT = "#2563eb";
const INK = "#0f172a";
const MUTED = "#475569";
const SOFT = "#64748b";
const BORDER = "#e2e8f0";
const SURFACE = "#f8fafc";
const SUCCESS = "#15803d";

/**
 * Satori rasterises this card, and it needs real font data rather than a CSS
 * family name. Inter is what the site sets its body copy in and it parses
 * cleanly here. Wrapped so a build without network access still succeeds on
 * the system sans rather than failing the whole build over a social image.
 */
async function loadInter(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());
    const url = /src:\s*url\((https:[^)]+)\)/.exec(css)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

/** Social card in the same ruled, evidence-led language as the site. */
export default async function OpenGraphImage() {
  const [regular, semibold] = await Promise.all([loadInter(400), loadInter(600)]);
  const fonts = [
    regular && { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
    semibold && { name: "Inter", data: semibold, weight: 600 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" }[];
  const fontFamily = fonts.length ? "Inter" : "sans-serif";

  /* The same proof strip the homepage carries — and the same numbers, so the
     card cannot make a claim the page does not support. */
  const stats = [
    { v: "5+", l: "Years in production" },
    { v: "7", l: "Live projects" },
    { v: "+30%", l: "Core Web Vitals", accent: true },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: 72,
          fontFamily,
        }}
      >
        {/* The accent rule along the top edge, as on every section overline. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 8,
            background: ACCENT,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: ACCENT,
              color: "#fff",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            W
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, fontWeight: 600, color: INK }}>{site.name}</span>
            <span style={{ fontSize: 18, color: SOFT, letterSpacing: 1.2 }}>
              {site.role.toUpperCase()}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 60,
              fontWeight: 600,
              color: INK,
              letterSpacing: -1.8,
              lineHeight: 1.08,
            }}
          >
            I build production-grade web
          </span>
          <span
            style={{
              fontSize: 60,
              fontWeight: 600,
              color: INK,
              letterSpacing: -1.8,
              lineHeight: 1.08,
            }}
          >
            products that are fast, clear
          </span>
          <span
            style={{
              fontSize: 60,
              fontWeight: 600,
              color: ACCENT,
              letterSpacing: -1.8,
              lineHeight: 1.08,
            }}
          >
            and built to ship.
          </span>
          <span style={{ marginTop: 22, fontSize: 24, color: MUTED }}>
            React · Next.js · TypeScript — {site.location}
          </span>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {stats.map((s) => (
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
                style={{ fontSize: 32, fontWeight: 600, color: s.accent ? SUCCESS : INK }}
              >
                {s.v}
              </span>
              <span style={{ fontSize: 18, color: MUTED }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) },
  );
}
