import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ServiceJsonLd } from "@/components/json-ld";
import { RelatedWork } from "@/components/work";
import { Principles } from "@/components/positioning";
import { ServiceToc } from "@/components/service-toc";
import { PageEvent } from "@/components/analytics";
import { Contact } from "@/components/contact";
import {
 ArrowIcon,
 CheckIcon,
 ChipList,
 Definition,
 Faqs,
 FitLists,
 MinusIcon,
 PageHeader,
 Reveal,
 Section,
 SectionHeading,
 StepList,
} from "@/components/ui";
import { insights } from "@/content/insights";
import { getService, services, serviceSlugs } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

/* One source for the in-page navigation and the anchors it points at, so a
 renamed section cannot leave a dead chip behind. */
const SECTIONS = [
 { id: "fit", label: "Who it is for" },
 { id: "problems", label: "Problems" },
 { id: "deliverables", label: "Deliverables" },
 { id: "engagement", label: "Process" },
 { id: "technical", label: "Technical depth" },
 { id: "proof", label: "Proof" },
 { id: "scope", label: "Scope" },
 { id: "why", label: "Why me" },
 { id: "faq", label: "FAQ" },
];

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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params;
 const service = getService(slug);
 if (!service) notFound();

 /* The next service in the catalogue, so a reader who has decided this is not
 theirs has somewhere to go other than back. */
 const index = services.findIndex((s) => s.slug === service.slug);
 const nextService = services[(index + 1) % services.length];
 const relatedInsights = insights.filter((i) => i.relatedServiceSlug === service.slug);

 return (
 <>
 <ServiceJsonLd service={service} />
 <PageEvent event="service_view" label={service.slug} />
 <Nav />
 <main id="main">
 <PageHeader
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
 aside={
 <div className="h-full border-t border-border">
 <p className="ds-meta">Best fit</p>
 <p className="ds-body-sm mt-3">{service.idealFor[0]}.</p>
 <div className="mt-6 border-t border-border pt-6">
 <p className="ds-meta">Not this</p>
 <p className="ds-body-sm mt-3">{service.notIdealFor[0]}.</p>
 </div>
 <Link href="#faq" className="ds-link mt-6">
 Jump to common questions
 <ArrowIcon className="h-3.5 w-3.5" />
 </Link>
 </div>
 }
 />

 <ServiceToc sections={SECTIONS} />

 {/* Answer-first. One quotable sentence before any sales copy. */}
 <Section tone="plain">
 <Reveal>
 <Definition term="In one sentence">{service.definition}</Definition>
 </Reveal>
 <Reveal delay={0.05} className=" mt-10 space-y-5">
 {service.intro.map((p) => (
 <p key={p} className="ds-body">
 {p}
 </p>
 ))}
 </Reveal>
 </Section>

 <Section id="fit" tone="soft">
 <SectionHeading
 overline="Fit"
 title="Who this is for, and who it is not"
 description="Naming the wrong fit saves both of us a call. If your situation is in the right-hand column, say so and I will point you somewhere better."
 />
 <Reveal>
 <FitLists idealFor={service.idealFor} notIdealFor={service.notIdealFor} />
 </Reveal>
 </Section>

 <Section id="problems" tone="plain">
 <SectionHeading
 overline="The problem"
 title="What this service is actually solving"
 />
 <ul className="grid gap-4 lg:grid-cols-3">
 {service.problems.map((problem, i) => (
 <Reveal
 as="li"
 key={problem.title}
 delay={i * 0.05}
 className="flex flex-col ds-card p-7"
 >
 <span className="ds-meta text-accent">{String(i + 1).padStart(2, "0")}</span>
 <h3 className="ds-title-sm mt-4">{problem.title}</h3>
 <p className="ds-body-sm mt-3">{problem.detail}</p>
 </Reveal>
 ))}
 </ul>
 </Section>

 <Section id="deliverables" tone="soft">
 <SectionHeading
 overline="Deliverables"
 title="What you get"
 description="Concrete outputs, not activities. Everything here is something that exists at the end of the engagement."
 />
 <ul className="grid gap-4 md:grid-cols-2">
 {service.deliverables.map((d, i) => (
 <Reveal as="li" key={d.title} delay={i * 0.03} className="ds-card p-7">
 <div className="flex items-start gap-3.5">
 <CheckIcon className="mt-1 shrink-0 text-accent" />
 <div>
 <h3 className="ds-title-sm">{d.title}</h3>
 <p className="ds-body-sm mt-2">{d.detail}</p>
 </div>
 </div>
 </Reveal>
 ))}
 </ul>
 </Section>

 <Section id="engagement" tone="plain">
 <SectionHeading overline="Engagement" title="How it runs" />
 <Reveal>
 <StepList steps={service.engagement} />
 </Reveal>
 </Section>

 <Section id="technical" tone="soft">
 <SectionHeading
 overline="Technical depth"
 title="What it is built with, and why that matters to you"
 description={service.technical.summary}
 />
 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
 {service.technical.groups.map((group, i) => (
 <Reveal key={group.label} delay={i * 0.04} className="ds-card p-6">
 <p className="ds-meta">{group.label}</p>
 <ChipList items={group.items} className="mt-4" />
 </Reveal>
 ))}
 </div>
 </Section>

 <RelatedWork
 id="proof"
 tone="plain"
 slugs={service.proofSlugs}
 heading="Where this has been done before"
 description="Production work relevant to this service. Each case study covers the problem, the decisions and what came out of it."
 />

 <Section id="scope" tone="soft">
 <SectionHeading
 overline="Scope"
 title="Where the scope starts and stops"
 description="Stated up front so it is a shared understanding rather than a negotiation halfway through."
 />
 <div className="grid gap-4 md:grid-cols-2">
 <Reveal className="ds-card p-7">
 <p className="ds-meta text-success">Included</p>
 <ul className="mt-5 space-y-3.5">
 {service.scope.includes.map((item) => (
 <li key={item} className="flex items-start gap-3">
 <CheckIcon className="mt-1 shrink-0 text-success" />
 <span className="text-[0.9375rem] leading-relaxed text-ink">{item}</span>
 </li>
 ))}
 </ul>
 </Reveal>
 <Reveal delay={0.05} className="bg-surface p-7">
 <p className="ds-meta">Not included</p>
 <ul className="mt-5 space-y-3.5">
 {service.scope.excludes.map((item) => (
 <li key={item} className="flex items-start gap-3">
 <MinusIcon className="mt-1 shrink-0 text-ink-soft" />
 <span className="text-[0.9375rem] leading-relaxed text-ink-muted">
 {item}
 </span>
 </li>
 ))}
 </ul>
 </Reveal>
 </div>
 </Section>

 {relatedInsights.length > 0 && (
 <Section tone="deep">
 <SectionHeading
 overline="Further reading"
 title="Related insights"
 description="First-hand notes that go deeper on the approach behind this service."
 />
<ul className="border-t border-white/15">
{relatedInsights.map((insight, i) => (
<Reveal as="li" key={insight.slug} delay={i * 0.04}>
<Link
href={`/insights/${insight.slug}`}
className="group flex flex-col gap-2.5 border-b border-white/15 py-6 transition-colors hover:bg-white/10 md:flex-row md:items-baseline md:justify-between"
>
<span>
<span className="flex items-center gap-2.5">
<span className="ds-title-sm text-deep-text transition-colors group-hover:text-white">
{insight.title}
</span>
<span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-0.5 text-[0.75rem] font-medium text-deep-text/90">
{insight.cluster}</span>
</span>
<span className="ds-body-sm mt-1.5 block max-w-2xl text-deep-text/70">{insight.dek}</span>
</span>
<span className="ds-link text-deep-text">
Read
<ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
</span>
</Link>
</Reveal>
))}
</ul>
 </Section>
 )}

 <Principles
 id="why"
 tone="plain"
 heading="Why work with me on this"
 description="The same four things whichever service you are reading. Each is tied to something you can check rather than to an adjective."
 />

 <Section id="faq" tone="soft">
 <SectionHeading overline="Questions" title="Common questions" />
 <Reveal>
 <Faqs faqs={service.faqs} className="mx-auto max-w-4xl" />
 </Reveal>
 </Section>

 <Contact tone="plain" heading={service.cta.heading} body={service.cta.body} />

 {/* Next service. Every service page links onward rather than dead-ending
 for a reader who has decided this one is not theirs. */}
 <Section tone="soft" bordered>
 <Reveal>
 <Link
 href={`/services/${nextService.slug}`}
 className="group flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
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
