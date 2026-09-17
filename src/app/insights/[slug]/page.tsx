import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ArticleJsonLd } from "@/components/json-ld";
import { RelatedWork } from "@/components/work";
import { ServiceToc } from "@/components/service-toc";
import { PageEvent } from "@/components/analytics";
import { InsightCover } from "@/components/insights";
import {
 ArrowIcon,
 CtaBand,
 Definition,
 ExternalIcon,
 Faqs,
 PageHeader,
 Reveal,
 Section,
 SectionHeading,
} from "@/components/ui";
import { getInsight, insights, insightSlugs } from "@/content/insights";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
 return insightSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
 params,
}: {
 params: Promise<{ slug: string }>;
}): Promise<Metadata> {
 const { slug } = await params;
 const insight = getInsight(slug);
 if (!insight) return {};

 return pageMetadata({
   title: insight.metaTitle,
   description: insight.metaDescription,
   path: `/insights/${insight.slug}`,
   type: "article",
 });
}

function formatDate(iso: string) {
 return new Date(iso).toLocaleDateString("en-US", {
 year: "numeric",
 month: "long",
 day: "numeric",
 });
}

function readingTime(insight: { definition: string; intro: string[]; sections: { body: string[] }[] }): number {
 const words =
   insight.definition.split(/\s+/).length +
   insight.intro.reduce((n, p) => n + p.split(/\s+/).length, 0) +
   insight.sections.reduce(
     (n, s) => n + s.body.reduce((m, p) => m + p.split(/\s+/).length, 0),
     0,
   );
 return Math.max(1, Math.round(words / 250));
}

function slugify(text: string) {
 return text
   .toLowerCase()
   .replace(/[^a-z0-9]+/g, "-")
   .replace(/(^-|-$)/g, "");
}

/**
 * A pull quote — one line, already written elsewhere on the page (the dek,
 * which exists precisely to be quotable), set apart in large italic type on
 * a tinted field. Long-form technical writing reads as a wall of text
 * without a break like this partway through; a diagram would do the same
 * job if the content had one to show.
 */
function PullQuote({ children }: { children: string }) {
 return (
   <blockquote className="border-l-[3px] border-l-coral bg-coral-soft py-6 pl-7 pr-6 md:py-7 md:pl-8">
     <p className="font-display text-[1.375rem] leading-[1.4] font-medium tracking-[-0.01em] text-ink italic md:text-[1.5rem]">
       &ldquo;{children}&rdquo;
     </p>
   </blockquote>
 );
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params;
 const insight = getInsight(slug);
 if (!insight) notFound();

 const service = getService(insight.relatedServiceSlug);
 const index = insights.findIndex((i) => i.slug === insight.slug);
 const nextInsight = insights[(index + 1) % insights.length];

 const tocSections = insight.sections.map((s) => ({ id: slugify(s.heading), label: s.heading }));
 /* Sections alternate tone starting on "soft" (the Definition block right
    above is "plain", and two bands of the same fill are never allowed to
    touch). Whatever the last section lands on, the FAQ band that follows
    has to be the other one — computed rather than hardcoded, since the
    section count differs per article. */
 const lastSectionTone = (insight.sections.length - 1) % 2 === 0 ? "soft" : "plain";
 const faqTone = lastSectionTone === "soft" ? "plain" : "soft";

 return (
 <>
 <ArticleJsonLd insight={insight} />
 <PageEvent event="case_study_view" label={insight.slug} />
 <Nav />
 <main id="main">
 <PageHeader
 trail={[
 { label: "Home", href: "/" },
 { label: "Insights", href: "/insights" },
 { label: insight.title },
 ]}
 eyebrow={insight.cluster}
 title={insight.h1}
 lede={insight.dek}
 actions={
 service && (
 <>
 <Link
 href="/contact"
 data-track="cta_click"
 data-track-label={`insight:${insight.slug}`}
 className="ds-btn ds-btn-primary"
 >
 {insight.cta.primaryLabel}
 <ArrowIcon />
 </Link>
 <Link href={`/services/${service.slug}`} className="ds-btn ds-btn-secondary">
 See the related service
 </Link>
 </>
 )
 }
 />

 {/* The cover — real image treatment (large, full-width, its own visual
 moment) rather than a small panel squeezed beside the header text. */}
 <Section tone="plain">
 <Reveal>
 <InsightCover slug={insight.slug} className="aspect-[21/9] w-full md:aspect-[3/1]" />
 <div className="mt-5 flex flex-wrap items-center gap-3">
 <span className="ds-chip ds-chip-accent">{insight.cluster}</span>
 <span className="ds-meta">{formatDate(insight.publishedAt)}</span>
 <span className="ds-meta" aria-hidden="true">&middot;</span>
 <span className="ds-meta">{readingTime(insight)} min read</span>
 </div>
 </Reveal>

 {/* Answer-first. One quotable sentence before any explanation. */}
 <Reveal delay={0.05} className="mt-10">
 <div className="mx-auto max-w-[70ch]">
 <Definition term="In one sentence">{insight.definition}</Definition>
 </div>
 </Reveal>
 <Reveal delay={0.08} className="mt-10">
 <div className="mx-auto max-w-[70ch] space-y-5">
 {insight.intro.map((p) => (
 <p key={p} className="ds-body-lg">
 {p}
 </p>
 ))}
 </div>
 </Reveal>
 </Section>

 {tocSections.length > 1 && <ServiceToc sections={tocSections} />}

 {insight.sections.map((section, i) => {
 const tone = i % 2 === 0 ? "soft" : "plain";
 return (
 <Section key={section.heading} id={slugify(section.heading)} tone={tone}>
 <div className="mx-auto max-w-[70ch]">
 <Reveal delay={i * 0.03}>
 <div className="flex items-start gap-5">
 <span className="shrink-0 font-display text-[2.25rem] font-bold leading-[0.9] tracking-[-0.03em] text-accent tabular-nums md:text-[2.75rem]">
 {String(i + 1).padStart(2, "0")}
 </span>
 <div className="flex-1 pt-1">
 <h2 className="font-display text-[1.625rem] font-bold leading-[1.2] tracking-[-0.02em] text-fg md:text-[1.875rem]">
 {section.heading}
 </h2>
 <span aria-hidden className="mt-4 block h-[3px] w-16 bg-accent" />
 </div>
 </div>
 <div className="mt-8 space-y-5 md:pl-[4.25rem]">
 {section.body.map((p) => (
 <p key={p} className="ds-body-lg">
 {p}
 </p>
 ))}
 </div>
 </Reveal>
 {i === 0 && (
 <Reveal delay={0.1} className="mt-10">
 <PullQuote>{insight.dek}</PullQuote>
 </Reveal>
 )}
 </div>
 </Section>
 );
 })}

{insight.faqs && insight.faqs.length > 0 && (
  <Section id="faq" tone={faqTone}>
  <SectionHeading overline="Questions" title="Common questions" />
  <Reveal>
  <Faqs faqs={insight.faqs} className="mx-auto max-w-4xl" />
  </Reveal>
  </Section>
  )}

 {insight.references && insight.references.length > 0 && (
  <Section tone="plain">
 <SectionHeading
 overline="Sources"
 title="Primary sources"
 description="The authority behind the claims above. Each link goes to the primary documentation the article draws on."
 />
 <ul className="border-t border-border">
 {insight.references.map((ref) => (
 <li key={ref.url}>
 <a
 href={ref.url}
 target="_blank"
 rel="noopener noreferrer"
 className="group flex items-center justify-between gap-4 border-b border-border py-4 transition-colors hover:bg-surface"
 >
 <span className="ds-body font-medium text-ink">{ref.label}</span>
 <ExternalIcon className="shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
 </a>
 </li>
 ))}
 </ul>
 <p className="ds-body-sm mt-6 text-ink-muted">
 Where this article reports a result, the case study linked under &ldquo;Where this
 has been done&rdquo; is the primary record for it — these sources cover the
 under the related framework and methodology.
 </p>
 </Section>
 )}

 {insight.relatedCaseStudySlugs.length > 0 && (
 <RelatedWork
 tone="soft"
 slugs={insight.relatedCaseStudySlugs}
 heading="Where this has been done"
 description="Production work behind the approach described above."
 />
 )}

<CtaBand
  navy
  tone="plain"
  heading={insight.cta.heading}
 body={insight.cta.body}
 primary={{ label: insight.cta.primaryLabel, href: "/contact" }}
 secondary={service ? { label: service.title, href: `/services/${service.slug}` } : undefined}
 />

 <Section tone="soft" bordered>
 <Reveal>
 <Link
 href={`/insights/${nextInsight.slug}`}
 className="group flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
 >
 <div>
 <p className="ds-meta">Next insight</p>
 <p className="ds-h3 mt-3 transition-colors group-hover:text-accent">
 {nextInsight.title}
 </p>
 <p className="ds-body-sm mt-2 max-w-xl">{nextInsight.dek}</p>
 </div>
 <span
 aria-hidden
 className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-ink-soft transition-[border-color,color,translate] duration-200 group-hover:translate-x-0.5 group-hover:border-accent group-hover:text-accent"
 >
 <ArrowIcon />
 </span>
 </Link>
 </Reveal>
 </Section>
 </main>
 <Footer />
 </>
 );
}
