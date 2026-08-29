import type { Metadata, Viewport } from "next";
import { Google_Sans, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import { metaDescription, site } from "@/content/site";
import { themeScript } from "@/components/theme-toggle";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TrackClicks } from "@/components/analytics";

/*
 * One superfamily, two cuts.
 *
 *   Google Sans      — display and body both. It is a humanist geometric with
 *     a tall x-height, so it stays readable at 15px and stays open at 68px;
 *     one family across both roles is why the headings and the paragraphs
 *     under them look related rather than merely adjacent.
 *   Google Sans Code — overlines, figures and metadata. Taking the mono from
 *     the same superfamily rather than pairing in an unrelated one (JetBrains,
 *     IBM Plex) keeps the labels looking like part of the system instead of
 *     something imported for effect.
 *
 * The variable cut rather than static instances: it interpolates weights
 * instead of snapping between four files, and exposes the optical-size axis
 * that `font-optical-sizing: auto` needs in order to adjust the letterforms by
 * size — the same drawing scaled to both 68px and 13px is what makes display
 * type look loose and small type look cramped. GRAD lets weight be tuned
 * without changing metrics, so nothing reflows.
 *
 * Both are self-hosted by next/font, so there is no render-blocking request to
 * a font CDN and no layout shift from a late swap.
 */
/* Next has no metric table for either family, so it cannot synthesise a
   metrically-matched fallback and says so at build time. Naming Roboto
   explicitly is the next best thing: it shares this face's lineage and
   proportions, so the reflow when the real font swaps in is small rather
   than the jump a generic sans would cause. */
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  axes: ["GRAD", "opsz"],
  display: "swap",
  fallback: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

const googleSansCode = Google_Sans_Code({
  variable: "--font-google-sans-code",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Frontend Product Engineer | React & Next.js | Wahab Ansari",
    /* The short name in the suffix, not the full one. Google truncates titles
       around 60 characters, and nine characters of brand is nine characters
       of the actual page title that survives. */
    template: `%s | ${site.shortName}`,
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
    title: "Frontend Product Engineer | React & Next.js | Wahab Ansari",
    description: metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontend Product Engineer | React & Next.js | Wahab Ansari",
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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${googleSans.variable} ${googleSansCode.variable}`}
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
        <TrackClicks />
        <SpeedInsights />
      </body>
    </html>
  );
}
