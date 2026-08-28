import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * One builder for every page's metadata.
 *
 * The point is that canonical, Open Graph URL and the page's own route can
 * never drift apart, because all three are derived from the same `path`. A
 * canonical that disagrees with the URL it sits on is the most common way a
 * JavaScript site confuses its own indexing, and it is entirely avoidable.
 *
 * `alternates.canonical` is resolved against `metadataBase` (set in the root
 * layout), so it is emitted as an absolute URL in the initial HTML rather than
 * being rewritten on the client.
 *
 * There is deliberately no `keywords` field. The meta keywords tag has had no
 * role in Google Search for many years, and adding one signals a site written
 * for crawlers rather than readers.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
}: {
  /** The <title>. The root layout appends the name via its template. */
  title: string;
  description: string;
  /** Route path, with a leading slash. "/" for the homepage. */
  path: string;
  type?: "website" | "article" | "profile";
  /**
   * Skip the layout's title template. Set this when the title already names
   * the person — otherwise the template appends the name a second time and
   * the <title> reads "About Wahab Ansari | ... | Wahab Ansari".
   */
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: type === "profile" ? "profile" : type,
      url: path,
      title,
      description,
      siteName: site.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
