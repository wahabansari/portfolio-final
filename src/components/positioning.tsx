import Link from "next/link";
import { audiences, principles } from "@/content/site";
import { ArrowIcon, Reveal, Section, SectionHeading } from "./ui";
import { cn } from "@/lib/cn";

/**
 * Who I work with.
 *
 * The site serves three commercially distinct buyers and they do not read the
 * same page the same way. Naming each one explicitly lets a visitor find their
 * own situation in one pass instead of inferring it from a services list —
 * and it is what stops the copy drifting into "I work with everyone".
 *
 * Each row routes. Naming an audience without giving it somewhere to go just
 * defers the decision to whenever they next find a link, and the best-fit
 * buyer is marked rather than presented at equal weight with the other two.
 */
export function Audiences({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="who" tone={tone}>
      <SectionHeading
        overline="Who I work with"
        title="Three kinds of client, three different problems"
        description="If none of these describes you, say so anyway — it is usually faster for me to tell you I am the wrong person than for you to work it out."
      />

      <ul className="border-t border-border">
        {audiences.map((audience, i) => {
          const primary = "primary" in audience;
          return (
            <Reveal as="li" key={audience.who} delay={i * 0.06}>
              <Link
                href={audience.href}
                data-track="cta_click"
                data-track-label={`audience:${audience.href.replace("/services/", "")}`}
                className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-b border-border py-8 transition-colors hover:bg-surface md:grid-cols-12 md:py-10"
              >
                <span className="md:col-span-1 md:pl-2">
                  <span
                    aria-hidden
                    className={cn(
                      "font-display text-[1.25rem] font-medium tabular-nums transition-colors group-hover:text-accent",
                      primary ? "text-accent" : "text-ink-soft",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>

                <span className="md:col-span-4">
                  <span className="flex flex-wrap items-center gap-3">
                    <span
                      className={cn(
                        "font-display text-[1.375rem] leading-snug font-medium tracking-[-0.014em] md:text-[1.5rem]",
                        primary ? "text-accent" : "text-ink",
                      )}
                    >
                      {audience.who}
                    </span>
                    {primary && (
                      <span className="rounded-full border border-accent bg-accent-soft px-3 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.12em] text-accent">
                        Best fit
                      </span>
                    )}
                  </span>
                  <span className="ds-meta mt-1 block">{audience.label}</span>
                </span>

                <span className="ds-body-sm text-ink-muted md:col-span-6">
                  {audience.detail}
                </span>

                <span aria-hidden className="md:col-span-1 md:justify-end md:pr-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

/**
 * Why work with me.
 *
 * Four principles, each anchored to something demonstrable — a length of
 * service, a prior role, a measured result, a working practice. The section
 * repeats on every service page deliberately: whichever page a buyer enters
 * on, the argument for hiring me should be the same one.
 */
export function Principles({
  id,
  tone = "plain",
  heading = "Why work with me",
  description = "Four things I would want to be judged on. Each is tied to something you can check rather than to an adjective.",
}: {
  id?: string;
  tone?: "plain" | "soft" | "deep";
  heading?: string;
  description?: string;
}) {
  return (
    <Section id={id} tone={tone}>
      <SectionHeading overline="Approach" title={heading} description={description} />

      <div className="mx-auto max-w-5xl">
        <ol className="border-t border-border">
          {principles.map((principle, i) => (
            <Reveal as="li" key={principle.title} delay={i * 0.04}>
              <div className="group grid grid-cols-1 gap-x-8 gap-y-3 border-b border-border py-7 transition-colors hover:bg-accent-soft/40 md:grid-cols-12 md:items-baseline md:py-8">
                <span className="md:col-span-1 md:pl-2">
                  <span
                    aria-hidden
                    className="font-display text-[1.125rem] font-medium text-ink-soft tabular-nums transition-colors group-hover:text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <div className="md:col-span-11">
                  <h3 className="font-display text-[1.25rem] leading-snug font-medium tracking-[-0.014em] text-ink transition-colors group-hover:text-accent">
                    {principle.title}
                  </h3>
                  <p className="ds-body-sm mt-2 max-w-3xl">{principle.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}