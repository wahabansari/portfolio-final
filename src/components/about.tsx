import Link from "next/link";
import { about, positioning, site } from "@/content/site";
import { ArrowIcon, DownloadIcon, Field, Reveal, Section, SectionHeading } from "./ui";

/** Homepage teaser. The full narrative lives on /about; this does not repeat
    it, so the two pages are not competing for the same search terms. */
export function AboutTeaser({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="about" tone={tone}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <span className="ds-overline">About</span>
          <h2 className="ds-h2 mt-5">{about.statement}</h2>
          <p className="ds-lede ds-measure mt-6">{about.teaser}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/about" className="ds-btn ds-btn-secondary">
              More about how I work
              <ArrowIcon />
            </Link>
            <a
              href={site.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-link"
            >
              <DownloadIcon className="h-4 w-4" />
              Résumé
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-6">
          <div className="ds-card p-7 md:p-9">
            <p className="ds-meta">Positioning</p>
            <p className="ds-measure mt-4 font-display text-[1.1875rem] leading-[1.55] font-medium text-ink">
              {positioning}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-7">
              {about.facts.slice(0, 4).map((f) => (
                <Field key={f.k} label={f.k} value={f.v} />
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/** /about — the narrative, with the facts pinned alongside it. */
export function AboutNarrative() {
  return (
    <Section tone="plain">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="ds-lede ds-measure text-ink">{about.intro}</p>
          </Reveal>

          <div className="mt-12 space-y-11">
            {about.narrative.map((block, i) => (
              <Reveal key={block.heading} delay={i * 0.04}>
                <h2 className="ds-h3">{block.heading}</h2>
                <p className="ds-body ds-measure mt-4">{block.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.08} className="lg:col-span-5">
          {/* Sticky on desktop: the facts stay beside whichever part of the
              narrative is being read. */}
          <div className="lg:sticky lg:top-28">
            <div className="ds-card p-7 md:p-8">
              <p className="ds-meta">Profile</p>
              <dl className="mt-6 space-y-6">
                {about.facts.map((f) => (
                  <Field key={f.k} label={f.k} value={f.v} />
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-7">
                <Link href="/contact" className="ds-btn ds-btn-primary w-full">
                  Work with me
                  <ArrowIcon />
                </Link>
                <a
                  href={site.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ds-btn ds-btn-secondary w-full"
                >
                  <DownloadIcon className="h-4 w-4" />
                  View résumé
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/**
 * Process. The same five steps wherever they appear.
 *
 * Each step carries a benefit line as well as an activity line. A process
 * diagram that only lists what the supplier does is decoration; what a buyer
 * is actually reading for is what each stage gets them.
 */
export function Process({
  tone = "soft",
  steps,
  overline = "How I work",
  title = "From product idea to shipped interface",
  description,
}: {
  tone?: "plain" | "soft" | "deep";
  steps: readonly { step: string; detail: string; benefit?: string }[];
  overline?: string;
  title?: string;
  description?: string;
}) {
  return (
    <Section tone={tone}>
      <SectionHeading overline={overline} title={title} description={description} />
      <ol className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.step} delay={i * 0.04} className="flex flex-col bg-card p-6">
            <span className="ds-meta text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="ds-title-sm mt-3">{s.step}</h3>
            <p className="ds-body-sm mt-2.5">{s.detail}</p>
            {s.benefit && (
              <p className="mt-4 flex-1 border-t border-border pt-4 text-[0.875rem] leading-relaxed text-ink">
                <span className="ds-meta block text-success">What you get</span>
                <span className="mt-1.5 block">{s.benefit}</span>
              </p>
            )}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
