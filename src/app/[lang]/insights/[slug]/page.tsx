import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ArticleJsonLd } from "@/components/json-ld";
import { RelatedWork } from "@/components/work";
import { PageEvent } from "@/components/analytics";
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

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params;
 const insight = getInsight(slug);
 if (!insight) notFound();

 const service = getService(insight.relatedServiceSlug);
 const index = insights.findIndex((i) => i.slug === insight.slug);
 const nextInsight = insights[(index + 1) % insights.length];

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
 aside={
 <div className="h-full border-t border-border">
 <p className="ds-meta">Published</p>
 <p className="ds-body-sm mt-3">
 <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>
 </p>
 {insight.updatedAt !== insight.publishedAt && (
 <div className="mt-5 border-t border-border pt-5">
 <p className="ds-meta">Last updated</p>
 <p className="ds-body-sm mt-3">
 <time dateTime={insight.updatedAt}>{formatDate(insight.updatedAt)}</time>
 </p>
 </div>
 )}
 </div>
 }
 />

 {/* Answer-first. One quotable sentence before any explanation. */}
 <Section tone="plain">
 <Reveal>
 <Definition term="In one sentence">{insight.definition}</Definition>
 </Reveal>
 <Reveal delay={0.05} className=" mt-10 space-y-5">
 {insight.intro.map((p) => (
 <p key={p} className="ds-body">
 {p}
 </p>
 ))}
 </Reveal>
 </Section>

 <Section tone="soft">
 <div className=" space-y-12">
 {insight.sections.map((section, i) => (
 <Reveal key={section.heading} delay={i * 0.03}>
 <h2 className="ds-h3">{section.heading}</h2>
 <div className="mt-4 space-y-4">
 {section.body.map((p) => (
 <p key={p} className="ds-body">
 {p}
 </p>
 ))}
 </div>
 </Reveal>
 ))}
 </div>
 </Section>

 {insight.faqs && insight.faqs.length > 0 && (
 <Section id="faq" tone="plain">
 <SectionHeading overline="Questions" title="Common questions" />
 <Reveal>
 <Faqs faqs={insight.faqs} className="mx-auto max-w-4xl" />
 </Reveal>
 </Section>
 )}

 {insight.references && insight.references.length > 0 && (
 <Section tone="soft" bordered>
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
 <span className="text-[0.9375rem] font-medium text-ink">{ref.label}</span>
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
