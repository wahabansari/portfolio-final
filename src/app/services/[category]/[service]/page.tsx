import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allServicePaths, getService } from "@/content/services";
import { site } from "@/content/site";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ArrowIcon, Reveal, Section } from "@/components/ui";
import {
  CheckList,
  Faqs,
  PageHeader,
  ProcessList,
  ServiceJsonLd,
  UseCases,
} from "@/components/service-ui";

type Props = { params: Promise<{ category: string; service: string }> };

/** Prerenders every service page at build time. */
export function generateStaticParams() {
  return allServicePaths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: c, service: s } = await params;
  const found = getService(c, s);
  if (!found) return {};

  const { category, service } = found;
  const path = `/services/${category.slug}/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: [...service.keywords],
    alternates: { canonical: path },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${site.url}${path}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { category: c, service: s } = await params;
  const found = getService(c, s);
  if (!found) notFound();

  const { category, service } = found;
  const siblings = category.services.filter((x) => x.slug !== service.slug);

  return (
    <>
      <ServiceJsonLd category={category} service={service} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: category.shortTitle, href: `/services/${category.slug}` },
            { label: service.title },
          ]}
          accent={category.accent}
          title={service.title}
          lede={service.tagline}
          intro={service.intro}
          actions={
            <>
              <Link href="/contact" className="g-btn g-btn-filled w-full sm:w-auto">
                Start a project
                <ArrowIcon />
              </Link>
              <a href={`mailto:${site.email}`} className="g-btn g-btn-outlined w-full sm:w-auto">
                Ask a question
              </a>
            </>
          }
        />

        {/* At a glance */}
        <Section>
          <Reveal>
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <p className="g-body-sm">Category</p>
                <Link
                  href={`/services/${category.slug}`}
                  className="g-link mt-1 inline-flex min-h-8 items-center py-1 !text-[0.9375rem]"
                >
                  {category.shortTitle}
                </Link>
              </div>
              <div>
                <p className="g-body-sm">Ideal for</p>
                <ul className="mt-2 space-y-1.5">
                  {service.idealFor.map((item) => (
                    <li key={item} className="text-[0.9375rem] text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="g-body-sm">Built with</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {service.stack.map((t) => (
                    <li
                      key={t}
                      className="g-chip !py-1 !text-[0.8125rem] font-normal text-ink-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ── The problem ─────────────────────────────────────────────── */}
        <Section tone="grey">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="g-h2">{service.problem.heading}</h2>
              <p className="g-body-lg mt-6">{service.problem.body}</p>
            </div>
          </Reveal>
        </Section>

        {/* ── Real situations ─────────────────────────────────────────── */}
        <Section>
          <Reveal className="mb-12 md:mb-16">
            <p className="g-overline">In practice</p>
            <h2 className="g-h2 mt-4">What this looks like in the real world</h2>
          </Reveal>
          <Reveal>
            <UseCases cases={service.useCases} accent={category.accent} />
          </Reveal>
        </Section>

        {/* ── Deliverables ────────────────────────────────────────────── */}
        <Section tone="grey">
          <Reveal className="mb-12 md:mb-16">
            <p className="g-overline">Deliverables</p>
            <h2 className="g-h2 mt-4">What you get</h2>
          </Reveal>
          <Reveal>
            <CheckList items={service.deliverables} accent={category.accent} />
          </Reveal>
        </Section>

        {/* ── Process ─────────────────────────────────────────────────── */}
        <Section>
          <Reveal className="mb-12 md:mb-16">
            <p className="g-overline">Process</p>
            <h2 className="g-h2 mt-4">How the work runs</h2>
          </Reveal>
          <Reveal>
            <ProcessList steps={service.process} accent={category.accent} />
          </Reveal>
        </Section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <Section tone="grey">
          <Reveal className="mb-12 md:mb-16">
            <p className="g-overline">FAQ</p>
            <h2 className="g-h2 mt-4">Common questions</h2>
          </Reveal>
          <Reveal>
            <Faqs faqs={service.faqs} />
          </Reveal>
        </Section>

        {/* ── Related + CTA ───────────────────────────────────────────── */}
        <Section tone="blue">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <h2 className="g-h2">Ready when you are</h2>
              <p className="g-body-lg mt-5">
                Tell me what you&apos;re trying to fix and I&apos;ll come back with an approach, a
                timeline and a price. No obligation.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="g-btn g-btn-filled w-full sm:w-auto">
                  Start a project
                  <ArrowIcon />
                </Link>
                <Link href="/work" className="g-btn g-btn-outlined w-full sm:w-auto">
                  See past work
                </Link>
              </div>
            </Reveal>

            {siblings.length > 0 && (
              <Reveal delay={0.06} className="lg:col-span-5 lg:col-start-8">
                <p className="g-body-sm">More in {category.shortTitle}</p>
                <ul className="mt-4">
                  {siblings.map((other) => (
                    <li key={other.slug} className="border-b border-border last:border-b-0">
                      <Link
                        href={`/services/${category.slug}/${other.slug}`}
                        className="group flex min-h-16 items-center justify-between gap-4 py-4"
                      >
                        <span>
                          <span className="block text-[0.9375rem] font-medium text-ink">
                            {other.title}
                          </span>
                          <span className="g-body-sm block">{other.tagline}</span>
                        </span>
                        <ArrowIcon className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
