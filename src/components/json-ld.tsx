import { experience, services, site, skills, socials, summary } from "@/content/site";

/** Structured data so search engines read this as a person, not a page. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: summary,
    email: `mailto:${site.email}`,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
    knowsAbout: skills.flatMap((g) => g.items),
    worksFor: experience.map((e) => ({
      "@type": "Organization",
      name: e.company,
    })),
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Punjab" },
    ],
    // Advertises the freelance offering alongside the CV.
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.blurb,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
