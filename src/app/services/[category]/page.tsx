import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, serviceCategories } from "@/content/services";
import { site } from "@/content/site";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ArrowIcon, Reveal, Section } from "@/components/ui";
import { ACCENT_BG, CategoryJsonLd, PageHeader } from "@/components/service-ui";

type Props = { params: Promise<{ category: string }> };

/** Prerenders every category at build time. */
export function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const url = `${site.url}/services/${category.slug}`;
  return {
    title: category.metaTitle,
    description: category.metaDescription,
    keywords: [...category.keywords],
    alternates: { canonical: `/services/${category.slug}` },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <>
      <CategoryJsonLd category={category} />
      <Nav />
      <main id="main">
        <PageHeader
          trail={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: category.shortTitle },
          ]}
          accent={category.accent}
          title={category.title}
          lede={category.tagline}
          intro={category.intro}
          actions={
            <>
              <Link href="/contact" className="g-btn g-btn-filled w-full sm:w-auto">
                Start a project
                <ArrowIcon />
              </Link>
              <Link href="/services" className="g-btn g-btn-outlined w-full sm:w-auto">
                All services
              </Link>
            </>
          }
        />

        {/* Services in this category */}
        <Section>
          <Reveal className="mb-12 md:mb-16">
            <h2 className="g-h2">
              {category.services.length} services under {category.shortTitle.toLowerCase()}
            </h2>
          </Reveal>

          <ul className="grid gap-6 md:grid-cols-2">
            {category.services.map((service, i) => (
              <Reveal as="li" key={service.slug} delay={(i % 2) * 0.06} className="h-full">
                <Link
                  href={`/services/${category.slug}/${service.slug}`}
                  className="g-card-soft group flex h-full flex-col p-7 md:p-8"
                >
                  <h3 className="g-title">{service.title}</h3>
                  <p className="text-[0.9375rem] font-medium text-primary mt-2">
                    {service.tagline}
                  </p>
                  <p className="g-body mt-4 flex-1">{service.summary}</p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.stack.slice(0, 4).map((t) => (
                      <li
                        key={t}
                        className="g-chip !py-1 !text-[0.8125rem] font-normal text-ink-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <span className="g-link mt-6">
                    Read the detail
                    <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* Other categories */}
        <Section tone="grey">
          <Reveal>
            <h2 className="g-h2">Other services</h2>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {serviceCategories
                .filter((c) => c.slug !== category.slug)
                .map((other) => (
                  <li key={other.slug}>
                    <Link href={`/services/${other.slug}`} className="g-card-plain group block p-7">
                      <span
                        aria-hidden
                        className={`block h-1 w-10 rounded-full ${ACCENT_BG[other.accent]}`}
                      />
                      <h3 className="g-title mt-5">{other.title}</h3>
                      <p className="g-body mt-3">{other.tagline}</p>
                      <span className="g-link mt-5">
                        Explore
                        <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </Reveal>
        </Section>
      </main>
      <Footer />
    </>
  );
}
