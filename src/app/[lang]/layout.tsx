import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import "../globals.css";
import { langTag, isLocale, isRtl, locales } from "@/lib/i18n";
import { contentFor } from "@/content";
import { enInsights, urInsights } from "@/content";
import * as siteEn from "@/content/en/site";
import * as siteUr from "@/content/ur/site";
import { LocaleProvider } from "@/components/locale-provider";
import { themeScript } from "@/components/theme-toggle";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TrackClicks } from "@/components/analytics";
import { Gtm } from "@/components/gtm";

/*
 * One typeface, every role.
 *
 * Valley Sans carries display, body, navigation, buttons, labels, figures and
 * form fields. The hierarchy is built from size, weight and space — not from a
 * second family, which is the discipline the brand guidelines ask for and also
 * the cheaper option: one payload, one set of metrics, no mismatched x-heights
 * between a heading and the paragraph under it.
 *
 * Valley Sans earns being the only face because it was drawn for editorial
 * across a warm, sturdy, modern-gothic model that reads clearly at interface
 * sizes and carries display weights without a separate file. The variable cut
 * interpolates weight instead of snapping between static instances, so the
 * steps in the type scale are real weights rather than rounded approximations.
 *
 * Valley Sans is Latin-script only. Urdu copy falls back to a strong Arabic
 * script stack (Noto Naskh Arabic first) before hitting system fonts — the
 * Latin names embedded in Urdu prose still render in Valley Sans, and the Urdu
 * itself runs in a properly letter-formed Arabic face.
 *
 * Self-hosted by next/font, so there is no render-blocking request to a font
 * CDN and no layout shift from a late swap.
 */
const valleySans = localFont({
  src: "../fonts/ValleySans-Variable.ttf",
  variable: "--font-valley",
  weight: "100 900",
  display: "swap",
  fallback: ["Noto Naskh Arabic", "Segoe UI", "system-ui", "sans-serif"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

/*
 * The `[lang]` segment is the root of every rendered route, so this layout
 * drives static generation for the two locales and is where the language layer
 * lives: the `<html lang dir>` attrs, the metadata base and the hreflang set.
 */
export function generateStaticParams() {
  return locales.map((l) => ({ lang: l }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  const mod = locale === "ur" ? siteUr : siteEn;
  const { site, metaDescription } = mod;
  const desc = metaDescription;
  const base = site.url;
  const root = locale === "en" ? `${base}/` : `${base}/${locale}/`;
  const urls = locales.reduce<Record<string, string>>((acc, l) => {
    acc[l] = l === "en" ? `${base}/` : `${base}/${l}/`;
    return acc;
  }, {});

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
    alternates: {
      canonical: root,
      languages: { ...urls, "x-default": urls.en },
    },
    openGraph: {
      type: "website",
      locale: locale === "ur" ? "ur_PK" : "en_US",
      url: root,
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

export default async function Layout({ children }: { children: React.ReactNode }) {
  const locale = await lang();
  if (!isLocale(locale)) notFound();
  const content = contentFor(locale);
  const insights = locale === "ur" ? urInsights : enInsights;

  return (
    <html
      lang={langTag(locale)}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      data-theme="light"
      className={valleySans.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <LocaleProvider
          locale={locale}
          content={content}
          insights={{
            insights: insights.insights,
            insightSlugs: insights.insightSlugs,
            insightsHub: insights.insightsHub,
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