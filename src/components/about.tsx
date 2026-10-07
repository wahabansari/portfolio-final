import Link from "next/link";
import { about, founder, site } from "@/content/site";
import { ArrowIcon, Breadcrumbs, ChevronRightIcon, Reveal, Section, SectionHeading } from "./ui";

/** Initials for the founder monogram (there is no photo to show, and none is invented). */
const initials = founder.shortName
  .split(" ")
  .map((part) => part.charAt(0))
  .join("");

/**
 * About hero: the question as the headline, the studio's one-paragraph answer,
 * the actions, and the founder as a dark profile panel with the facts ruled
 * beside it. The monogram stands in for a portrait.
 */
export function AboutHero() {
  return (
    <section className="hero-aurora border-b border-border pt-28 pb-14 md:pt-32 md:pb-20">
      <div className="ds-container">
        <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <div className="mt-8 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-border bg-bg/80 px-4 py-1.5 text-[0.8125rem] font-medium text-fg-muted backdrop-blur-sm">
                {about.statement}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="display mt-5 text-[clamp(2.25rem,4.4vw,3.75rem)] font-extrabold">{about.h1}</h1>
              <p className="body-large mt-5 max-w-xl">{about.intro}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-3">
                <Link
                  href="/contact"
                  data-track="cta_click"
                  data-track-label="about-hero"
                  className="ds-btn ds-btn-primary"
                >
                  Start a project
                  <ArrowIcon />
                </Link>
                <Link href="/work" className="ds-link px-4 py-2 text-[0.9375rem]">
                  View our work
                  <ChevronRightIcon />
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="lg:col-span-5">
            <div className="theme-tint overflow-hidden rounded-[28px] border border-border shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]">
              <div className="flex items-center gap-4 border-b border-border-subtle p-6">
                <span
                  aria-hidden
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-accent to-accent-deep text-[1.375rem] font-bold tracking-tight text-accent-fg ring-1 ring-inset ring-white/15"
                >
                  {initials}
                </span>
                <div className="min-w-0">
                  <p className="text-[1.125rem] font-semibold leading-tight text-fg">{founder.name}</p>
                  <p className="mt-1 text-[0.875rem] text-accent">{founder.role}</p>
                  <p className="ds-meta mt-1 normal-case">{site.location}</p>
                </div>
              </div>
              <dl>
                {about.facts.map((f) => (
                  <div
                    key={f.k}
                    className="flex items-baseline justify-between gap-6 border-b border-border-subtle px-6 py-3.5 last:border-b-0"
                  >
                    <dt className="ds-meta">{f.k}</dt>
                    <dd className="text-right text-[0.9375rem] font-medium text-fg">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** The three-part story, as open columns: a numeral, a rule and the text. */
export function AboutStory({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="story" tone={tone}>
      <SectionHeading
        overline="The story"
        title="How the studio came to be"
        description="Design first, then production engineering, then the parts of the stack that sit behind the interface."
      />
      <ol className="mx-auto grid max-w-6xl gap-x-12 gap-y-10 lg:grid-cols-3">
        {about.narrative.map((block, i) => (
          <Reveal as="li" key={block.heading} delay={i * 0.08}>
            <div className="border-t-2 border-accent-deep pt-6">
              <span className="font-display text-[2.75rem] leading-none font-bold tracking-[-0.03em] text-accent-hairline tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="ds-h3 mt-4">{block.heading}</h3>
              <p className="ds-body-sm mt-3">{block.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
