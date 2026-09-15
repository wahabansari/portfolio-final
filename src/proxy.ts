import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * English-only site.
 *
 * The previous build was bilingual under `/[lang]` (`/en/…`, `/ur/…`) with an
 * alias table normalising dialect spellings (`/eng`, `/urd`, `/en-GB`, …).
 * Those prefixes are now legacy: this site lives at the root, so any request
 * whose first segment looks like an old locale is stripped to its canonical
 * English path with a 308 — `/ur/work` and `/eng/about` both land on `/work`
 * and `/about` instead of a 404. Everything unprefixed passes straight through.
 *
 * Order relative to `next.config.ts`: headers → redirects → proxy. The legacy
 * service 308s resolve first; this proxy drops the language prefix.
 *
 * Paths that must never be touched:
 *   - everything with a file extension (sitemap.xml, robots.txt, llms.txt,
 *     resume PDF, images, fonts) — excluded by the matcher,
 *   - `/api/*` route handlers and the no-extension metadata endpoints
 *     (`/icon`, `/apple-icon`, `/opengraph-image`) — excluded in code, since
 *     the matcher only filters `_next` and dotted paths.
 */
const LOCALE_STRIP = new Set([
  "en",
  "eng",
  "engl",
  "en-gb",
  "en-us",
  "ur",
  "urd",
  "urdu",
  "ur-pk",
]);

const SKIP_NO_EXT_PATHS = new Set([
  "/api",
  "/icon",
  "/apple-icon",
  "/opengraph-image",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const first = pathname.split("/")[1];
  if (!first) return; // root request — serve the home page directly

  if (LOCALE_STRIP.has(first.toLowerCase())) {
    const url = request.nextUrl.clone();
    const rest = pathname.slice(first.length + 1);
    url.pathname = rest === "" ? "/" : rest;
    return NextResponse.redirect(url, 308);
  }

  if (SKIP_NO_EXT_PATHS.has(`/${first}`)) return; // non-page endpoints
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};