import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

const ACCENT = "#e04a1c"; /* vermilion 600 — fills */
const ACCENT_TEXT = "#b63b0f"; /* vermilion 700 — reads at 5.37:1 */
const INK = "#221e1a";
const MUTED = "#6f6961";
const CARDS = "#faf8f5";
/* The editorial palette, as a graphic stripe — vermilion draining into warm
   ink; the only place the range appears as a pure colour sweep. */
const BRAND_RULE = "linear-gradient(90deg, #e04a1c, #b63b0f, #f4f0e8, #221e1a)";

/**
 * Satori rasterises this card, and it needs real font data rather than a CSS
 * family name. Roboto is the typeface the site renders in (and the stand-in
 * the Google system prescribes for OG rasterisation — Google Sans breaks
 * Satori). Wrapped so a build without network access still succeeds on the
 * system sans rather than failing the whole build over a social image.
 */
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

/** Social card in the same light, measured Google language as the site. */
export default async function OpenGraphImage() {
  const [regular, medium] = await Promise.all([loadRoboto(400), loadRoboto(500)]);
  const fonts = [
    regular && { name: "Roboto", data: regular, weight: 400 as const, style: "normal" as const },
    medium && { name: "Roboto", data: medium, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 500; style: "normal" }[];
  const fontFamily = fonts.length ? "Roboto" : "sans-serif";

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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 8,
            background: BRAND_RULE,
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
              fontWeight: 500,
            }}
          >
            W
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 24, fontWeight: 500, color: INK }}>{site.name}</span>
            <span style={{ fontSize: 18, fontWeight: 400, color: MUTED }}>{site.role}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 60,
              fontWeight: 500,
              color: INK,
              letterSpacing: -1.2,
              lineHeight: 1.1,
            }}
          >
            I build production-grade web
          </span>
          <span
            style={{
              fontSize: 60,
              fontWeight: 500,
              color: INK,
              letterSpacing: -1.2,
              lineHeight: 1.1,
            }}
          >
            products that are fast, clear
          </span>
          <span
            style={{ fontSize: 60, fontWeight: 500, color: ACCENT_TEXT, letterSpacing: -1.2, lineHeight: 1.1 }}
          >
            and built to ship.
          </span>
          <span style={{ marginTop: 22, fontSize: 24, fontWeight: 400, color: MUTED }}>
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
                background: CARDS,
                borderRadius: 12,
              }}
            >
              <span
                style={{ fontSize: 32, fontWeight: 500, color: s.accent ? ACCENT_TEXT : INK }}
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