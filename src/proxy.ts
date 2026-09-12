import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * Language codes are messy at the edges, so a small alias table normalises
 * anything that looks like an attempt to spell one of the two supported
 * locales — `/eng`, `/urd`, `/urdu`, `/en-GB/…` — to the canonical prefix.
 * The goal is that no URL can be typed that leaves the app stuck on a
 * non-locale path: `/eng` and `/eng/about` land on `/en` and `/en/about`, not
 * on a 404.
 */
const LOCALE_ALIASES: Record<string, string> = {
  en: "en",
  "en-gb": "en",
  "en-us": "en",
  eng: "en",
  engl: "en",
  ur: "ur",
  "ur-pk": "ur",
  urd: "ur",
  urdu: "ur",
};

/**
 * Language negotiation for the two locale-prefixed paths.
 *
 * Everything renders under `/[lang]`; a request that arrives without the
 * prefix (or with an unknown locale) is steered to the best-supported locale:
 * an explicit `ur` preference (or any dialect that starts with `ur`, e.g.
 * `ur-PK`) → `/ur`, otherwise `/en`.
 *
 * Order relative to `next.config.ts`:
 *   headers → redirects (the legacy `serviceRedirects` table) → proxy.
 * The legacy 308s therefore resolve first; this proxy then prefixes the
 * already-redirected path with a locale, which is what the i18n guide
 * prescribes.
 *
 * Paths that must never be touched:
 *   - everything with a file extension (sitemap.xml, robots.txt, llms.txt,
 *     resume PDF, images, fonts) — excluded by the matcher,
 *   - `/api/*` route handlers and the no-extension metadata endpoints
 *     (`/icon`, `/apple-icon`, `/opengraph-image`) — excluded in code, since
 *     the matcher only filters `_next` and dotted paths.
 */
function pickLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language") ?? "";
  const prefs = accept
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .filter(Boolean);
  const urlike = prefs.find((p) => p === "ur" || p.startsWith("ur-"));
  return urlike ? "ur" : defaultLocale;
}

const SKIP_NO_EXT_PATHS = new Set([
  "/api",
  "/icon",
  "/apple-icon",
  "/opengraph-image",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const first = pathname.split("/")[1];
  if (!first || first === "") {
    // Root request — no locale yet.
    const url = request.nextUrl.clone();
    url.pathname = `/${pickLocale(request)}/`;
    return NextResponse.redirect(url, 308);
  }

  /* Normalise a locale-ish first segment to its canonical prefix. `/en` and
     `/ur` are already canonical (alias === first) and pass through. */
  const alias = LOCALE_ALIASES[first.toLowerCase()];
  if (alias) {
    if (alias === first.toLowerCase()) return;
    const url = request.nextUrl.clone();
    url.pathname = `/${alias}${pathname.slice(first.length + 1)}`;
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(first)) return; // canonical locale-prefixed path
  if (SKIP_NO_EXT_PATHS.has(`/${first}`)) return; // non-page endpoints

  // Everything else — an unprefixed page path — is steered to a locale.
  const url = request.nextUrl.clone();
  const locale = pickLocale(request);
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};