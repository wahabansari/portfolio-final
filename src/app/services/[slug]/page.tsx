import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ServiceJsonLd } from "@/components/json-ld";
import { RelatedWork } from "@/components/work";
import { ServiceToc } from "@/components/service-toc";
import { PageEvent } from "@/components/analytics";
import { Contact } from "@/components/contact";
import {
  ArrowIcon,
  CheckIcon,
  ChipList,
  CodeIcon,
  CompassIcon,
  Definition,
  Faqs,
  GaugeIcon,
  LayersIcon,
  LayoutIcon,
  MinusIcon,
  PageHeader,
  RefreshIcon,
  Reveal,
  RocketIcon,
  SearchIcon,
  Section,
  SectionHeading,
  ServerIcon,
  UserIcon,
} from "@/components/ui";
import { insights } from "@/content/insights";
import { getService, services, serviceSlugs } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

/* One source for the in-page navigation and the anchors it points at, so a
   renamed section cannot leave a dead link behind. "Relevant work" is only
   listed for a service that has verified work to show. */
function sectionsFor(hasProof: boolean) {
  return [
    { id: "problems", label: "What it solves" },
    { id: "fit", label: "Who it is for" },
    { id: "deliverables", label: "What you get" },
    { id: "engagement", label: "How it runs" },
    { id: "technical", label: "Technical approach" },
    { id: "scope", label: "Scope" },
    ...(hasProof ? [{ id: "proof", label: "Relevant work" }] : []),
    { id: "faq", label: "FAQ" },
  ];
}

/* A representative icon per technical-group label, matched by keyword rather
   than an exact lookup table so a new group on a future service degrades to
   CodeIcon instead of rendering nothing. Covers every group label in
   content/services.ts today: Core, Data, Interface, Forms & auth,
   Performance, Delivery, Build, Content, Search, Measurement, Rendering,
   Assets, Migration, CMS, Styling, Process, Application, Auth, Operations,
   Retrieval, Workflow. */
function technicalIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("auth")) return UserIcon;
  if (l.includes("performance") || l.includes("measurement")) return GaugeIcon;
  if (l.includes("search") || l.includes("retrieval")) return SearchIcon;
  if (l.includes("rendering")) return ServerIcon;
  if (l.includes("data") || l.includes("cms")) return LayersIcon;
  if (l.includes("interface") || l.includes("content") || l.includes("styling") || l.includes("assets")) return LayoutIcon;
  if (l.includes("migration") || l.includes("integration") || l.includes("workflow")) return RefreshIcon;
  if (l.includes("delivery") || l.includes("application") || l.includes("operations")) return RocketIcon;
  if (l.includes("process")) return CompassIcon;
  return CodeIcon;
}

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

type Tone = "plain" | "soft";
const flip = (t: Tone): Tone => (t === "plain" ? "soft" : "plain");

/* A left-aligned block inside the main column: overline, heading, optional
   lede, then the content. One wrapper so every block opens the same way. */
function Block({
  id,
  overline,
  title,
  description,
  children,
}: {
  id: string;
  overline: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <Reveal>
        <span className="ds-overline-accent">{overline}</span>
        <h2 className="ds-h2 mt-4">{title}</h2>
        {description && <p className="ds-body mt-4 max-w-2xl">{description}</p>}
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/* A titled list of check / minus lines in the shared card. Used for fit and
   scope, which are the same shape: what is in, and what is out. */
function ListCard({
  label,
  positive,
  items,
}: {
  label: string;
  positive: boolean;
  items: readonly string[];
}) {
  return (
    <div className="h-full p-6 md:p-7">
      <p className={positive ? "ds-meta text-success" : "ds-meta"}>{label}</p>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            {positive ? (
              <CheckIcon className="mt-1 shrink-0 text-success" />
            ) : (
              <MinusIcon className="mt-1 shrink-0 text-ink-soft" />
            )}
            <span className={positive ? "ds-body-sm text-fg" : "ds-body-sm"}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  /* The next service in the catalogue, so a reader who has decided this is not
     theirs has somewhere to go other than back. */
  const index = services.findIndex((s) => s.slug === service.slug);
  const nextService = services[(index + 1) % services.length];
  const relatedInsights = insights.filter((i) => i.relatedServiceSlug === service.slug);

  const hasProof = service.proofSlugs.length > 0;
  const sections = sectionsFor(hasProof);

  /* Bands after the two-column body alternate; the optional proof and insights
     bands shift the sequence, so the tones are derived rather than hard-coded. */
  const proofTone: Tone = "soft";
  const insightsTone: Tone = hasProof ? flip(proofTone) : proofTone;
  const faqTone = relatedInsights.length > 0 ? flip(insightsTone) : insightsTone;
  const contactTone = flip(faqTone);
  const nextTone = flip(contactTone);

  return (
    <>
      <ServiceJsonLd service={service} />
      <PageEvent event="service_view" label={service.slug} />
      <Nav />
      <main id="main">
        <PageHeader
          align="center"
          trail={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
          eyebrow={service.eyebrow}
          title={service.h1}
          lede={service.subhead}
          actions={
            <>
              <Link
                href="/contact"
                data-track="cta_click"
                data-track-label={service.slug}
                className="ds-btn ds-btn-primary"
              >
                {service.cta.primaryLabel}
                <ArrowIcon />
              </Link>
              <Link href="/work" className="ds-btn ds-btn-secondary">
                See relevant work
              </Link>
            </>
          }
        />

        {/* Phone and tablet: the sticky chip row. Desktop gets the rail. */}
        <ServiceToc sections={sections} className="lg:hidden" />

        <Section tone="plain">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 space-y-20 lg:col-span-8">
              {/* Answer-first. One quotable sentence before any sales copy. */}
              <div>
                <Reveal>
                  <Definition term="In one sentence">{service.definition}</Definition>
                </Reveal>
                <Reveal delay={0.05} className="mt-8 space-y-5">
                  {service.intro.map((p) => (
                    <p key={p} className="ds-body">
                      {p}
                    </p>
                  ))}
                </Reveal>
              </div>

              <Block id="problems" overline="The problem" title="What this service is actually solving">
                <ol className="border-b border-border">
                  {service.problems.map((problem, i) => (
                    <Reveal as="li" key={problem.title} delay={i * 0.04}>
                      <div className="flex items-start gap-5 border-t border-border py-6">
                        <span
                          aria-hidden
                          className="font-display text-[1.75rem] leading-none font-bold tracking-[-0.02em] text-accent-hairline tabular-nums"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="ds-title-sm">{problem.title}</h3>
                          <p className="ds-body-sm mt-2">{problem.detail}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </Block>

              <Block
                id="fit"
                overline="Fit"
                title="Who this is for, and who it is not"
                description="Naming the wrong fit saves both of us a call. If your situation is in the right-hand card, say so and we will point you somewhere better."
              >
                <div className="grid divide-y divide-border-subtle overflow-hidden rounded-3xl border border-border bg-bg md:grid-cols-2 md:divide-x md:divide-y-0">
                  <Reveal className="h-full">
                    <ListCard label="A good fit" positive items={service.idealFor} />
                  </Reveal>
                  <Reveal delay={0.05} className="h-full">
                    <ListCard label="Not a fit" positive={false} items={service.notIdealFor} />
                  </Reveal>
                </div>
              </Block>

              <Block
                id="deliverables"
                overline="Deliverables"
                title="What you get"
                description="Concrete outputs, not activities. Everything here is something that exists at the end of the engagement."
              >
                <ul className="grid gap-x-10 border-b border-border sm:grid-cols-2 sm:[&>li:nth-child(n+3)]:border-t-0">
                  {service.deliverables.map((d, i) => (
                    <Reveal as="li" key={d.title} delay={i * 0.03} className="border-t border-border">
                      <div className="flex h-full gap-4 py-6">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                          <CheckIcon />
                        </span>
                        <div>
                          <h3 className="ds-title-sm">{d.title}</h3>
                          <p className="ds-body-sm mt-2">{d.detail}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </Block>

              <Block id="engagement" overline="Engagement" title="How it runs">
                <ol>
                  {service.engagement.map((step, i) => {
                    const last = i === service.engagement.length - 1;
                    return (
                      <Reveal as="li" key={step.step} delay={i * 0.04}>
                        <div className="relative flex gap-5 pb-8 last:pb-0">
                          {!last && (
                            <span
                              aria-hidden
                              className="absolute top-10 bottom-0 left-[1.0625rem] w-px bg-border"
                            />
                          )}
                          <span
                            aria-hidden
                            className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[0.875rem] font-semibold text-accent-fg tabular-nums"
                          >
                            {i + 1}
                          </span>
                          <div className="pt-1">
                            <h3 className="ds-title">{step.step}</h3>
                            <p className="ds-body-sm mt-2">{step.detail}</p>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </ol>
              </Block>

              <Block
                id="technical"
                overline="Technical approach"
                title="How it is built, and why that matters to you"
                description={service.technical.summary}
              >
                <div className="border-b border-border">
                  {service.technical.groups.map((group, i) => {
                    const Icon = technicalIcon(group.label);
                    return (
                      <Reveal key={group.label} delay={i * 0.03}>
                        <div className="grid gap-3 border-t border-border py-5 sm:grid-cols-12 sm:gap-6">
                          <div className="flex items-center gap-2.5 sm:col-span-4">
                            <Icon className="h-4 w-4 shrink-0 text-accent" />
                            <p className="ds-meta">{group.label}</p>
                          </div>
                          <ChipList items={group.items} className="sm:col-span-8" />
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </Block>

              <Block
                id="scope"
                overline="Scope"
                title="Where the scope starts and stops"
                description="Stated up front so it is a shared understanding rather than a negotiation halfway through."
              >
                <div className="grid divide-y divide-border-subtle overflow-hidden rounded-3xl border border-border bg-bg md:grid-cols-2 md:divide-x md:divide-y-0">
                  <Reveal className="h-full">
                    <ListCard label="Included" positive items={service.scope.includes} />
                  </Reveal>
                  <Reveal delay={0.05} className="h-full">
                    <ListCard label="Not included" positive={false} items={service.scope.excludes} />
                  </Reveal>
                </div>
              </Block>
            </div>

            {/* Desktop rail: the engagement at a glance, the action, the page map. */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28 space-y-5">
                <div className="rounded-3xl border border-border bg-bg p-6">
                  <span className="ds-overline-accent">Service {service.index} of {services.length}</span>
                  <p className="ds-title mt-3">{service.shortTitle}</p>
                  <dl className="mt-5 space-y-3 border-t border-border pt-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="ds-body-sm">Deliverables</dt>
                      <dd className="ds-title-sm tabular-nums">{service.deliverables.length}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="ds-body-sm">Process steps</dt>
                      <dd className="ds-title-sm tabular-nums">{service.engagement.length}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="ds-body-sm">Questions answered</dt>
                      <dd className="ds-title-sm tabular-nums">{service.faqs.length}</dd>
                    </div>
                  </dl>
                  <Link
                    href="/contact"
                    data-track="cta_click"
                    data-track-label={`${service.slug}:rail`}
                    className="ds-btn ds-btn-primary mt-6 w-full justify-center"
                  >
                    {service.cta.primaryLabel}
                    <ArrowIcon />
                  </Link>
                </div>

                <nav aria-label="On this page" className="rounded-3xl border border-border-subtle p-6">
                  <p className="ds-meta">On this page</p>
                  <ul className="mt-4 space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block rounded-lg px-3 py-1.5 text-[0.875rem] font-medium text-fg-muted transition-colors hover:bg-accent-soft hover:text-accent"
                        >
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </Section>

        <RelatedWork
          id="proof"
          tone={proofTone}
          slugs={service.proofSlugs}
          heading="Relevant work"
          description="Production work relevant to this service. Each case study covers the problem, the decisions and what came out of it."
        />

        {relatedInsights.length > 0 && (
          <Section tone={insightsTone}>
            <SectionHeading
              overline="Further reading"
              title="Related insights"
              description="First-hand notes that go deeper on the approach behind this service."
            />
            <ul className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
              {relatedInsights.map((insight, i) => (
                <Reveal as="li" key={insight.slug} delay={i * 0.05} className="h-full">
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="group ds-card ds-card-interactive flex h-full flex-col p-7"
                  >
                    <span className="ds-chip self-start">{insight.cluster}</span>
                    <span className="ds-title mt-4 transition-colors group-hover:text-accent">
                      {insight.title}
                    </span>
                    <span className="ds-body-sm mt-3 text-fg-muted">{insight.dek}</span>
                    <span className="ds-link mt-auto pt-6">
                      Read
                      <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Section>
        )}

        <Section id="faq" tone={faqTone}>
          <SectionHeading overline="Questions" title="Common questions" />
          <Reveal>
            <Faqs faqs={service.faqs} className="mx-auto max-w-4xl" />
          </Reveal>
        </Section>

        <Contact tone={contactTone} heading={service.cta.heading} body={service.cta.body} />

        {/* Next service. Every service page links onward rather than dead-ending
            for a reader who has decided this one is not theirs. */}
        <Section tone={nextTone} bordered>
          <Reveal>
            <Link
              href={`/services/${nextService.slug}`}
              className="group ds-card ds-card-interactive mx-auto flex max-w-4xl items-center justify-between gap-6 p-7 md:p-8"
            >
              <div>
                <p className="ds-meta">Next service</p>
                <p className="ds-h3 mt-3 transition-colors group-hover:text-accent">
                  {nextService.title}
                </p>
                <p className="ds-body-sm mt-2 max-w-xl">{nextService.summary}</p>
              </div>
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-fg-subtle transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-accent group-hover:text-accent"
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
