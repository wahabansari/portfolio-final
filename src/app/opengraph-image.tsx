import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

const ACCENT = "#1a73e8";
const TEXT = "#202124";
const MUTED = "#5f6368";
const BORDER = "#dadce0";

/**
 * The page itself is set in Google Sans, but Satori (which rasterises this
 * card) cannot parse that font's OpenType tables — it throws on GSUB
 * lookupType 7. Roboto is Google's other open face and renders cleanly here.
 * Wrapped so a build without network still succeeds on the system sans.
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

/** Social card in the same light, ruled language as the site. */
export default async function OpenGraphImage() {
  const [regular, semibold] = await Promise.all([loadRoboto(400), loadRoboto(600)]);
  const fonts = [
    regular && { name: "Roboto", data: regular, weight: 400 as const, style: "normal" as const },
    semibold && { name: "Roboto", data: semibold, weight: 600 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" }[];
  const fontFamily = fonts.length ? "Roboto" : "sans-serif";
  const stats = [
    { v: "5+", l: "Years experience" },
    { v: "+30%", l: "Core Web Vitals", accent: true },
    { v: "5", l: "Platforms shipped" },
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 999,
              background: ACCENT,
              color: "#fff",
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            W
          </div>
          <span style={{ fontSize: 26, fontWeight: 600, color: TEXT }}>{site.shortName}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 64, fontWeight: 400, color: TEXT, letterSpacing: -1.2, lineHeight: 1.1 }}>
            Frontend engineer building
          </span>
          <span style={{ fontSize: 64, fontWeight: 400, color: ACCENT, letterSpacing: -1.2, lineHeight: 1.1 }}>
            fast, accessible web apps.
          </span>
          <span style={{ marginTop: 24, fontSize: 26, color: MUTED }}>
            React · Next.js · TypeScript · {site.location}
          </span>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {stats.map((s) => (
            <div
              key={s.l}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: "20px 28px",
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
              }}
            >
              <span style={{ fontSize: 34, fontWeight: 400, color: s.accent ? ACCENT : TEXT }}>
                {s.v}
              </span>
              <span style={{ fontSize: 19, color: MUTED }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, ...(fonts.length ? { fonts } : {}) },
  );
}
