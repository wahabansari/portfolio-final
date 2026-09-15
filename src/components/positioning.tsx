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
 * Each card routes. Naming an audience without giving it somewhere to go just
 * defers the decision to whenever they next find a link, and the best-fit
 * buyer is marked rather than presented at equal weight with the other two —
 * three audiences at identical weight tells a visitor nothing about where the
 * depth actually is.
 */
export function Audiences({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="who" tone={tone}>
      <SectionHeading
        overline="Who I work with"
        title="Three kinds of client, three different problems"
        description="If none of these describes you, say so anyway — it is usually faster for me to tell you I am the wrong person than for you to work it out."
      />

<ul className="grid gap-5 lg:grid-cols-3">
        {audiences.map((audience, i) => {
          const primary = "primary" in audience;
          return (
            <Reveal as="li" key={audience.who} delay={i * 0.06} className="h-full">
              <Link
                href={audience.href}
                data-track="cta_click"
                data-track-label={`audience:${audience.href.replace("/services/", "")}`}
                className={cn(
                  "group flex h-full flex-col rounded-[1.75rem] p-7 transition-[background-color] duration-200 md:p-9",
                  primary ? "bg-surface-blue" : "bg-card hover:bg-surface-2",
                )}
              >
                <span className="flex items-center justify-between">
                  <span
                    aria-hidden
                    className={cn(
                      "font-display text-[0.9375rem] font-medium tabular-nums",
                      primary ? "text-accent" : "text-ink-soft",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {primary && (
                    <span className="rounded-full bg-bg px-3 py-1 text-[0.75rem] font-medium text-accent">
                      Best fit
                    </span>
                  )}
                </span>

                <h3 className="ds-h3 mt-6">{audience.who}</h3>
                <p className="ds-body-sm mt-3">{audience.detail}</p>

                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.9375rem] font-medium text-accent transition-colors group-hover:text-accent-hover">
                  {audience.label}
                  <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
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
              <div className="group grid gap-4 border-b border-border py-7 transition-colors hover:bg-accent-soft/40 md:grid-cols-12 md:items-baseline md:gap-8 md:px-4 md:py-8">
                <span className="flex items-baseline gap-4 md:col-span-1">
                  <span
                    aria-hidden
                    className="font-display text-[0.875rem] font-medium text-ink-soft tabular-nums transition-colors group-hover:text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <div className="md:col-span-11">
                  <h3 className="ds-title text-[1.0625rem] transition-colors group-hover:text-accent">
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
