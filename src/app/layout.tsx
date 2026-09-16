import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { en, enInsights } from "@/content";
import * as siteEn from "@/content/en/site";
import { LocaleProvider } from "@/components/locale-provider";
import { themeScript } from "@/components/theme-toggle";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TrackClicks } from "@/components/analytics";
import { Gtm } from "@/components/gtm";

/*
 * One voice, one system. Bricolage Grotesque only.
 *
 * The variable cut, not a fixed weight list: it carries an optical-size
 * axis (opsz 12-96) that redraws the letterforms for their size rather than
 * scaling one drawing, plus a continuous weight range (200-800) that does
 * all the hierarchy work — a heavy 750-800 display, 550-600 for labels and
 * buttons, 400 for body. One font file, not four, still lands under the
 * brief's "avoid 6-8 weights" performance guidance.
 */
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d12" },
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
      className={bricolage.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <LocaleProvider
          locale="en"
          content={en}
          insights={{
            insights: enInsights.insights,
            insightSlugs: enInsights.insightSlugs,
            insightsHub: enInsights.insightsHub,
          }}
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:px-5 focus:py-3 focus:text-white"
          >
            Skip to content
          </a>
          {children}
          <Gtm />
          <TrackClicks />
          <SpeedInsights />
        </LocaleProvider>
      </body>
    </html>
  );
}