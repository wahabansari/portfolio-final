import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { metaDescription, site } from "@/content/site";
import { themeScript } from "@/components/theme-toggle";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TrackClicks } from "@/components/analytics";
import { Gtm } from "@/components/gtm";

/*
 * One typeface, every role.
 *
 * Inter carries display, body, navigation, buttons, labels, figures and form
 * fields. The hierarchy is built from size, weight and space — not from a
 * second family, which is the discipline the brand guidelines ask for and
 * also the cheaper option: one payload, one set of metrics, no mismatched
 * x-heights between a heading and the paragraph under it.
 *
 * Inter earns being the only face because it was drawn for interfaces across
 * the whole range this site needs: an 11px uppercase label stays legible, and
 * the variable cut reaches 700+ for display sizes without a separate file. Its
 * tall x-height and even rhythm are what let body copy sit comfortably at
 * 16–17px, which is where nearly all of the words here live.
 *
 * The variable cut interpolates weight instead of snapping between static
 * instances, so the 450 and 650 steps in the type scale are real weights
 * rather than rounded approximations.
 *
 * Self-hosted by next/font, so there is no render-blocking request to a font
 * CDN and no layout shift from a late swap.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Muhammad Wahab Ansari — React & Next.js Product Engineer",
    /* The full legal name in the suffix. It costs a few characters against
       Google's ~60-character truncation, but it is the string that has to
       match LinkedIn, GitHub and the Person structured data for the entity to
       resolve to one person — and entity consolidation is worth more here
       than a few extra characters of page title surviving in the SERP. */
    template: `%s | ${site.name}`,
  },
  description: metaDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  /* Absolute, with the trailing slash, so the homepage self-canonicalises to
     exactly the URL it is served from. */
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: "Muhammad Wahab Ansari — React & Next.js Product Engineer",
    description: metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Wahab Ansari — React & Next.js Product Engineer",
    description: metaDescription,
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={inter.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
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
      </body>
    </html>
  );
}
