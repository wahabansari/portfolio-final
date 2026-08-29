import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyJsonLd } from "@/components/json-ld";
import { Plate } from "@/components/plate";
import { RelatedWork } from "@/components/work";
import { OutboundLink } from "@/components/outbound";
import { PageEvent } from "@/components/analytics";
import {
  ArrowIcon,
  CheckIcon,
  ChipList,
  CtaBand,
  ExternalIcon,
  Field,
  PageHeader,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/ui";
import { caseStudySlugs, caseStudies, getCaseStudy } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) return {};

  return pageMetadata({
    title: entry.study.metaTitle,
    description: entry.study.metaDescription,
    path: `/work/${slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getCaseStudy(slug);
  if (!entry) notFound();

  const { project, study } = entry;

  const index = caseStudies.findIndex((p) => p.slug === slug);
  const nextStudy = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <CaseStudyJsonLd project={project} study={study} />
      <PageEvent event="view_case_study" label={project.slug} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[
            { label: "Home", href: "/" },
            { label: "Work", href: "/work" },
            { label: project.title },
          ]}
          eyebrow={project.kind}
          title={study.h1}
          lede={study.lede}
          actions={
            <>
              <Link
                href="/contact"
                data-track="cta_start_project"
                data-track-label={`case-study:${project.slug}`}
                className="ds-btn ds-btn-primary"
              >
                Discuss a similar project
                <ArrowIcon />
              </Link>
              {project.href && (
                <OutboundLink
                  href={project.href}
                  event="outbound_project_click"
                  payload={{ project: project.slug }}
                  className="ds-btn ds-btn-secondary"
                >
                  Visit {project.domain}
                  <ExternalIcon />
                </OutboundLink>
              )}
            </>
          }
          aside={
            <div className="ds-card overflow-hidden">
              <Plate project={project} className="border-b border-border" priority />
              <div className="p-7">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                  <Field label="Role" value={study.role} className="col-span-2" />
                  <Field label="Scope" value={study.scope} className="col-span-2" />
                  <Field label="Status" value={study.status} />
                  <Field
                    label="Live at"
                    value={
                      project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          {project.domain}
                        </a>
                      ) : (
                        "Private"
                      )
                    }
                  />
                </dl>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="ds-meta">Stack</p>
                  <ChipList items={study.stack} className="mt-3" />
                </div>
              </div>
            </div>
          }
        />

        {/* Context and problem, before anything about the solution. */}
        <Section tone="plain">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <span className="ds-overline">Context</span>
              <h2 className="ds-h3 mt-5">What the product is</h2>
              <p className="ds-body ds-measure mt-4">{study.context}</p>

              <h2 className="ds-h3 mt-11">The problem</h2>
              <p className="ds-body ds-measure mt-4">{study.problem}</p>
            </Reveal>

            <Reveal delay={0.06} className="lg:col-span-5">
              <div className="ds-card h-full p-7 md:p-8">
                <p className="ds-meta">My role</p>
                <ul className="mt-5 space-y-3.5">
                  {study.responsibility.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon className="mt-1 shrink-0 text-accent" />
                      <span className="text-[0.9375rem] leading-relaxed text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>

        <Section tone="soft">
          <SectionHeading overline="The work" title="What was built" />
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border md:grid-cols-2">
            {study.build.map((block, i) => (
              <Reveal key={block.heading} delay={i * 0.04} className="bg-card p-7 md:p-8">
                <span className="ds-meta text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ds-title mt-4">{block.heading}</h3>
                <p className="ds-body-sm mt-3">{block.body}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section tone="plain">
          <SectionHeading
            overline="Decisions"
            title="Choices worth defending"
            description="The reasoning, not just the outcome — a decision without its trade-off is a preference."
          />
          <ul className="space-y-4">
            {study.decisions.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 0.04}>
                <div className="ds-card grid gap-4 p-7 md:grid-cols-12 md:gap-8">
                  <h3 className="ds-title-sm md:col-span-4">{d.title}</h3>
                  <p className="ds-body-sm md:col-span-8">{d.detail}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* Outcomes. Anything marked verified was measured; everything else is
            described as an observable change rather than a number. */}
        <Section tone="soft">
          <SectionHeading
            overline="Outcome"
            title="What actually came out of it"
            description="Measured results are marked as such. Where there is no measured figure, the outcome is stated as what changed rather than dressed up as a statistic."
          />
          <ul className="grid gap-5 md:grid-cols-3">
            {study.outcome.map((o, i) => (
              <Reveal as="li" key={o.statement} delay={i * 0.05} className="h-full">
                <div className="ds-card flex h-full flex-col p-7">
                  <span
                    className={
                      o.verified ? "ds-chip ds-chip-success self-start" : "ds-chip self-start"
                    }
                  >
                    {o.verified ? "Measured" : "Observed"}
                  </span>
                  <p className="mt-5 text-[1.0625rem] leading-relaxed font-medium text-ink">
                    {o.statement}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          {study.measurement && (
            <Reveal delay={0.1} className="mt-8">
              <div className="ds-card border-l-2 border-l-success p-7 md:p-8">
                <p className="ds-meta text-success">How this was measured</p>
                <p className="ds-body ds-measure mt-3">{study.measurement}</p>
              </div>
            </Reveal>
          )}
        </Section>

        <Section tone="plain">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <span className="ds-overline">Honestly</span>
              <h2 className="ds-h3 mt-5">What I would improve next</h2>
              <ul className="mt-6 space-y-4">
                {study.next.map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <span
                      aria-hidden
                      className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <p className="ds-body">{item}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.06} className="lg:col-span-5">
              <div className="ds-card h-full p-7 md:p-8">
                <p className="ds-meta">Related service</p>
                <p className="ds-title mt-4">{study.cta.line}</p>
                <Link href={study.cta.href} className="ds-link mt-6">
                  {study.cta.label}
                  <ArrowIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Section>

        <RelatedWork
          tone="soft"
          slugs={caseStudies.map((p) => p.slug)}
          exclude={slug}
          heading="Other case studies"
        />

        <CtaBand
          tone="plain"
          heading={study.cta.line}
          body="Send what you have — a product, a repository, a Figma file or a description of the problem. I will reply with what I would do first and what I would need to estimate it."
          primary={{ label: "Discuss a similar project", href: "/contact" }}
          secondary={{ label: study.cta.label, href: study.cta.href }}
        />

        <Section tone="soft" bordered>
          <Reveal>
            <Link
              href={`/work/${nextStudy.slug}`}
              className="group flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
            >
              <div>
                <p className="ds-meta">Next case study</p>
                <p className="ds-h3 mt-3 transition-colors group-hover:text-accent">
                  {nextStudy.title}
                </p>
                <p className="ds-body-sm mt-2 max-w-xl">{nextStudy.blurb}</p>
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
