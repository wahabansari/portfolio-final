import Image from "next/image";
import { projects, type Project } from "@/content/site";
import { ExternalIcon, Reveal, Section, SectionHeading } from "./ui";

/* Google's four brand colours, cycled across the cards. */
const ACCENTS: Record<Project["plate"], { var: string; soft: string }> = {
  app: { var: "var(--color-g-blue)", soft: "color-mix(in srgb, var(--color-g-blue) 12%, transparent)" },
  commerce: { var: "var(--color-g-red)", soft: "color-mix(in srgb, var(--color-g-red) 12%, transparent)" },
  marketplace: { var: "var(--color-g-yellow)", soft: "color-mix(in srgb, var(--color-g-yellow) 18%, transparent)" },
  portal: { var: "var(--color-g-green)", soft: "color-mix(in srgb, var(--color-g-green) 12%, transparent)" },
  listing: { var: "var(--color-g-blue)", soft: "color-mix(in srgb, var(--color-g-blue) 12%, transparent)" },
};

export function Work() {
  return (
    <Section id="work">
      <SectionHeading
        level="h1"
        overline="Work"
        title="Selected projects"
        description="Production platforms I've designed, built or migrated. Every one is live and linked."
      />

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={(i % 3) * 0.06} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const accent = ACCENTS[project.plate];

  return (
    <article className="g-card-soft g-card-interactive group flex h-full flex-col overflow-hidden">
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col"
        aria-label={`${project.title} — ${project.kind}. Opens ${project.domain} in a new tab.`}
      >
        {/* Preview */}
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{ backgroundColor: accent.soft }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div aria-hidden className="absolute inset-0 flex items-end p-5">
              <div className="w-full overflow-hidden rounded-t-xl bg-bg">
                <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: accent.var }} />
                  <span className="h-2 w-2 rounded-full bg-border-strong" />
                  <span className="h-2 w-2 rounded-full bg-border-strong" />
                  <span className="ml-2 truncate text-[0.6875rem] font-medium text-ink-muted">
                    {project.domain}
                  </span>
                </div>
                <div className="space-y-2 p-4">
                  <div className="h-2.5 w-1/3 rounded-full" style={{ background: accent.var }} />
                  <div className="h-2 w-3/4 rounded-full bg-border" />
                  <div className="h-2 w-2/3 rounded-full bg-border" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          {/* The brand colour rides the dot; the label itself stays neutral so
              it clears AA — yellow as text is only 1.71:1 on white. */}
          <p className="g-body-sm flex items-center gap-2 font-medium">
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ background: accent.var }}
            />
            {project.kind}
          </p>
          <h3 className="g-title mt-2">{project.title}</h3>
          <p className="g-body mt-3 flex-1 text-[0.9375rem]">{project.blurb}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tools.slice(0, 4).map((t) => (
              <li key={t} className="g-chip !py-1 !text-[0.8125rem] font-normal text-ink-muted">
                {t}
              </li>
            ))}
          </ul>

          <span className="g-link mt-6">
            {project.domain}
            <ExternalIcon className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </a>
    </article>
  );
}
