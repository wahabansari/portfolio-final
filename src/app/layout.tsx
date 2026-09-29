import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
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
 * One typeface, everywhere: Poppins. It is a static (non-variable) family,
 * so only the four weights the design uses are loaded — 400 body, 500 labels
 * and links, 600 headings and buttons, 700 the heaviest display moments.
 * Anything else in the CSS would silently snap to one of these, which is why
 * the scale in globals.css only names those four. Poppins is wide and
 * tall-set, so its scale runs looser than a grotesque's: less negative
 * tracking, taller line-heights, slightly smaller sizes.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
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
      data-theme="light"
      className={poppins.variable}
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