import Link from "next/link";
import { featuredProjects, projects, type Project } from "@/content/work";
import { OutboundLink } from "./outbound";
import { ArrowIcon, ExternalIcon, Reveal, Section, SectionHeading } from "./ui";
import { cn } from "@/lib/cn";

/* ── Editorial project row ──────────────────────────────────────────────────
   The work section's unit is a full-width row, not a card: one project per
   line, numbered, divided by a hairline, with a metric column as the visual
   anchor and an arrow circle for the interaction. The row is the anchor, so
   the whole line is hoverable. Projects without a case study link straight to
   the live site and say so with an external icon in the arrow. */

function ProjectRow({
  project,
  index,
  trackLabel,
}: {
  project: Project;
  index: number;
  trackLabel?: string;
}) {
  const isExternal = Boolean(project.href && !project.caseStudy);
  const rowClass =
    "group grid grid-cols-1 items-center gap-x-8 gap-y-3 border-b border-border py-7 transition-colors hover:bg-surface md:grid-cols-12 md:py-8";

  const content = (
    <>
      {/* Number */}
      <span className="md:col-span-2 md:pl-2">
        <span
          aria-hidden
          className="font-display text-[0.875rem] font-medium text-ink-soft tabular-nums transition-colors group-hover:text-accent"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>

      {/* Title + kind */}
      <span className="md:col-span-3">
        <span className="flex items-baseline gap-2.5">
          <span className="font-display text-2xl leading-tight font-medium tracking-[-0.012em] text-ink transition-colors group-hover:text-accent md:text-[1.625rem]">
            {project.title}
          </span>
          {project.domain && (
            <span className="ds-meta hidden xl:inline">{project.domain}</span>
          )}
        </span>
        <span className="ds-meta mt-1 block">{project.kind}</span>
      </span>

      {/* Outcome */}
      <span className="ds-body-sm text-ink-muted md:col-span-3">{project.outcome}</span>

      {/* Metric, or the tools when there is no measured figure. */}
      <span className="md:col-span-3">
        {project.metrics?.[0] ? (
          <>
            <span
              className={cn(
                "font-display text-[1.375rem] leading-none font-medium tracking-[-0.012em]",
                project.metrics[0].verified ? "text-accent" : "text-ink",
              )}
            >
              {project.metrics[0].v}
            </span>
            <span className="ds-meta mt-1.5 block">{project.metrics[0].k}</span>
          </>
        ) : (
          <span className="ds-meta normal-case">
            {project.tools.slice(0, 3).join(" · ")}
          </span>
        )}
      </span>

      {/* Arrow. External links use the external glyph so nobody is surprised
          to leave the site. */}
      <span className="flex md:col-span-1 md:justify-end md:pr-2">
        <span
          aria-hidden
          className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink-soft transition-[background-color,color] duration-200 group-hover:bg-surface-blue group-hover:text-accent"
        >
          {isExternal ? (
            <ExternalIcon className="h-4 w-4" />
          ) : (
            <ArrowIcon className="h-4 w-4" />
          )}
        </span>
      </span>
    </>
  );

  if (isExternal) {
    return (
      <OutboundLink
        href={project.href as string}
        event="case_study_view"
        payload={{ project: project.slug }}
        className={rowClass}
        ariaLabel={`Open ${project.title} in a new tab`}
      >
        {content}
      </OutboundLink>
    );
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      data-track="cta_click"
      data-track-label={trackLabel ?? `work:${project.slug}`}
      className={rowClass}
    >
      {content}
    </Link>
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
        size="sm"
        aside={
          <Link href="/work" className="ds-btn ds-btn-secondary">
            All projects
            <ArrowIcon />
          </Link>
        }
      />

      <ul className="border-t border-border">
        {featuredProjects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 0.05}>
            <ProjectRow
              project={project}
              index={i}
              trackLabel={`home-work:${project.slug}`}
            />
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
            <ul className="border-t border-border">
              {items.map((project, i) => (
                <Reveal as="li" key={project.slug} delay={i * 0.05}>
                  <ProjectRow project={project} index={i} />
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
      <ul className="border-t border-border">
        {related.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 0.05}>
            <ProjectRow project={project} index={i} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}