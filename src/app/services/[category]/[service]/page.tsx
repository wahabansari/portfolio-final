import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allServicePaths, getService } from "@/content/services";
import { site } from "@/content/site";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ArrowIcon, Reveal, Section } from "@/components/ui";
import {
  ACCENT_BG,
  Breadcrumbs,
  CheckList,
  Faqs,
  ProcessList,
  ServiceJsonLd,
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
      <main>
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="pt-10 pb-16 md:pt-14 md:pb-20">
          <div className="g-container">
            <Breadcrumbs
              trail={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: category.shortTitle, href: `/services/${category.slug}` },
                { label: service.title },
              ]}
            />

            <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-7">
                <span
                  aria-hidden
                  className={`block h-1 w-12 rounded-full ${ACCENT_BG[category.accent]}`}
                />
                <h1 className="g-display mt-6">{service.title}</h1>
                <p className="g-body-lg mt-5 max-w-xl">{service.tagline}</p>

                <div className="mt-8 max-w-xl space-y-5">
                  {service.intro.map((p, i) => (
                    <p key={i} className="g-body text-[1.0625rem]">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/#contact" className="g-btn g-btn-filled w-full sm:w-auto">
                    Start a project
                    <ArrowIcon />
                  </Link>
                  <a
                    href={`mailto:${site.email}`}
                    className="g-btn g-btn-outlined w-full sm:w-auto"
                  >
                    Ask a question
                  </a>
                </div>
              </Reveal>

              {/* Summary card */}
              <Reveal delay={0.06} className="lg:col-span-5">
                <div className="g-card-soft p-7 md:p-8">
                  <p className="g-body-sm">At a glance</p>

                  <dl className="mt-6 space-y-6">
                    <div>
                      <dt className="g-body-sm">Category</dt>
                      <dd className="mt-1">
                        <Link
                          href={`/services/${category.slug}`}
                          className="g-link !text-[0.9375rem]"
                        >
                          {category.shortTitle}
                        </Link>
                      </dd>
                    </div>
                    <div>
                      <dt className="g-body-sm">Ideal for</dt>
                      <dd className="mt-2">
                        <ul className="space-y-2">
                          {service.idealFor.map((item) => (
                            <li key={item} className="text-[0.9375rem] text-ink">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="g-body-sm">Built with</dt>
                      <dd className="mt-2">
                        <ul className="flex flex-wrap gap-2">
                          {service.stack.map((t) => (
                            <li
                              key={t}
                              className="g-chip !py-1 !text-[0.8125rem] font-normal text-ink-muted"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── The problem ─────────────────────────────────────────────── */}
        <Section tone="grey">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="g-h2">{service.problem.heading}</h2>
              <p className="g-body-lg mt-6">{service.problem.body}</p>
            </div>
          </Reveal>
        </Section>

        {/* ── Deliverables ────────────────────────────────────────────── */}
        <Section>
          <Reveal className="mb-12 md:mb-16">
            <p className="g-overline">Deliverables</p>
            <h2 className="g-h2 mt-4">What you get</h2>
          </Reveal>
          <Reveal>
            <CheckList items={service.deliverables} accent={category.accent} />
          </Reveal>
        </Section>

        {/* ── Process ─────────────────────────────────────────────────── */}
        <Section tone="grey">
          <Reveal className="mb-12 md:mb-16">
            <p className="g-overline">Process</p>
            <h2 className="g-h2 mt-4">How the work runs</h2>
          </Reveal>
          <Reveal>
            <ProcessList steps={service.process} accent={category.accent} />
          </Reveal>
        </Section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <Section>
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
                <Link href="/#contact" className="g-btn g-btn-filled w-full sm:w-auto">
                  Start a project
                  <ArrowIcon />
                </Link>
                <Link href="/#work" className="g-btn g-btn-outlined w-full sm:w-auto">
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
