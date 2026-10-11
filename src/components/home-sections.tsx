import Link from "next/link";
import { featuredProjects, type Project } from "@/content/work";
import { process as processSteps, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { OutboundLink } from "./outbound";
import { ProcessTimeline } from "./process";
import { Plate } from "./plate";
import { ArrowIcon, ChevronRightIcon, Reveal, Section, SectionHeading } from "./ui";

/*
 * Homepage sections, bento edition. The routing layer (problem → service)
 * lives in services.tsx as four bento cards and the "why" reasons live with
 * the testimonials in trust.tsx — what is left here is the work grid, the
 * process, and the close. Every line comes from content/site.ts or
 * content/work.ts, never a new claim.
 */

type Tone = "plain" | "soft" | "deep";

/* ── Results ─────────────────────────────────────────────────────────── */

/**
 * One project as a bento tile. `wide` is the lead card: the plate takes the
 * left half and the outcome the right, so the first case study reads as the
 * anchor of the grid rather than as a taller copy of the small ones.
 */
function ResultCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const isCaseStudy = Boolean(project.caseStudy);
  const isExternal = Boolean(project.href && !project.caseStudy);

  const content = (
    <div className="flex flex-1 flex-col p-6 md:p-7">
      <p className="ds-meta">{project.kind}</p>
      <h3
        className={cn(
          "mt-1 font-semibold tracking-[-0.02em] text-fg",
          wide ? "text-[1.375rem] leading-tight md:text-[1.5rem]" : "ds-h3",
        )}
      >
        {project.title}
      </h3>
      <p className="ds-body-sm mt-3">{project.outcome}</p>
      {(isCaseStudy || isExternal) && (
        <span className="ds-link mt-auto pt-5 text-[0.9375rem]">
          {isExternal ? "Visit the site" : "Read the case study"}
          <ArrowIcon className="h-3 w-3" />
        </span>
      )}
    </div>
  );

  const inner = wide ? (
    <>
      {/* The plate keeps its own 16:10 ratio — at half-card width it is what
          sets the row height, so the lead card is taller than the small ones
          without anyone asking it to be. */}
      <Plate project={project} className="border-b border-border-subtle md:border-r md:border-b-0" />
      {content}
    </>
  ) : (
    <>
      <Plate project={project} className="shrink-0 border-b border-border-subtle" />
      {content}
    </>
  );

  const cls = cn(
    "group ds-card ds-card-interactive h-full overflow-hidden",
    wide ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-col",
  );
  if (isCaseStudy) {
    return (
      <Link
        href={`/work/${project.slug}`}
        data-track="cta_click"
        data-track-label={`home-work:${project.slug}`}
        className={cls}
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
        className={cls}
        ariaLabel={`Open ${project.title} in a new tab`}
      >
        {inner}
      </OutboundLink>
    );
  }
  return <div className={cls}>{inner}</div>;
}

/**
 * The work grid: one wide lead case across the top, the two supporting
 * projects beneath it. Asymmetric on purpose — an even three-up would read
 * as a gallery, and the bento reads as a hierarchy.
 */
export function WorkResults({ tone = "soft", size = "default" }: { tone?: Tone; size?: "default" | "roomy" }) {
  const [lead, ...rest] = featuredProjects;

  return (
    <Section id="work" tone={tone} size={size}>
      <SectionHeading
        title="Selected work"
        description="Real products, each one linked to its case study or live site."
      />
      <ul className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-6">
        {lead && (
          <Reveal as="li" className="h-full md:col-span-2 lg:col-span-6">
            <ResultCard project={lead} wide />
          </Reveal>
        )}
        {rest.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={(i + 1) * 0.06} className="h-full lg:col-span-3">
            <ResultCard project={project} />
          </Reveal>
        ))}
      </ul>
      <div className="mt-8 text-center">
        <Link href="/work" className="ds-link text-[0.9375rem]">
          View all work
          <ChevronRightIcon />
        </Link>
      </div>
    </Section>
  );
}

/* ── How it works ────────────────────────────────────────────────────── */

export function HowItWorks({ tone = "plain" }: { tone?: Tone }) {
  return (
    <Section id="process" tone={tone}>
      <SectionHeading
        title="How we work"
        description="The same five steps whichever service applies."
      />
      <ProcessTimeline steps={processSteps} />
    </Section>
  );
}

/* ── Close ───────────────────────────────────────────────────────────── */

export function HomeClose({ tone = "plain", size = "default" }: { tone?: Tone; size?: "default" | "roomy" }) {
  return (
    <Section id="contact" tone={tone} size={size}>
      <Reveal>
        <div className="theme-tint rounded-[20px] border border-border px-6 py-12 text-center md:px-14 md:py-16">
          <h2 className="ds-h1 mx-auto max-w-2xl">Have a project in mind?</h2>
          <p className="ds-lede mx-auto mt-4 max-w-xl">
            Tell us what you are building, what needs to change, or where your current system is getting in the way.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              data-track="cta_click"
              data-track-label="home-contact"
              className="ds-btn ds-btn-primary"
            >
              Start a project
            </Link>
            <a
              href={`mailto:${site.email}`}
              data-track="email_click"
              data-track-label="home-contact"
              className="ds-link px-3 py-2 text-[0.9375rem]"
            >
              Email {site.email}
              <ChevronRightIcon />
            </a>
          </div>

          {site.available && (
            <p className="ds-meta mt-6 inline-flex items-center gap-2">
              <span className="ds-dot" aria-hidden />
              {site.availabilityNote}
            </p>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
