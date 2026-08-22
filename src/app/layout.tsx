import type { Metadata, Viewport } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import { metaDescription, site } from "@/content/site";
import { themeScript } from "@/components/theme-toggle";
import { SpeedInsights } from "@vercel/speed-insights/next";

/*
 * The real thing: Google Sans is published on Google Fonts, so next/font can
 * self-host it. Google pairs it with Google Sans Text for body copy, which is
 * not published — Google Sans covers both roles here.
 */
/*
 * The variable cut rather than static instances: it interpolates weights
 * instead of snapping between four files, and exposes the optical-size axis
 * that `font-optical-sizing: auto` needs to adjust letterforms by size.
 * GRAD lets weight be tuned without changing metrics, so nothing reflows.
 */
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  axes: ["GRAD", "opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: metaDescription,
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Muhammad Wahab Ansari",
    "Lahore",
    "Core Web Vitals",
    "Design Systems",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  /* Google Search Console ownership. Next emits this as
     <meta name="google-site-verification">. Leave it in place after
     verification — removing the tag un-verifies the property. */
  verification: { google: "T8_DkVEVl9u0RlU-zH6YWRQpyfT1GSUxbDXRxtI-lHQ" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#202124" },
  ],
};

/** Google Tag Manager container. */
const GTM_ID = "GTM-WW4JKXNG";

/**
 * Google Analytics 4. Runs alongside GTM: both define window.dataLayer, and
 * both snippets guard with `dataLayer || []`, so they coexist.
 *
 * Only safe while GA4 is NOT also configured as a tag inside the GTM
 * container — measuring the same property from both places double-counts
 * every pageview. Configure GA4 in one place or the other, never both.
 */
const GA_ID = "G-Y5V2MKFRJ6";

const gaScript = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`;

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={googleSans.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/*
          Google Tag Manager. GTM asks for this as high in the head as
          possible; in practice Next hoists its own metadata, preloads and
          stylesheet ahead of anything rendered here, so it lands near the end
          of the head. That is fine — everything before it is metadata and
          preload hints, the snippet only pushes to dataLayer, and gtm.js
          itself loads async, so the container never blocks rendering.

          Left as a raw tag rather than next/script: afterInteractive would
          hold it until hydration and lose the early pageview timing.
        */}
        <script dangerouslySetInnerHTML={{ __html: gtmScript }} />

        {/* Google tag (gtag.js) — GA4 */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: gaScript }} />
      </head>
      <body className="antialiased">
        {/* GTM fallback for no-JS clients. Must be the first thing in body. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <a
          href="#main"
          className="sr-only rounded-full focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-fg"
        >
          Skip to content
        </a>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
