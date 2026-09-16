import Link from "next/link";
import { proof } from "@/content/site";
import { cn } from "@/lib/cn";
import { ArrowIcon, Reveal, Section } from "./ui";

/**
 * One proof cell. Plain items render a big display figure; chip items render
 * a tag row (stack / delivery focus) so the content reads as capabilities
 * rather than a headline that wraps to two lines.
 */
function Stat({ item }: { item: (typeof proof)[number] }) {
  if (item.chips) {
    return (
      <>
        <span className="block text-[0.9375rem] font-medium text-fg">
          {item.display}
        </span>
        <ul className="mt-3 flex flex-wrap gap-2">
          {item.chips.map((chip) => (
            <li
              key={chip}
              className="inline-flex items-center rounded-full border border-accent-hairline bg-accent-soft px-3 py-1 text-[0.8125rem] font-semibold text-accent"
            >
              {chip}
            </li>
          ))}
        </ul>
        <span className="ds-body-sm mt-3 block">{item.note}</span>
      </>
    );
  }

  return (
    <>
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
}

/**
 * Proof strip — four compact facts in a single bordered card.
 *
 * Brief module 03, sitting between Hero and Selected work. The numbers a
 * recruiter or founder needs before they decide whether to keep reading.
 * The verified item (30% Core Web Vitals) links to the case study where
 * it was measured.
 *
 * Each cell has a subtle left divider on desktop, no dividers on mobile —
 * the card frame + internal gap keeps the hierarchy clear.
 */
export function ProofStrip({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section tone={tone} className="py-12 md:py-14">
      <div className="rounded-2xl border border-border bg-surface">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((item, i) => (
            <Reveal
              as="li"
              key={item.label}
              delay={i * 0.04}
              className={cn(
                "px-7 py-8 sm:px-8 sm:py-8 lg:px-7 xl:px-8",
                i !== 0 && "border-t sm:border-t-0 sm:border-l border-border",
              )}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  data-track="cta_click"
                  data-track-label={`proof-strip:${item.label}`}
                  className="group block"
                >
                  <Stat item={item} />
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-accent underline-offset-4 group-hover:underline">
                    See how
                    <ArrowIcon className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ) : (
                <Stat item={item} />
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
