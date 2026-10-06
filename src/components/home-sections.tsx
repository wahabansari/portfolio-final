import Link from "next/link";
import { featuredProjects, type Project } from "@/content/work";
import {
  assurances,
  capabilities,
  engagements,
  problemPaths,
  process as processSteps,
  site,
} from "@/content/site";
import { OutboundLink } from "./outbound";
import { SERVICE_ICONS } from "./services";
import { CheckCircleIcon, TimelineLine } from "./home-svg";
import {
  ArrowIcon,
  BriefcaseIcon,
  ChevronRightIcon,
  CodeIcon,
  CompassIcon,
  FileCheckIcon,
  GaugeIcon,
  LayersIcon,
  LayoutIcon,
  MailIcon,
  RefreshIcon,
  Reveal,
  RocketIcon,
  SearchIcon,
  Section,
  SectionHeading,
  ServerIcon,
  UserIcon,
  UsersIcon,
} from "./ui";

/*
 * Homepage sections. Each one is short on purpose: an icon, a title and one
 * line. The detail lives on the service and case-study pages they link to;
 * every line below is a compression of text that already exists in
 * content/site.ts or content/work.ts, never a new claim.
 */

type Tone = "plain" | "soft" | "deep";

const ICON_TILE =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent";

/* ── 1. What do you need fixed? ─────────────────────────────────────────── */

export function ProblemPaths({ tone = "plain" }: { tone?: Tone }) {
  return (
    <Section id="services" tone={tone}>
      <SectionHeading
        overline=""
        title="What do you need fixed?"
        description="Pick your situation. Each one goes straight to the service that solves it."
      />
      <ul className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {problemPaths.map((path, i) => {
          const slug = path.href.split("/").pop() ?? "";
          const Icon = SERVICE_ICONS[slug] ?? CodeIcon;
          return (
            <Reveal as="li" key={path.href} delay={i * 0.05} className="h-full">
              <Link
                href={path.href}
                data-track="cta_click"
                data-track-label={`problem:${slug}`}
                className="group ds-card ds-card-interactive flex h-full items-start gap-4 p-6"
              >
                <span className={ICON_TILE}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="ds-title block">{path.problem}</span>
                  <span className="ds-link mt-2 text-[0.875rem]">
                    {path.label}
                    <ArrowIcon className="h-3 w-3" />
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
      <div className="mt-8 text-center">
        <Link href="/services" className="ds-link text-[0.9375rem]">
          Compare all services
          <ChevronRightIcon />
        </Link>
      </div>
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
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tools.slice(0, 3).map((tool) => (
          <li key={tool} className="ds-chip">
            {tool}
          </li>
        ))}
      </ul>
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
        title="Results you can check"
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
          All projects
          <ChevronRightIcon />
        </Link>
      </div>
    </Section>
  );
}

/* ── 3. How it works ────────────────────────────────────────────────────── */

const STEP_ICONS = [CompassIcon, LayoutIcon, CodeIcon, GaugeIcon, RocketIcon];

export function HowItWorks({ tone = "plain" }: { tone?: Tone }) {
  return (
    <Section id="process" tone={tone}>
      <SectionHeading
        overline=""
        title="Idea to shipped, in five steps"
        description="The same path whichever service applies."
      />
      <Reveal>
        <ol className="relative mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          <TimelineLine className="pointer-events-none absolute left-[10%] right-[10%] top-[1.375rem] hidden h-1 w-[80%] text-accent/35 lg:block" />
          {processSteps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? CodeIcon;
            return (
              <li key={step.step} className="relative flex flex-col items-center text-center">
                <span
                  className="pop relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-accent-deep text-accent-fg"
                  style={{ ["--d" as string]: 0.25 + i * 0.28 }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="ds-title mt-4">{step.step}</h3>
                <p className="ds-body-sm mt-1.5 max-w-[16rem]">{step.benefit}</p>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </Section>
  );
}

/* ── 4. What I build with ───────────────────────────────────────────────── */

const GROUP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: CodeIcon,
  "Product engineering": LayoutIcon,
  "Backend capability": ServerIcon,
  Performance: GaugeIcon,
  Delivery: RocketIcon,
};

export function StackGrid({ tone = "soft" }: { tone?: Tone }) {
  return (
    <Section id="stack" tone={tone}>
      <SectionHeading
        overline=""
        title="What I build with"
        description="Typed React in production, plus enough backend to own a feature end to end."
      />
      <ul className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((group, i) => {
          const Icon = GROUP_ICONS[group.title] ?? LayersIcon;
          return (
            <Reveal as="li" key={group.title} delay={i * 0.05} className="h-full">
              <div className="ds-card h-full p-6">
                <div className="flex items-center gap-3">
                  <span className={ICON_TILE}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="ds-title">{group.title}</h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.lead.map((item) => (
                    <li key={item} className="ds-chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

/* ── 5. Why teams hire me ───────────────────────────────────────────────── */

/* One line each, compressed from the longer `assurances` copy. Keyed by the
   assurance title so a reworded assurance cannot silently pick up the wrong
   line. */
const ASSURANCE_LINES: Record<string, string> = {
  "You work directly with me": "No account manager. The person who scopes it writes it.",
  "Scope is agreed before code exists": "What is in and what is out, in writing first.",
  "Performance is measured before and after": "A baseline, the change, then a second measurement.",
  "I leave code your team can extend": "Typed, documented, ready to hand over.",
};

export function WhyMe({ tone = "plain" }: { tone?: Tone }) {
  return (
    <Section id="why" tone={tone}>
      <SectionHeading overline="" title="Why teams hire me" />
      <ul className="mx-auto grid max-w-6xl gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {assurances.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 0.08}>
            <CheckCircleIcon className="h-9 w-9 text-accent" />
            <h3 className="ds-title mt-4">{item.title}</h3>
            <p className="ds-body-sm mt-1.5">{ASSURANCE_LINES[item.title] ?? ""}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ── 6. Ways to work together ───────────────────────────────────────────── */

const ENGAGEMENT_ICONS = [UserIcon, BriefcaseIcon, UsersIcon];
const ENGAGEMENT_LINES = [
  "A seat on a team building something long-lived.",
  "A defined build with a defined scope.",
  "White-label delivery behind your brand.",
];

export function HomeEngagement({ tone = "soft" }: { tone?: Tone }) {
  return (
    <Section id="engagement" tone={tone}>
      <SectionHeading overline="" title="Three ways to work together" />
      <ul className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {engagements.map((option, i) => {
          const Icon = ENGAGEMENT_ICONS[i] ?? UserIcon;
          const external = option.cta.href.endsWith(".pdf");
          return (
            <Reveal as="li" key={option.title} delay={i * 0.06} className="h-full">
              <Link
                href={option.cta.href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                data-track="cta_click"
                data-track-label={`engagement:${i}`}
                className="group ds-card ds-card-interactive flex h-full flex-col p-7"
              >
                <span className={ICON_TILE}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="ds-h3 mt-5">{option.title}</h3>
                <p className="ds-body-sm mt-2">{ENGAGEMENT_LINES[i]}</p>
                <span className="ds-link mt-auto pt-5 text-[0.9375rem]">
                  {option.cta.label}
                  <ArrowIcon className="h-3 w-3" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

/* ── 7. Close ───────────────────────────────────────────────────────────── */

const CLOSE_STEPS = [
  { icon: FileCheckIcon, label: "Send the context", sub: "A link, a file, or a few lines." },
  { icon: SearchIcon, label: "I review the scope", sub: "What is in the way, and what it takes." },
  { icon: MailIcon, label: "You get a next step", sub: "Or a pointer to someone better suited." },
];

export function HomeClose({ tone = "plain" }: { tone?: Tone }) {
  return (
    <Section id="contact" tone={tone}>
      <Reveal>
        <div className="theme-dark rounded-[28px] px-6 py-12 text-center md:px-14 md:py-16">
          <h2 className="ds-h1 mx-auto max-w-2xl">Have a product that needs a stronger frontend?</h2>
          <p className="body-large mx-auto mt-4 max-w-xl">
            Tell me what you are building. You will hear back with a clear next step.
          </p>

          <ol className="mx-auto mt-9 grid max-w-3xl gap-6 text-left sm:grid-cols-3">
            {CLOSE_STEPS.map((step) => (
              <li key={step.label} className="flex items-start gap-3">
                <span className={ICON_TILE}>
                  <step.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="ds-title-sm block">{step.label}</span>
                  <span className="ds-body-sm mt-0.5 block">{step.sub}</span>
                </span>
              </li>
            ))}
          </ol>

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
              Email me
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
