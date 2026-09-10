import Link from "next/link";
import { featuredProjects, projects, type Project } from "@/content/work";
import { Plate } from "./plate";
import { ArrowIcon, ExternalIcon, Reveal, Section, SectionHeading } from "./ui";
import { OutboundLink } from "./outbound";
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

        {/* Role and scope on the card, not buried in the case study. On
            collaborative and outsourced work, saying nothing reads as
            claiming everything. */}
        <p className="mt-2 text-[0.8125rem] text-ink-soft">
          {project.role} · {project.scope}
        </p>

        {/* Problem and outcome, labelled. This is what makes a card scannable
            against three others: a reader comparing projects is asking what
            was wrong and what changed, not for a summary sentence. */}
        <dl className="mt-5 flex-1 space-y-3.5">
          <div>
            <dt className="ds-meta">Problem</dt>
            <dd className="ds-body-sm mt-1">{project.problem}</dd>
          </div>
          <div>
            <dt className="ds-meta">Outcome</dt>
            <dd className="ds-body-sm mt-1">{project.outcome}</dd>
          </div>
        </dl>

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
            <OutboundLink
              href={project.href}
              event="case_study_view"
              payload={{ project: project.slug }}
              className="ds-body-sm inline-flex items-center gap-1.5 transition-colors hover:text-ink"
            >
              {project.domain}
              <ExternalIcon className="h-3.5 w-3.5" />
            </OutboundLink>
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
          <OutboundLink
            href={project.href}
            event="case_study_view"
            payload={{ project: project.slug }}
            ariaLabel={`Open ${project.title} in a new tab`}
            className="mt-0.5 shrink-0 text-ink-soft transition-colors hover:text-accent"
          >
            <ExternalIcon />
          </OutboundLink>
        )}
      </div>

      <p className="mt-2 text-[0.8125rem] text-ink-soft">{project.role}</p>

      <p className="ds-body-sm mt-3 flex-1">{project.outcome}</p>

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

/**
 * Projects grouped by the problem they solved, not by the technology used.
 *
 * A buyer arriving at an evidence library is asking "has this person solved my
 * problem before", and a stack list cannot answer that — two projects sharing
 * React tells them nothing about whether either one resembles their situation.
 * Grouping by problem lets someone with a slow platform, or a site that has
 * outgrown its CMS, find the relevant proof without reading all seven.
 *
 * The `problems` array on each group is matched against project slugs rather
 * than inferred, so a project's placement is a deliberate editorial decision
 * rather than a keyword coincidence.
 */
const PROBLEM_GROUPS: { label: string; description: string; slugs: string[] }[] = [
  {
    label: "Performance & platform health",
    description:
      "Products that worked but had become slow to load or slow to change, where the fix was measured rather than guessed at.",
    slugs: ["sunhub"],
  },
  {
    label: "Rebuilds & migrations",
    description:
      "Sites and platforms that had outgrown what they were built on — including a marketplace moved off WordPress onto Next.js.",
    slugs: ["verdira", "aussiemotor"],
  },
  {
    label: "New product surfaces",
    description:
      "Interfaces built from structure upward: marketing sites, storefronts and portals that had to carry content and features they did not have yet.",
    slugs: ["cennetsol", "vape-planet", "digestive-care", "talha-estate"],
  },
];

export function WorkIndex() {
  return (
    <>
      {PROBLEM_GROUPS.map((group, groupIndex) => {
        const items = group.slugs
          .map((slug) => projects.find((p) => p.slug === slug))
          .filter((p): p is Project => Boolean(p));

        if (items.length === 0) return null;

        return (
          <Section key={group.label} tone={groupIndex % 2 === 0 ? "plain" : "soft"}>
            <SectionHeading
              overline={`0${groupIndex + 1} · ${items.length} ${items.length === 1 ? "project" : "projects"}`}
              title={group.label}
              description={group.description}
            />
            <ul
              className={cn(
                "grid gap-6 lg:gap-7",
                items.length === 1 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {items.map((project, i) => (
                <Reveal as="li" key={project.slug} delay={i * 0.05} className="h-full">
                  {project.caseStudy ? (
                    <FeaturedCard project={project} priority={groupIndex === 0 && i === 0} />
                  ) : (
                    <SupportingCard project={project} />
                  )}
                </Reveal>
              ))}
            </ul>
          </Section>
        );
      })}
    </>
  );
}

/** Related work, rendered at the foot of a service or case-study page. */
export function RelatedWork({
  id,
  slugs,
  heading = "Relevant proof",
  description,
  tone = "soft",
  exclude,
}: {
  id?: string;
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
    <Section id={id} tone={tone}>
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
