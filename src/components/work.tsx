import Link from "next/link";
import { featuredProjects, projects, type Project } from "@/content/work";
import { Plate } from "./plate";
import { ArrowIcon, ExternalIcon, Reveal, Section, SectionHeading } from "./ui";
import { cn } from "@/lib/cn";

/* ── Featured card ──────────────────────────────────────────────────────────
   The whole card is the link to the case study. The live-site link sits
   outside that anchor, because nesting an <a> inside an <a> is invalid and
   browsers resolve it in ways nobody intends. */

function FeaturedCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="ds-card ds-card-interactive group flex h-full flex-col overflow-hidden">
      <Link href={`/work/${project.slug}`} className="block">
        <Plate project={project} className="border-b border-border" priority={priority} />
      </Link>

      <div className="flex flex-1 flex-col p-7">
        <p className="ds-meta">{project.kind}</p>

        <h3 className="ds-title mt-3">
          <Link
            href={`/work/${project.slug}`}
            className="transition-colors group-hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p className="ds-body-sm mt-3 flex-1">{project.blurb}</p>

        {project.metrics && (
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5">
            {project.metrics.map((m) => (
              <div key={m.k}>
                <dt className="ds-meta">{m.k}</dt>
                <dd
                  className={cn(
                    "mt-1 font-display text-[1.0625rem] font-medium",
                    m.verified ? "text-success" : "text-ink",
                  )}
                >
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-6 flex items-center justify-between gap-4">
          <Link href={`/work/${project.slug}`} className="ds-link">
            Read case study
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-body-sm inline-flex items-center gap-1.5 transition-colors hover:text-ink"
            >
              {project.domain}
              <ExternalIcon className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ── Supporting card ────────────────────────────────────────────────────────
   No case study behind these, so the card links out to the live site and says
   so, rather than promising a page that does not exist. */

function SupportingCard({ project }: { project: Project }) {
  return (
    <article className="ds-card ds-card-interactive group flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="ds-meta">{project.kind}</p>
          <h3 className="ds-title-sm mt-2.5">{project.title}</h3>
        </div>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} in a new tab`}
            className="mt-0.5 shrink-0 text-ink-soft transition-colors hover:text-accent"
          >
            <ExternalIcon />
          </a>
        )}
      </div>

      <p className="ds-body-sm mt-3.5 flex-1">{project.blurb}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
        {project.tools.slice(0, 4).map((t) => (
          <li key={t} className="ds-chip text-[0.75rem]">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ── Homepage: selected work ────────────────────────────────────────────── */

export function SelectedWork({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="work" tone={tone}>
      <SectionHeading
        overline="Selected work"
        title="Proof before pitch"
        description="A few production projects that show how I approach product interfaces, performance and real-world delivery. Each case study covers what I built, the problem it addressed and the technical decisions behind it."
        align="between"
        aside={
          <Link href="/work" className="ds-btn ds-btn-secondary">
            All projects
            <ArrowIcon />
          </Link>
        }
      />

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {featuredProjects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 0.05} className="h-full">
            <FeaturedCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ── /work: the full index ──────────────────────────────────────────────── */

export function WorkIndex() {
  const supporting = projects.filter((p) => !p.featured);

  return (
    <>
      <Section tone="plain">
        <SectionHeading
          overline="Case studies"
          title="Three projects, written up properly"
          description="The work where there is enough to say that a page is worth reading: the problem, my role, the decisions and what actually came out of it."
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {featuredProjects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.05} className="h-full">
              <FeaturedCard project={project} priority={i === 0} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="soft">
        <SectionHeading
          overline="Also shipped"
          title="Further production work"
          description="Live projects without a full case study behind them — commerce, marketplace, healthcare and CMS builds. Each one links to the running site."
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supporting.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.04} className="h-full">
              <SupportingCard project={project} />
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}

/** Related work, rendered at the foot of a service or case-study page. */
export function RelatedWork({
  slugs,
  heading = "Relevant proof",
  description,
  tone = "soft",
  exclude,
}: {
  slugs: string[];
  heading?: string;
  description?: string;
  tone?: "plain" | "soft" | "deep";
  exclude?: string;
}) {
  const related = slugs
    .filter((s) => s !== exclude)
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));

  if (related.length === 0) return null;

  return (
    <Section tone={tone}>
      <SectionHeading overline="Proof" title={heading} description={description} />
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {related.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 0.05} className="h-full">
            {project.caseStudy ? (
              <FeaturedCard project={project} />
            ) : (
              <SupportingCard project={project} />
            )}
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
