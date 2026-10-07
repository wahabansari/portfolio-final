import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ArticleJsonLd } from "@/components/json-ld";
import { RelatedWork } from "@/components/work";
import { ServiceToc } from "@/components/service-toc";
import { PageEvent } from "@/components/analytics";
import { ImagePlaceholder, formatDate, readingTime } from "@/components/insights";
import {
  ArrowIcon,
  Breadcrumbs,
  CtaBand,
  Definition,
  ExternalIcon,
  Faqs,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui";
import { getInsight, insights, insightSlugs } from "@/content/insights";
import { getService } from "@/content/services";
import { founder } from "@/content/site";
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

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * A pull quote: one line already written elsewhere on the page (the dek, which
 * exists precisely to be quotable), set apart in larger italic type. Long-form
 * technical writing reads as a wall of text without a break like this.
 */
function PullQuote({ children }: { children: string }) {
  return (
    <blockquote className="rounded-r-2xl border-l-[3px] border-l-accent-deep bg-accent-soft py-6 pr-6 pl-7 md:py-7 md:pl-8">
      <p className="text-[1.3125rem] leading-[1.45] font-medium tracking-[-0.015em] text-ink italic md:text-[1.4375rem]">
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
  const prevInsight = insights[(index - 1 + insights.length) % insights.length];
  const nextInsight = insights[(index + 1) % insights.length];

  const tocSections = insight.sections.map((s) => ({ id: slugify(s.heading), label: s.heading }));

  /* Bands after the article body alternate; which of them exist depends on the
     article, so the tones are derived rather than hard-coded. */
  type Tone = "plain" | "soft";
  const hasFaqs = Boolean(insight.faqs && insight.faqs.length > 0);
  const hasRefs = Boolean(insight.references && insight.references.length > 0);
  const hasRelated = insight.relatedCaseStudySlugs.length > 0;
  /* The body is "plain"; each band that is present flips the tone from the one
     before it. Counting the bands that came earlier gives each one's tone. */
  const toneAfter = (bands: number): Tone => (bands % 2 === 0 ? "plain" : "soft");
  const faqBand = hasFaqs ? 1 : 0;
  const refsBand = faqBand + (hasRefs ? 1 : 0);
  const relatedBand = refsBand + (hasRelated ? 1 : 0);
  const faqTone = toneAfter(faqBand);
  const refsTone = toneAfter(refsBand);
  const relatedTone = toneAfter(relatedBand);
  const ctaTone = toneAfter(relatedBand + 1);
  const footerTone = toneAfter(relatedBand + 2);

  return (
    <>
      <ArticleJsonLd insight={insight} />
      <PageEvent event="case_study_view" label={insight.slug} />
      <Nav />
      <main id="main">
        <section className="hero-aurora border-b border-border pt-28 pb-12 md:pt-32 md:pb-16">
          <div className="ds-container">
            <Breadcrumbs
              trail={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/insights" },
                { label: insight.title },
              ]}
            />

            <div className="mt-8 max-w-3xl">
              <Reveal>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.75rem] font-semibold tracking-[0.04em] text-accent uppercase">
                    {insight.cluster}
                  </span>
                  <time dateTime={insight.updatedAt} className="ds-meta normal-case">
                    Updated {formatDate(insight.updatedAt)}
                  </time>
                  <span className="ds-meta" aria-hidden="true">
                    &middot;
                  </span>
                  <span className="ds-meta normal-case">{readingTime(insight)} min read</span>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="display mt-5 text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold">{insight.h1}</h1>
                <p className="body-large mt-5 max-w-2xl">{insight.dek}</p>
                <p className="ds-body-sm mt-5">
                  By <span className="font-semibold text-fg">{founder.name}</span> &middot; {founder.role}
                </p>
              </Reveal>
              {service && (
                <Reveal delay={0.12}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
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
                  </div>
                </Reveal>
              )}
            </div>

            <Reveal delay={0.16} className="mt-10">
              <ImagePlaceholder className="aspect-[21/9] w-full" />
            </Reveal>
          </div>
        </section>

        {/* Phone and tablet: the sticky chip row. Desktop gets the rail. */}
        {tocSections.length > 1 && <ServiceToc sections={tocSections} className="lg:hidden" />}

        <Section tone="plain">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Desktop rail: where you are in the article, and the next step. */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28 space-y-5">
                {tocSections.length > 1 && (
                  <nav aria-label="In this article" className="rounded-3xl border border-border-subtle p-5">
                    <p className="ds-meta">In this article</p>
                    <ol className="mt-4 space-y-1">
                      {tocSections.map((section, i) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            className="flex gap-3 rounded-lg px-2 py-1.5 text-[0.875rem] leading-snug font-medium text-fg-muted transition-colors hover:bg-accent-soft hover:text-accent"
                          >
                            <span className="text-fg-subtle tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                            {section.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
                {service && (
                  <div className="rounded-3xl border border-border bg-surface p-5">
                    <p className="ds-meta">Related service</p>
                    <p className="ds-title-sm mt-3">{service.title}</p>
                    <Link href={`/services/${service.slug}`} className="ds-link mt-4 text-[0.875rem]">
                      Learn more
                      <ArrowIcon className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            </aside>

            <article className="min-w-0 lg:col-span-9">
              <div className="max-w-[70ch]">
                {/* Answer-first. One quotable sentence before any explanation. */}
                <Reveal>
                  <Definition term="In one sentence">{insight.definition}</Definition>
                </Reveal>
                <Reveal delay={0.05} className="mt-8 space-y-5">
                  {insight.intro.map((p) => (
                    <p key={p} className="ds-body-lg">
                      {p}
                    </p>
                  ))}
                </Reveal>

                <div className="mt-14 space-y-14">
                  {insight.sections.map((section, i) => (
                    <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-28">
                      <Reveal>
                        <div className="flex items-start gap-4 border-t border-border pt-6">
                          <span className="shrink-0 pt-1 text-[1.125rem] font-bold text-accent tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h2 className="text-[1.5rem] leading-[1.25] font-bold tracking-[-0.02em] text-fg md:text-[1.75rem]">
                            {section.heading}
                          </h2>
                        </div>
                        <div className="mt-6 space-y-5 md:pl-9">
                          {section.body.map((p) => (
                            <p key={p} className="ds-body-lg">
                              {p}
                            </p>
                          ))}
                        </div>
                      </Reveal>
                      {i === 0 && (
                        <Reveal delay={0.1} className="mt-8 md:pl-9">
                          <PullQuote>{insight.dek}</PullQuote>
                        </Reveal>
                      )}
                    </section>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </Section>

        {hasFaqs && insight.faqs && (
          <Section id="faq" tone={faqTone}>
            <SectionHeading overline="Questions" title="Common questions" />
            <Reveal>
              <Faqs faqs={insight.faqs} className="mx-auto max-w-4xl" />
            </Reveal>
          </Section>
        )}

        {hasRefs && insight.references && (
          <Section tone={refsTone}>
            <SectionHeading
              overline="Sources"
              title="Primary sources"
              description="The authority behind the claims above. Each link goes to the primary documentation the article draws on."
            />
            <ul className="mx-auto max-w-4xl border-b border-border">
              {insight.references.map((ref) => (
                <li key={ref.url} className="border-t border-border">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-3 flex items-center justify-between gap-4 rounded-xl px-3 py-4 transition-colors hover:bg-accent-soft"
                  >
                    <span className="ds-body font-medium text-ink">{ref.label}</span>
                    <ExternalIcon className="shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="ds-body-sm mx-auto mt-6 max-w-4xl text-ink-muted">
              Where this article reports a result, the case study linked below is the primary record for it. These
              sources cover the framework and methodology.
            </p>
          </Section>
        )}

        {hasRelated && (
          <RelatedWork
            tone={relatedTone}
            slugs={insight.relatedCaseStudySlugs}
            heading="Where this has been done"
            description="Production work behind the approach described above."
          />
        )}

        <CtaBand
          navy
          tone={ctaTone}
          heading={insight.cta.heading}
          body={insight.cta.body}
          primary={{ label: insight.cta.primaryLabel, href: "/contact" }}
          secondary={service ? { label: service.title, href: `/services/${service.slug}` } : undefined}
        />

        {/* Previous and next, so every article leads on to another. */}
        <Section tone={footerTone} bordered>
          <Reveal>
            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
              {[
                { label: "Previous insight", item: prevInsight, dir: "prev" as const },
                { label: "Next insight", item: nextInsight, dir: "next" as const },
              ].map(({ label, item, dir }) => (
                <Link
                  key={dir}
                  href={`/insights/${item.slug}`}
                  className="group flex items-center gap-4 rounded-3xl border border-border bg-bg p-6 transition-all duration-200 hover:border-accent-hairline hover:shadow-[var(--shadow-card-hover)]"
                >
                  {dir === "prev" && (
                    <ArrowIcon className="h-4 w-4 shrink-0 rotate-180 text-fg-subtle transition-colors group-hover:text-accent" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="ds-meta block">{label}</span>
                    <span className="mt-2 block text-[1.0625rem] leading-snug font-semibold tracking-[-0.015em] text-fg transition-colors group-hover:text-accent">
                      {item.title}
                    </span>
                  </span>
                  {dir === "next" && (
                    <ArrowIcon className="h-4 w-4 shrink-0 text-fg-subtle transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                  )}
                </Link>
              ))}
            </div>
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}
