import Link from "next/link";
import { featuredProjects, type Project } from "@/content/work";
import { OutboundLink } from "./outbound";
import { ArrowIcon, ExternalIcon, Reveal, Section } from "./ui";

/**
 * A single project row — the premium list unit.
 *
 * Grid: index | title + scope | arrow. No year — projects carry `scope`
 * (the shape of the engagement) which reads better than a filler dash.
 * Hairline-separated, whole row clickable, hover accent shifts.
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
      <span className="ds-meta tabular-nums transition-colors duration-150 group-hover:text-accent">
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
    "group grid grid-cols-[32px_1fr_24px] items-center gap-4 border-b border-border py-6 transition-colors duration-200 hover:bg-surface-hover md:grid-cols-[48px_1fr_32px] md:px-4";

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
 * Featured spotlight — the first project, given real presence.
 *
 * A large surface panel: kind + domain over an oversized title, the blurb,
 * then a hairline row carrying scope and the CTA. Hover lifts the corner glow.
 */
function Spotlight({ project }: { project: Project }) {
  const isExternal = Boolean(project.href && !project.caseStudy);

  const inner = (
    <>
      <div className="flex items-center justify-between gap-6">
        <span className="ds-overline-accent">{project.kind}</span>
        <span className="hidden font-mono text-[0.8125rem] tabular-nums text-fg-subtle sm:block">
          {project.domain}
        </span>
      </div>

      <span className="mt-10 block max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.035em] text-fg">
        {project.title}
      </span>

      <p className="body-large mt-6 max-w-xl">{project.blurb}</p>

      <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-4">
          <span className="ds-meta shrink-0">Scope</span>
          <span className="ds-meta text-fg-muted">{project.scope}</span>
        </span>
        <span className="inline-flex items-center gap-3 text-[1rem] font-medium text-fg">
          {isExternal ? "View live project" : "Read case study"}
          <span className="flex h-10 w-10 rotate-[-45deg] items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent transition-all duration-200 group-hover:rotate-0">
            {isExternal ? <ExternalIcon className="h-4 w-4" /> : <ArrowIcon className="h-4 w-4" />}
          </span>
        </span>
      </div>
    </>
  );

  const wrapClass =
    "group relative block overflow-hidden rounded-lg border border-border bg-surface p-8 transition-colors duration-200 hover:border-accent/40 md:p-12";

  return (
    <Reveal>
      {isExternal ? (
        <OutboundLink
          href={project.href as string}
          event="case_study_view"
          payload={{ project: project.slug }}
          className={wrapClass}
          ariaLabel={`Open ${project.title} in a new tab`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-glow blur-[80px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {inner}
        </OutboundLink>
      ) : (
        <Link href={`/work/${project.slug}`} className={wrapClass}>
          <span
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-glow blur-[80px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          {inner}
        </Link>
      )}
    </Reveal>
  );
}

/**
 * Selected Work — the homepage centerpiece.
 *
 * One featured spotlight, then the rest as quiet rows. The list IS the
 * proof — no mockups needed.
 */
export function SelectedWork({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
  const [spot, ...rest] = featuredProjects;

  return (
    <Section id="work" tone={tone}>
      <div className="mb-12 flex items-end justify-between gap-8">
        <div>
          <span className="ds-overline-accent mb-4 block">Selected work</span>
          <h2 className="ds-h2">Proof before pitch</h2>
        </div>
        <Link
          href="/work"
          className="hidden items-center gap-2 text-[1rem] font-medium text-fg underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline md:inline-flex"
        >
          View all
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>

      {spot && <Spotlight project={spot} />}

      <ul className="mt-4 border-t border-border">
        {rest.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 0.05}>
            <ProjectRow project={project} index={i + 2} />
          </Reveal>
        ))}
      </ul>

      <div className="mt-8 border-t border-border pt-6 md:hidden">
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
  return <SelectedWork />;
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
  const { projects } = require("@/content/work");
  const related = slugs
    .filter((s: string) => s !== exclude)
    .map((slug: string) => projects.find((p: Project) => p.slug === slug))
    .filter(Boolean);

  if (related.length === 0) return null;

  return (
    <Section id={id} tone={tone}>
      <span className="ds-overline-accent mb-4 block">Proof</span>
      <h2 className="ds-h2 mb-12">{heading}</h2>
      <ul className="border-t border-border">
        {related.map((project: Project, i: number) => (
          <Reveal as="li" key={project.slug} delay={i * 0.05}>
            <ProjectRow project={project} index={i + 1} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}