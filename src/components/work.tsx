import Link from "next/link";
import { featuredProjects, type Project } from "@/content/work";
import { OutboundLink } from "./outbound";
import { ArrowIcon, ExternalIcon, Reveal, Section } from "./ui";

/**
 * A single project row — the premium list unit.
 *
 * Project name at 500 weight. Role/category and year in quiet meta.
 * Full-width hairline-separated row; hover shifts the row to the surface
 * color and the title to the accent. The list IS the proof — no images.
 */
function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isExternal = Boolean(project.href && !project.caseStudy);
  const rowClass =
    "group grid w-full grid-cols-1 items-center gap-1 border-b border-border py-6 transition-colors duration-200 hover:bg-surface-hover md:grid-cols-[64px_1fr_180px_120px] md:px-4";

  const content = (
    <>
      <span className="ds-meta tabular-nums">{String(index + 1).padStart(2, "0")}</span>

      <span className="text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-fg transition-colors duration-150 group-hover:text-accent md:text-[1.75rem]">
        {project.title}
      </span>

      <span className="ds-meta hidden md:block">{project.role}</span>

      <span className="hidden text-right font-mono text-[0.8125rem] tabular-nums text-fg-subtle md:block">
        {project.year ?? "—"}
      </span>

      <span className="flex items-center justify-end gap-2 text-[0.875rem] text-fg-muted group-hover:text-fg md:hidden">
        {project.role} · {project.year ?? "—"}
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
      data-track-label={`work:${project.slug}`}
      className={rowClass}
    >
      {content}
    </Link>
  );
}

/**
 * Selected Work — the homepage centerpiece.
 *
 * A single-column curated list of projects. Hairline-separated rows,
 * hover-state color shift, quiet meta. No cards.
 */
export function SelectedWork({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="work" tone={tone}>
      <div className="ds-container">
        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <span className="ds-overline mb-4 block">Selected work</span>
            <h2 className="ds-h2">Selected work</h2>
          </div>
          <Link href="/work" className="hidden items-center gap-2 text-[1rem] font-medium text-fg underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline md:inline-flex">
            View all
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>

        <ul className="border-t border-border">
          {featuredProjects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 0.05}>
              <ProjectRow project={project} index={i} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-8 md:hidden">
          <Link href="/work" className="inline-flex items-center gap-2 text-[1rem] font-medium text-fg underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline">
            View all projects
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
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
      <div className="ds-container">
        <span className="ds-overline mb-4 block">Proof</span>
        <h2 className="ds-h2 mb-12">{heading}</h2>
        <ul className="border-t border-border">
          {related.map((project: Project, i: number) => (
            <Reveal as="li" key={project.slug} delay={i * 0.05}>
              <ProjectRow project={project} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}