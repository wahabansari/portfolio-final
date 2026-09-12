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

      <div className="mx-auto max-w-5xl">
        <ul className="border-t border-border">
          {audiences.map((audience, i) => (
            <Reveal
              as="li"
              key={audience.who}
              delay={i * 0.05}
              className={cn(
                "group grid gap-3 border-b border-border py-7 transition-colors hover:bg-accent-soft/40 md:grid-cols-12 md:items-baseline md:gap-8 md:px-4 md:py-8",
                "primary" in audience && "bg-accent-soft/50 hover:bg-accent-soft",
              )}
            >
              <span className="flex items-center gap-4 md:col-span-2">
                <span className="font-display text-[0.875rem] font-semibold text-accent tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {"primary" in audience && <span className="ds-chip ds-chip-accent">Best fit</span>}
              </span>

              <div className="md:col-span-6">
                <h3 className="ds-title text-[1.0625rem] transition-colors group-hover:text-accent">
                  {audience.who}
                </h3>
                <p className="ds-body-sm mt-2">{audience.detail}</p>
              </div>

              <Link
                href={audience.href}
                className="ds-link md:col-span-4 md:justify-end md:text-right"
              >
                {audience.label}
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
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
                    className="font-display text-[0.875rem] font-semibold text-ink-soft tabular-nums transition-colors group-hover:text-accent"
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
