import Link from "next/link";
import { about, positioning } from "@/content/site";
import { ArrowIcon, Reveal, Section } from "./ui";

/**
 * The positioning band — a monumental editorial statement.
 *
 * The design moves from a side-by-side statement + ledger to a full editorial
 * spread: the two-beat proposition stands alone at display scale, the plain
 * argument runs beneath it as two ragged reading columns (studio voice on the
 * left, the practical line on the right), and the record sheet — profile
 * facts, not adjectives — closes the band as a full-width horizontal ledger.
 */

export function Manifesto() {
  const [lead, ...rest] = about.statement.split(". ");
  const tail = rest.join(". ");

  return (
    <Section tone="deep">
      <Reveal>
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
            The position
          </span>
          <p className="mt-8 font-display text-[2.5rem] leading-[1.05] font-medium tracking-[-0.02em] text-ink sm:text-[3rem] md:text-[3.75rem] lg:text-[4.25rem]">
            {lead}
            {tail && (
              <>
                . <span className="text-accent">{tail}</span>
              </>
            )}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl columns-1 gap-10 md:columns-2 lg:gap-16">
          <p className="text-lg leading-relaxed text-ink-muted">
            {about.intro}
          </p>
          <p className="mt-6 break-inside-avoid text-lg leading-relaxed text-ink-muted md:mt-0">
            {positioning}
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl justify-center">
          <Link
            href="/about"
            data-track="cta_click"
            data-track-label="manifesto:about"
            className="group inline-flex items-center gap-2 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.06em] text-accent hover:underline"
          >
            Read the full story
            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px border-t border-border bg-border lg:grid-cols-4">
          {about.facts.map((f, i) => (
            <Reveal key={f.k} delay={i * 0.04}>
              <div className="bg-bg p-6 md:p-8">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft">
                  {f.k}
                </dt>
                <dd className="mt-3 font-display text-[1.375rem] leading-tight font-medium text-ink">
                  {f.v}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}