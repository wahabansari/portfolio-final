import Link from "next/link";
import { about, site } from "@/content/site";
import { ArrowIcon, DownloadIcon, Reveal, Section, SectionHeading } from "./ui";
import { ProcessSteps } from "./process";

/** /about — the narrative, with the facts pinned alongside it. */
export function AboutNarrative() {
  return (
    <Section tone="plain">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="ds-lede text-ink">{about.intro}</p>
          </Reveal>

          <div className="mt-12 space-y-11">
            {about.narrative.map((block, i) => (
              <Reveal key={block.heading} delay={i * 0.04}>
                <h2 className="ds-h3">{block.heading}</h2>
                <p className="ds-body mt-4">{block.body}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.08} className="lg:col-span-5">
          {/* Sticky on desktop: the facts stay beside whichever part of the
 narrative is being read. */}
          <div className="lg:sticky lg:top-28">
            <div className="border-t border-border">
              <p className="ds-meta">Profile</p>
              <dl className="mt-4">
                {about.facts.map((f) => (
                  <div
                    key={f.k}
                    className="flex items-baseline justify-between gap-6 border-b border-border py-4"
                  >
                    <dt className="ds-meta">{f.k}</dt>
                    <dd className="text-right text-[0.9375rem] font-medium text-ink">
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-8 flex flex-col gap-3">
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
    <Section tone={tone} bordered>
      <SectionHeading
        overline={overline}
        title={title}
        description={description}
      />
      <ProcessSteps steps={steps} />
    </Section>
  );
}
