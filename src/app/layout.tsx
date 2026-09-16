import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { en } from "@/content";
import * as siteEn from "@/content/en/site";
import { LocaleProvider } from "@/components/locale-provider";
import { themeScript } from "@/components/theme-toggle";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TrackClicks } from "@/components/analytics";
import { Gtm } from "@/components/gtm";
import { Spotlight } from "@/components/spotlight";
import { buildSearchIndex } from "@/lib/search-index";
import { PageTransition } from "@/components/page-transition";

/*
 * Two voices, one hierarchy. Bricolage Grotesque display, Inter body.
 *
 * Bricolage is the variable display cut used for headings, overlines and
 * numerals: it carries an optical-size axis (opsz 12-96) that redraws the
 * letterforms for their size rather than scaling one drawing, plus a
 * continuous weight range (200-800). Hierarchy is weight + size, not a pile
 * of families.
 *
 * Inter is the neutral workhorse for everything read at length or clicked —
 * paragraphs, buttons, fields. One extra file, but layout-shift-free via
 * next/font self-hosting, and both stay well inside the font budget.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#14110d" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const { site, metaDescription } = siteEn;
  const desc = metaDescription;
  const base = site.url;

  return {
    metadataBase: new URL(base),
    title: {
      default: `${site.name} — ${site.role}`,
      template: `%s | ${site.name}`,
    },
    description: desc,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    alternates: { canonical: `${base}/` },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: `${base}/`,
      siteName: site.name,
      title: `${site.name} — ${site.role}`,
      description: desc,
      images: [
        {
          url: `${base}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.role}`,
      description: desc,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: { google: "T8_DkVEVl9u0RlU-zH6YWRQpyfT1GSUxbDXRxtI-lHQ" },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${bricolage.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
<LocaleProvider
          locale="en"
          content={{ site: en.site }}
        >
          <PageTransition>
            {children}
          </PageTransition>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:px-5 focus:py-3 focus:text-white"
          >
            Skip to content
          </a>
          <Gtm />
          <TrackClicks />
          <SpeedInsights />
          {/* Spotlight search — index built server-side, JSON-serialized in. */}
          <Spotlight entries={buildSearchIndex()} />
        </LocaleProvider>
      </body>
    </html>
  );
}