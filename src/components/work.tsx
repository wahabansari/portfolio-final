import Link from "next/link";
import { featuredProjects, projects, type Project } from "@/content/work";
import { cn } from "@/lib/cn";
import { OutboundLink } from "./outbound";
import { Plate } from "./plate";
import {
  ArrowIcon,
  BriefcaseIcon,
  ExternalIcon,
  GaugeIcon,
  LayersIcon,
  LayoutIcon,
  RefreshIcon,
  Reveal,
  Section,
  ServerIcon,
  UsersIcon,
} from "./ui";

/* Plate archetype → icon, the same keyed-lookup pattern SERVICE_ICONS uses
   in services.tsx, so the proof grid can carry an icon without inventing a
   second taxonomy for it. */
const PROJECT_ICONS: Record<Project["plate"], React.ComponentType<{ className?: string }>> = {
  platform: GaugeIcon,
  marketing: LayoutIcon,
  app: ServerIcon,
  commerce: BriefcaseIcon,
  marketplace: RefreshIcon,
  portal: UsersIcon,
  listing: LayersIcon,
};

/* ── Section heading — the shared "Proof before pitch" block ─────────── */

function WorkHeading({ viewAll = true }: { viewAll?: boolean }) {
  return (
    <div className="mb-12 flex items-end justify-between gap-8">
      <div>
        <span className="ds-overline-accent mb-4 block">Selected work</span>
        <h2 className="ds-h2">Proof before pitch</h2>
      </div>
      {viewAll && (
        <Link
          href="/work"
          className="hidden items-center gap-2 text-[1rem] font-medium text-fg underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline md:inline-flex"
        >
          View all
          <ArrowIcon className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/**
 * Proof card — one project on the curated proof wall.
 *
 * A compact card rather than a full-width panel: kind overline, a Bricolage
 * title, the one-line blurb, the stack as chips, then a pinned footer row
 * carrying the CTA. The whole card is one link (internal to the case study,
 * external to the live site); hover lifts the card via .ds-card-interactive.
 */
function ProofCard({ project, index }: { project: Project; index: number }) {
  const isCaseStudy = Boolean(project.caseStudy);
  const isExternal = Boolean(project.href && !project.caseStudy);
  const hasLink = isCaseStudy || isExternal;
  const label = isExternal ? "View live project" : "View case study";

  const inner = (
    <>
      <Plate project={project} className="border-b border-border" />
      <div className="flex h-full flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="ds-overline-accent">{project.kind}</span>
          <span
            aria-hidden
            className="font-display text-[1.375rem] font-semibold leading-none tracking-[-0.02em] text-ink-soft tabular-nums"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="ds-h3 mt-5">{project.title}</h3>
        <p className="ds-body-sm mt-3">{project.blurb}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tools.slice(0, 5).map((tool) => (
            <li key={tool} className="ds-chip">
              {tool}
            </li>
          ))}
        </ul>

        {/* Only when the card actually goes somewhere — otherwise this reads
            as "View case study" on a project with no case study to view. */}
        {hasLink && (
          <span className="mt-auto pt-6">
            <span className="flex items-center justify-between gap-4 border-t border-border pt-5">
              <span className="text-[0.9375rem] font-medium text-fg transition-colors duration-200 group-hover:text-accent">
                {label}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-fg-subtle transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
                {isExternal ? <ExternalIcon className="h-3.5 w-3.5" /> : <ArrowIcon className="h-3.5 w-3.5" />}
              </span>
            </span>
          </span>
        )}
      </div>
    </>
  );

  const cardClass =
    "group ds-card ds-card-interactive flex h-full flex-col overflow-hidden p-0";

  if (isCaseStudy) {
    return (
      <Link
        href={`/work/${project.slug}`}
        data-track="cta_click"
        data-track-label={`work:${project.slug}`}
        className={cardClass}
      >
        {inner}
      </Link>
    );
  }

  if (isExternal) {
    return (
      <OutboundLink
        href={project.href as string}
        event="case_study_view"
        payload={{ project: project.slug }}
        className={cardClass}
        ariaLabel={`Open ${project.title} in a new tab`}
      >
        {inner}
      </OutboundLink>
    );
  }

  return <div className={cn(cardClass, "cursor-default")}>{inner}</div>;
}

/**
 * A quiet list row — index | title + scope | arrow.
 * Used for "related proof" on detail pages and the long tail on /work,
 * where the big cards would compete with the page itself.
 */
function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isExternal = Boolean(project.href && !project.caseStudy);

  const content = (
    <>
      <span className="font-display text-[1.25rem] font-semibold leading-none tracking-[-0.02em] text-ink-soft tabular-nums transition-colors duration-150 group-hover:text-accent md:text-[1.5rem]">
        {String(index).padStart(2, "0")}
      </span>

      <span className="min-w-0">
        <span className="block text-[1.375rem] font-medium leading-snug tracking-[-0.02em] text-fg transition-colors duration-150 group-hover:text-accent md:text-[1.5rem]">
          {project.title}
        </span>
        <span className="ds-meta mt-1 block">{project.scope}</span>
      </span>

      <span className="flex items-center justify-end text-fg-subtle transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-accent">
        <ArrowIcon className="h-4 w-4" />
      </span>
    </>
  );

  const rowClass =
    "group grid grid-cols-[40px_1fr_24px] items-center gap-4 border-b border-border py-7 transition-colors duration-200 hover:bg-surface-hover md:grid-cols-[56px_1fr_32px] md:px-4";

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
      data-track-label={`work:${project.slug}`}
      className={rowClass}
    >
      {content}
    </Link>
  );
}

/**
 * One featured project, as a column in the same single-row ledger as the
 * homepage's four offers — icon and index, title, one-line blurb, then the
 * kind pinned to the bottom next to an arrow. Same grid mechanics, same
 * content rhythm, so the two sections read as one consistent system rather
 * than two different ideas about how to lay out three or four things.
 */
function ProofPanel({ project, index }: { project: Project; index: number }) {
  const isCaseStudy = Boolean(project.caseStudy);
  const isExternal = Boolean(project.href && !project.caseStudy);
  const hasLink = isCaseStudy || isExternal;
  const Icon = PROJECT_ICONS[project.plate] || ServerIcon;

  const inner = (
    <>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-fg">
          <Icon className="h-5 w-5" />
        </span>
        <span
          aria-hidden
          className="font-display text-[0.9375rem] font-semibold text-ink-soft tabular-nums"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 font-display text-[1.375rem] font-bold leading-[1.2] tracking-[-0.02em] text-fg transition-colors duration-200 group-hover:text-accent md:text-[1.5rem]">
        {project.title}
      </h3>
      <p className="ds-body-sm mt-3 text-fg-muted">{project.blurb}</p>
      <span className="mt-auto flex items-center gap-3 pt-6">
        <span className="ds-chip">{project.kind}</span>
        {hasLink && (
          <span className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-fg-subtle transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-accent group-hover:text-accent">
            {isExternal ? <ExternalIcon className="h-3.5 w-3.5" /> : <ArrowIcon className="h-3.5 w-3.5" />}
          </span>
        )}
      </span>
    </>
  );

  const panelClass = "group flex h-full flex-col p-8 transition-colors duration-200 hover:bg-accent-soft/40 md:p-9";

  if (isCaseStudy) {
    return (
      <Link
        href={`/work/${project.slug}`}
        data-track="cta_click"
        data-track-label={`work:${project.slug}`}
        className={panelClass}
      >
        {inner}
      </Link>
    );
  }

  if (isExternal) {
    return (
      <OutboundLink
        href={project.href as string}
        event="case_study_view"
        payload={{ project: project.slug }}
        className={panelClass}
        ariaLabel={`Open ${project.title} in a new tab`}
      >
        {inner}
      </OutboundLink>
    );
  }

  return <div className={cn(panelClass, "cursor-default")}>{inner}</div>;
}

/**
 * Selected Work — the homepage proof wall, laid out as the same single-row
 * ledger grid as "Four offers, one accountable engineer": one column per
 * featured project, hairline dividers instead of a card border each.
 */
export function SelectedWork({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="work" tone={tone}>
      <WorkHeading />
      <div className="grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05} className="h-full">
            <ProofPanel project={project} index={i} />
          </Reveal>
        ))}
      </div>
      <div className="mt-6 md:hidden">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[1rem] font-medium text-fg underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline"
        >
          View all projects
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

/* ── /work index ─────────────────────────────────────────────────────── */

export function WorkIndex() {
  const supporting = projects.filter((p) => !p.featured);

  return (
    <Section id="work" tone="plain">
      <div className="mb-12 flex items-end justify-between gap-8">
        <div>
          <span className="ds-overline-accent mb-4 block">All projects</span>
          <h2 className="ds-h2">The proof wall</h2>
        </div>
      </div>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 0.05} className="flex h-full">
            <ProofCard project={project} index={i} />
          </Reveal>
        ))}
      </ul>
      {supporting.length > 0 && (
        <ul className="mt-14 border-t border-border">
          {supporting.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.05}>
              <ProjectRow project={project} index={i + 1} />
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
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
    .filter((s: string) => s !== exclude)
    .map((slug: string) => projects.find((p: Project) => p.slug === slug))
    .filter((p: Project | undefined): p is Project => Boolean(p));

  if (related.length === 0) return null;

  return (
    <Section id={id} tone={tone}>
      <span className="ds-overline-accent mb-4 block">Proof</span>
      <h2 className="ds-h2 mb-4">{heading}</h2>
      {description && (
        <p className="mb-12 max-w-[65ch] text-[1.0625rem] text-fg-muted">{description}</p>
      )}
      <ul className={cn("border-t border-border", !description && "mt-12")}>
        {related.map((project: Project, i: number) => (
          <Reveal as="li" key={project.slug} delay={i * 0.05}>
            <ProjectRow project={project} index={i + 1} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}