import Link from "next/link";
import { assurances, testimonials } from "@/content/site";
import { BentoGrid } from "./bento";
import { CheckCircleIcon, ShieldCheckIcon } from "./home-svg";
import { ChevronRightIcon, FileCheckIcon, Reveal, Section, SectionHeading, UserIcon } from "./ui";

/** Two-letter monogram for the attribution avatar — decorative only. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* One icon per assurance, in the order of `assurances` in content/site.ts. */
const WHY_ICONS = [UserIcon, FileCheckIcon, ShieldCheckIcon];

/**
 * Trust — one tile field with two kinds of evidence: the client quotes as
 * larger tiles (real reviews from completed contracts), and the three
 * working assurances as compact tiles beside them. The old split "why us"
 * section and "what clients say" section were two halves of the same
 * question; a bento answers it in a single grid. If the testimonials array
 * is ever empty the assurances simply carry the section — nothing is
 * fabricated to fill space.
 */
export function TrustLayer({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="trust" tone={tone}>
      <SectionHeading
        title="Why Craftwise"
        description="How the work is run — and what clients said when it shipped."
      />

      <BentoGrid as="ul" className="mx-auto max-w-6xl md:grid-cols-2 lg:grid-cols-6">
        {testimonials.map((t, i) => (
          <Reveal as="li" key={t.name + t.company} delay={i * 0.06} className="h-full lg:col-span-3">
            <figure className="ds-card flex h-full flex-col p-6 md:p-8">
              <blockquote className="text-[1.125rem] leading-[1.45] font-semibold tracking-[-0.02em] text-fg md:text-[1.25rem]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[0.8125rem] font-semibold text-accent"
                >
                  {initials(t.name)}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[0.9375rem] font-semibold text-fg">{t.name}</span>
                  <span className="ds-meta">
                    {t.role} · {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}

        {assurances.map((a, i) => {
          const Icon = WHY_ICONS[i] ?? CheckCircleIcon;
          return (
            <Reveal as="li" key={a.title} delay={0.12 + i * 0.05} className="h-full lg:col-span-2">
              <div className="ds-card h-full p-6 md:p-7">
                <Icon className="h-8 w-8 text-accent" />
                <h3 className="ds-title mt-4">{a.title}</h3>
                <p className="ds-body-sm mt-1.5">{a.detail}</p>
              </div>
            </Reveal>
          );
        })}
      </BentoGrid>

      <div className="mt-10 text-center">
        <Link href="/about" className="ds-link text-[0.9375rem]">
          Who is behind Craftwise?
          <ChevronRightIcon />
        </Link>
      </div>
    </Section>
  );
}
