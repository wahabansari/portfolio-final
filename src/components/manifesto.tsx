import Link from "next/link";
import { about, positioning } from "@/content/site";
import { ArrowIcon, Reveal, Section } from "./ui";

/**
 * The positioning band — the page's second voice.
 *
 * The routing sections and the work index do the selling; this band is where
 * the site puts its point of view on the table in display type. The two-beat
 * statement sets the tone, the positioning line says what that means in
 * practice, and the record sheet pinned beside it is the supporting data --
 * profile facts, not adjectives.
 */

export function Manifesto() {
  const [lead, ...rest] = about.statement.split(". ");
  const tail = rest.join(". ");

  return (
    <Section tone="deep">
      <Reveal>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <span className="ds-overline">Positioning</span>
            <p className="ds-display mt-6 text-ink">
              {lead}
              {tail && (
                <>
                  . <span className="text-accent">{tail}</span>
                </>
              )}
            </p>
            <p className="ds-lede mt-6 max-w-3xl">{positioning}</p>
            <Link href="/about" className="ds-link mt-8">
              Read the full story
              <ArrowIcon />
            </Link>
          </div>

          <div className="lg:col-span-4">
            <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="ds-meta">On the record</p>
              <dl className="mt-4">
                {about.facts.map((f) => (
                  <div
                    key={f.k}
                    className="flex items-baseline justify-between gap-6 border-b border-border py-4 last:border-b-0"
                  >
                    <dt className="ds-meta">{f.k}</dt>
                    <dd className="text-right text-[0.9375rem] leading-snug font-medium text-ink">
                      {f.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link href="/contact" className="ds-btn ds-btn-ghost mt-7 w-full">
                Discuss your project
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}