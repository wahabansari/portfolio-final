import type { Insight } from "@/content/insights";
import type { Service } from "@/content/services";
import {
  capabilities,
  homeFaqs,
  positioning,
  problemPaths,
  process,
  sections,
  site,
  socials,
} from "@/content/site";
import type { CaseStudy, Project } from "@/content/work";
import { caseStudies } from "@/content/work";

/**
 * Structured data.
 *
 * Two rules govern everything here:
 *
 *   1. Markup describes what is visibly on the page. If a claim is not in the
 *      rendered HTML, it does not go in the JSON-LD.
 *   2. This is a personal site, so the entity is a Person. Marking it up as an
 *      Organization or a LocalBusiness would be a claim about a real-world
 *      presence that does not exist, and Google is explicit that Person /
 *      ProfilePage data is the right shape for a portfolio.
 *
 * Schema is a comprehension aid, not a ranking lever — a Service block helps a
 * machine understand what a page offers, and does not by itself produce a rich
 * result.
 */

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const PERSON_ID = `${site.url}/#person`;
const SITE_ID = `${site.url}/#website`;

/** The canonical Person node. Everything else references it by @id rather than
    restating it, so there is exactly one description of the entity. */
export const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.name,
  jobTitle: site.role,
  description: positioning,
  url: `${site.url}/`,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Engineering",
    "Frontend Product Engineering",
    "Web Performance",
    "Core Web Vitals",
    "SaaS Development",
    "AI Product Integration",
    ...capabilities.flatMap((g) => g.lead),
  ],
  worksFor: {
    "@type": "Organization",
    name: "Independent",
    description: "Self-employed frontend product engineer",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Punjab",
      url: "https://www.pu.edu.pk/",
    },
  ],
};

/** Homepage: the Person, its WebSite, the navigation, the routing items, the
    delivery process, and the FAQ — all the structured claims behind what the
    homepage visibly says. */
export function HomeJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          personNode,
          {
            "@type": "WebSite",
            "@id": SITE_ID,
            url: `${site.url}/`,
            name: site.name,
            description: positioning,
            publisher: { "@id": PERSON_ID },
            inLanguage: "en",
          },
          {
            "@type": "ItemList",
            "@id": `${site.url}/#problems`,
            name: "What are you trying to solve?",
            itemListElement: problemPaths.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.problem,
              url: `${site.url}${p.href}`,
            })),
          },
          {
            "@type": "HowTo",
            "@id": `${site.url}/#process`,
            name: "How the work runs",
            description: "The five-step delivery model used for every engagement.",
            step: process.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.step,
              text: s.detail,
            })),
          },
          {
            "@type": "FAQPage",
            "@id": `${site.url}/#faq`,
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".ds-faq-answer"],
            },
            mainEntity: homeFaqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          {
            "@type": "SiteNavigationElement",
            "@id": `${site.url}/#navigation`,
            name: "Main navigation",
            hasPart: sections.map((s) => ({
              "@type": "SiteNavigationElement",
              name: s.label,
              url: `${site.url}${s.href}`,
            })),
          },
        ],
      }}
    />
  );
}

/** /about — a page whose primary subject is the person described on it. */
export function ProfilePageJsonLd() {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfilePage",
            "@id": `${site.url}/about`,
            url: `${site.url}/about`,
            name: `About ${site.name}`,
            mainEntity: { "@id": PERSON_ID },
            isPartOf: { "@id": SITE_ID },
          },
          personNode,
          breadcrumbNode([
            { name: "Home", item: `${site.url}/` },
            { name: "About", item: `${site.url}/about` },
          ]),
        ],
      }}
    />
  );
}

function breadcrumbNode(trail: { name: string; item: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  };
}

/** Standalone pages that are not a service or a case study. */
export function PageJsonLd({
  name,
  path,
  description,
  trail,
  action,
}: {
  name: string;
  path: string;
  description: string;
  trail?: { name: string; item: string }[];
  action?: object;
}) {
  const url = `${site.url}${path}`;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": url,
            url,
            name,
            description,
            isPartOf: { "@id": SITE_ID },
            about: { "@id": PERSON_ID },
            ...(action ? { potentialAction: action } : {}),
          },
          breadcrumbNode(
            trail ?? [
              { name: "Home", item: `${site.url}/` },
              { name, item: url },
            ],
          ),
        ],
      }}
    />
  );
}

/** A service page: what is offered, who offers it, the trail, and the FAQs
    that are visibly rendered on the same page. */
export function ServiceJsonLd({ service }: { service: Service }) {
  const url = `${site.url}/services/${service.slug}`;

  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": `${url}#service`,
            name: service.title,
            serviceType: service.title,
            description: service.metaDescription,
            url,
            provider: { "@id": PERSON_ID },
            areaServed: { "@type": "Place", name: "Worldwide" },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${service.title} — what is included`,
              itemListElement: service.deliverables.map((d) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: d.title, description: d.detail },
              })),
            },
          },
          {
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".ds-faq-answer"],
            },
            mainEntity: service.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          breadcrumbNode([
            { name: "Home", item: `${site.url}/` },
            { name: "Services", item: `${site.url}/services` },
            { name: service.title, item: url },
          ]),
          personNode,
        ],
      }}
    />
  );
}

/** The services hub — a collection that lists what it contains. */
export function ServicesIndexJsonLd({ services }: { services: Service[] }) {
  const url = `${site.url}/services`;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": url,
            url,
            name: "Services",
            isPartOf: { "@id": SITE_ID },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: services.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.title,
                url: `${url}/${s.slug}`,
              })),
            },
          },
          breadcrumbNode([
            { name: "Home", item: `${site.url}/` },
            { name: "Services", item: url },
          ]),
        ],
      }}
    />
  );
}

/** The work index. */
export function WorkIndexJsonLd({ projects }: { projects: Project[] }) {
  const url = `${site.url}/work`;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": url,
            url,
            name: "Selected production work",
            isPartOf: { "@id": SITE_ID },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.title,
                url: p.caseStudy ? `${url}/${p.slug}` : p.href,
              })),
            },
          },
          breadcrumbNode([
            { name: "Home", item: `${site.url}/` },
            { name: "Work", item: url },
          ]),
        ],
      }}
    />
  );
}

/**
 * A case study. CreativeWork rather than Article: these are project write-ups
 * with a named author and a subject, not dated editorial pieces, and claiming
 * Article for them would misdescribe the page.
 */
export function CaseStudyJsonLd({
  project,
  study,
}: {
  project: Project;
  study: CaseStudy;
}) {
  const url = `${site.url}/work/${project.slug}`;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CreativeWork",
            "@id": url,
            url,
            name: study.h1,
            headline: study.h1,
            description: study.metaDescription,
            author: { "@id": PERSON_ID },
            creator: { "@id": PERSON_ID },
            isPartOf: { "@id": SITE_ID },
            about: {
              "@type": "WebApplication",
              name: project.title,
              url: project.href,
              applicationCategory: project.kind,
            },
            keywords: study.keywords.join(", "),
          },
          breadcrumbNode([
            { name: "Home", item: `${site.url}/` },
            { name: "Work", item: `${site.url}/work` },
            { name: project.title, item: url },
          ]),
          personNode,
        ],
      }}
    />
  );
}

/** The insights hub — a collection page listing the published articles. */
export function InsightsIndexJsonLd({ insights }: { insights: Insight[] }) {
  const url = `${site.url}/insights`;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": url,
            url,
            name: "Insights",
            isPartOf: { "@id": SITE_ID },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: insights.map((i, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                name: i.title,
                url: `${url}/${i.slug}`,
              })),
            },
          },
          breadcrumbNode([
            { name: "Home", item: `${site.url}/` },
            { name: "Insights", item: url },
          ]),
        ],
      }}
    />
  );
}

/**
 * An insight article. Article rather than CreativeWork: these are dated,
 * authored editorial pieces with a headline and a modification date, which is
 * exactly what Article describes — unlike the case studies, which are project
 * write-ups rather than editorial content.
 */
export function ArticleJsonLd({ insight }: { insight: Insight }) {
  const url = `${site.url}/insights/${insight.slug}`;

  const citedCaseStudies = insight.relatedCaseStudySlugs
    .map((slug) => caseStudies.find((cs) => cs.slug === slug))
    .filter((cs): cs is (typeof caseStudies)[number] => Boolean(cs));

  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "@id": url,
            url,
            headline: insight.h1,
            description: insight.metaDescription,
            author: { "@id": PERSON_ID },
            publisher: { "@id": PERSON_ID },
            datePublished: insight.publishedAt,
            dateModified: insight.updatedAt,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            isPartOf: { "@id": SITE_ID },
            about: { "@id": PERSON_ID },
            image: `${site.url}/opengraph-image`,
            keywords: insight.keywords.join(", "),
            ...(citedCaseStudies.length > 0 || (insight.references?.length ?? 0) > 0
              ? {
                  citation: [
                    ...citedCaseStudies.map((cs) => ({
                      "@type": "CreativeWork",
                      name: cs.title,
                      url: `${site.url}/work/${cs.slug}`,
                    })),
                    ...(insight.references ?? []).map((r) => ({
                      "@type": "CreativeWork",
                      name: r.label,
                      url: r.url,
                    })),
                  ],
                }
              : {}),
          },
          ...(insight.faqs && insight.faqs.length > 0
            ? [
                {
                  "@type": "FAQPage",
                  "@id": `${url}#faq`,
                  speakable: {
                    "@type": "SpeakableSpecification",
                    cssSelector: [".ds-faq-answer"],
                  },
                  mainEntity: insight.faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                },
              ]
            : []),
          breadcrumbNode([
            { name: "Home", item: `${site.url}/` },
            { name: "Insights", item: `${site.url}/insights` },
            { name: insight.title, item: url },
          ]),
          personNode,
        ],
      }}
    />
  );
}
