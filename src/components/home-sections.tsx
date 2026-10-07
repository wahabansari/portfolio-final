import Link from "next/link";
import { featuredProjects, type Project } from "@/content/work";
import { assurances, problemPaths, process as processSteps, site } from "@/content/site";
import { OutboundLink } from "./outbound";
import { SERVICE_ICONS } from "./services";
import { CheckCircleIcon } from "./home-svg";
import { ProcessTimeline } from "./process";
import {
  ArrowIcon,
  ChevronRightIcon,
  CodeIcon,
  GaugeIcon,
  LayoutIcon,
  RefreshIcon,
  Reveal,
  Section,
  SectionHeading,
  UserIcon,
} from "./ui";

/*
 * Homepage sections. Each one is short on purpose: an icon, a title and one
 * line. The detail lives on the service, work and About pages they link to;
 * every line below comes from content/site.ts, content/services.ts or
 * content/work.ts, never a new claim.
 */

type Tone = "plain" | "soft" | "deep";

const ICON_TILE =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent";

/* ── 1. What are you trying to solve? ───────────────────────────────────── */

export function ProblemPaths({ tone = "plain" }: { tone?: Tone }) {
  return (
    <Section id="solve" tone={tone}>
      <SectionHeading
        overline=""
        title="What are you trying to solve?"
        description="Pick the situation closest to yours. Each one goes straight to the service that fits."
      />
      {/* Ruled rows rather than tiles: the sentence is the thing being chosen,
          so it is set large, with the destination and an arrow on the right. */}
      <ul className="mx-auto grid max-w-6xl border-b border-border md:grid-cols-2 md:gap-x-12">
        {problemPaths.map((path, i) => {
          const slug = path.href.split("/").pop() ?? "";
          const Icon = SERVICE_ICONS[slug] ?? CodeIcon;
          return (
            <Reveal as="li" key={path.href} delay={i * 0.05} className="border-t border-border md:[&:nth-child(n+3)]:border-t">
              <Link
                href={path.href}
                data-track="cta_click"
                data-track-label={`problem:${slug}`}
                className="group -mx-3 flex items-center gap-4 rounded-2xl px-3 py-6 transition-colors duration-200 hover:bg-accent-soft"
              >
                <span className={ICON_TILE}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[1.1875rem] font-semibold leading-snug tracking-[-0.015em] text-fg">
                    {path.problem}
                  </span>
                  <span className="mt-1 block text-[0.875rem] text-fg-muted">{path.label}</span>
                </span>
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-all duration-200 group-hover:translate-x-0.5 group-hover:border-accent group-hover:bg-accent-deep group-hover:text-accent-fg"
                >
                  <ArrowIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

/* ── 2. Results ─────────────────────────────────────────────────────────── */

function ProjectIcon({ kind, className }: { kind: string; className?: string }) {
  const k = kind.toLowerCase();
  if (k.includes("performance")) return <GaugeIcon className={className} />;
  if (k.includes("migration")) return <RefreshIcon className={className} />;
  if (k.includes("auth") || k.includes("application")) return <UserIcon className={className} />;
  return <LayoutIcon className={className} />;
}

function ResultCard({ project }: { project: Project }) {
  const isCaseStudy = Boolean(project.caseStudy);
  const isExternal = Boolean(project.href && !project.caseStudy);

  const inner = (
    <>
      <span className={ICON_TILE}>
        <ProjectIcon kind={project.kind} className="h-5 w-5" />
      </span>
      <p className="ds-meta mt-5">{project.kind}</p>
      <h3 className="ds-h3 mt-1">{project.title}</h3>
      <p className="ds-body-sm mt-3">{project.outcome}</p>
      {(isCaseStudy || isExternal) && (
        <span className="ds-link mt-auto pt-5 text-[0.9375rem]">
          {isExternal ? "Visit the site" : "Read the case study"}
          <ArrowIcon className="h-3 w-3" />
        </span>
      )}
    </>
  );

  const cls = "group ds-card ds-card-interactive flex h-full flex-col p-7";
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

export function WorkResults({ tone = "soft" }: { tone?: Tone }) {
  return (
    <Section id="work" tone={tone}>
      <SectionHeading
        overline=""
        title="Selected work"
        description="Real products, each one linked to its case study or live site."
      />
      <ul className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={i * 0.06} className="h-full">
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

/* ── 3. How it works ────────────────────────────────────────────────────── */

export function HowItWorks({ tone = "plain" }: { tone?: Tone }) {
  return (
    <Section id="process" tone={tone}>
      <SectionHeading
        overline=""
        title="How we work"
        description="The same five steps whichever service applies."
      />
      <ProcessTimeline steps={processSteps} />
    </Section>
  );
}

/* ── 4. Why Craftwise ───────────────────────────────────────────────────── */

export function WhyMe({ tone = "plain" }: { tone?: Tone }) {
  return (
    <Section id="why" tone={tone}>
      <SectionHeading overline="" title="Why Craftwise" />
      <ul className="mx-auto grid max-w-5xl gap-x-10 gap-y-10 md:grid-cols-3">
        {assurances.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 0.08}>
            <CheckCircleIcon className="h-9 w-9 text-accent" />
            <h3 className="ds-title mt-4">{item.title}</h3>
            <p className="ds-body-sm mt-1.5">{item.detail}</p>
          </Reveal>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <Link href="/about" className="ds-link text-[0.9375rem]">
          Who is behind Craftwise?
          <ChevronRightIcon />
        </Link>
      </div>
    </Section>
  );
}

/* ── 5. Close ───────────────────────────────────────────────────────────── */

export function HomeClose({ tone = "plain" }: { tone?: Tone }) {
  return (
    <Section id="contact" tone={tone}>
      <Reveal>
        <div className="theme-tint rounded-[28px] px-6 py-12 text-center md:px-14 md:py-16">
          <h2 className="ds-h1 mx-auto max-w-2xl">Have a project in mind?</h2>
          <p className="body-large mx-auto mt-4 max-w-xl">
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
