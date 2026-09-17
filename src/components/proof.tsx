import Link from "next/link";
import { proof } from "@/content/site";
import { cn } from "@/lib/cn";
import {
  ArrowIcon,
  BriefcaseIcon,
  CodeIcon,
  GaugeIcon,
  Reveal,
  RocketIcon,
  Section,
} from "./ui";

/* One icon per stat, in source order — years / verified metric / stack /
   delivery focus. Positional rather than keyword-matched: the proof array
   is a short, fixed, hand-authored list (see content/site.ts), not open
   content, so there is nothing to degrade gracefully for. */
const STAT_ICONS = [BriefcaseIcon, GaugeIcon, CodeIcon, RocketIcon];

/**
 * One proof panel — a filled, icon-led tile rather than a bare figure in a
 * hairline column. The verified metric gets a tinted background and an
 * explicit "Verified" tag so the one measured claim on the site visually
 * leads instead of sitting at the same weight as three descriptive facts
 * beside it.
 */
function StatPanel({
  item,
  Icon,
}: {
  item: (typeof proof)[number];
  Icon: (typeof STAT_ICONS)[number];
}) {
  const body = item.chips ? (
    <>
      <span className="block text-[0.9375rem] font-medium text-fg">{item.display}</span>
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
  ) : (
    <>
      <span
        className={cn(
          "block font-display text-[2.25rem] leading-none font-semibold tracking-[-0.02em] tabular-nums md:text-[2.5rem]",
          item.verified ? "text-coral" : "text-fg",
        )}
      >
        {item.display}
      </span>
      <span className="mt-3 block text-[0.9375rem] font-medium text-fg">{item.label}</span>
      <span className="ds-body-sm mt-1 block">{item.note}</span>
    </>
  );

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl p-6 md:p-7",
        item.verified ? "bg-coral-soft" : "bg-surface",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            item.verified ? "bg-white/60 text-coral" : "bg-accent-soft text-accent",
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        {item.verified && (
          <span className="inline-flex items-center rounded-full bg-white/60 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-coral">
            Verified
          </span>
        )}
      </div>

      <div className="mt-5 flex-1">{body}</div>

      {item.href && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-accent underline-offset-4 group-hover:underline">
          See how
          <ArrowIcon className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5" />
        </span>
      )}
    </div>
  );
}

/**
 * Proof strip — four icon-led panels on a soft/tinted fill, not a bare
 * hairline row. Brief module 03, sitting between Hero and Selected work: the
 * facts a recruiter or founder needs before they decide whether to keep
 * reading. The verified item (30% Core Web Vitals) links to the case study
 * where it was measured.
 */
export function ProofStrip({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section tone={tone}>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {proof.map((item, i) => (
          <Reveal as="li" key={item.label} delay={i * 0.04} className="h-full">
            {item.href ? (
              <Link
                href={item.href}
                data-track="cta_click"
                data-track-label={`proof-strip:${item.label}`}
                className="group block h-full"
              >
                <StatPanel item={item} Icon={STAT_ICONS[i]} />
              </Link>
            ) : (
              <StatPanel item={item} Icon={STAT_ICONS[i]} />
            )}
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
