import Link from "next/link";
import { proof } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowIcon, Reveal, Section } from "./ui";

/**
 * Proof strip — brief module 03, sitting between Hero and Selected work.
 *
 * Four compact facts, not a testimonial or a case study: the numbers a
 * recruiter or founder needs before they decide whether to keep reading.
 * The verified item (the 30% Core Web Vitals figure) links to the case
 * study it's measured in — a stat with nowhere to verify it is a claim,
 * not proof, and the master brief is explicit that this is the one figure
 * on the whole site allowed to carry a number.
 *
 * Same content the OG image renders (see opengraph-image.tsx), so the
 * social card never promises something the page itself doesn't show.
 */
export function ProofStrip({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section tone={tone} className="py-12 md:py-14">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-8">
        {proof.map((item, i) => {
          const stat = (
            <>
              {/* Coral, not the primary indigo, for the one verified figure —
                  the brief's "optional second accent, data-visualization
                  only" allowance. At 28px+ this clears WCAG's large-text
                  3:1 threshold in both themes (3.66:1 light, 7.73:1 dark);
                  it isn't used as body-sized text anywhere. */}
              <span
                className={cn(
                  "block font-display text-[1.75rem] leading-none font-semibold tracking-[-0.02em] md:text-[2rem]",
                  item.verified ? "text-coral" : "text-fg",
                )}
              >
                {item.display}
              </span>
              <span className="mt-2.5 block text-[0.9375rem] font-medium text-fg">
                {item.label}
              </span>
              <span className="ds-body-sm mt-1 block">{item.note}</span>
            </>
          );

          return (
            <Reveal
              as="li"
              key={item.label}
              delay={i * 0.04}
              className={item.wide ? "col-span-2 lg:col-span-1" : undefined}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  data-track="cta_click"
                  data-track-label={`proof-strip:${item.label}`}
                  className="group block"
                >
                  {stat}
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-accent underline-offset-4 group-hover:underline">
                    See how
                    <ArrowIcon className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ) : (
                stat
              )}
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
