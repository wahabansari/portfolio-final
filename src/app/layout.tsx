import type { Metadata, Viewport } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import { en, enInsights } from "@/content";
import * as siteEn from "@/content/en/site";
import { LocaleProvider } from "@/components/locale-provider";
import { themeScript } from "@/components/theme-toggle";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TrackClicks } from "@/components/analytics";
import { Gtm } from "@/components/gtm";

/*
 * One typeface, every role.
 *
 * Google Sans — the house typeface, listed on Google Fonts and self-hosted
 * through next/font — carries display, body, navigation, buttons, labels,
 * figures and form fields. The hierarchy is built from size, weight and space
 * (headings 500, sitting light), which is Google's measured approach and also
 * the cheap option: one payload, one set of metrics, no mismatched x-heights
 * between a heading and the paragraph under it.
 *
 * Downloaded once at build and self-hosted by next/font, so there is no
 * render-blocking request to a font CDN and no layout shift from a late swap.
 * (Satori breaks on Google Sans, so the OG card deliberately rasterises with
 * Roboto instead.)
 */
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#202124" },
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
    /* Google Search Console ownership. Next emits this as
       <meta name="google-site-verification">. Leave it in place after
       verification — removing the tag un-verifies the property. */
    verification: { google: "T8_DkVEVl9u0RlU-zH6YWRQpyfT1GSUxbDXRxtI-lHQ" },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="light"
      className={googleSans.variable}
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
            className="sr-only rounded-full focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-fg"
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