import { assurances, testimonials } from "@/content/site";
import { CheckIcon, Reveal, SectionRail } from "./ui";

/**
 * Trust — what clients say, set as large pull-quotes in the index layout
 * (heading rail left, quotes right, hairlines between).
 *
 * Real testimonials render as quotes. If the testimonials array is ever
 * empty, the four working commitments render in the same list instead, so
 * the section never has to fabricate anything to fill space.
 */
export function TrustLayer({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  const hasTestimonials = testimonials.length > 0;

  return (
    <SectionRail
      id="trust"
      tone={tone}
      overline="What you can rely on"
      title={hasTestimonials ? "What clients say" : "How this works, every time"}
    >
      {hasTestimonials ? (
        <ul className="divide-y divide-border border-y border-border">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name + t.company} delay={i * 0.05}>
              <figure className="py-7">
                <blockquote className="text-[1.3125rem] font-medium leading-[1.4] tracking-[-0.02em] text-fg md:text-[1.5rem]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[0.9375rem] font-semibold text-fg">{t.name}</span>
                  <span className="ds-meta">
                    {t.role}, {t.company}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {assurances.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.05}>
              <div className="flex items-start gap-4 py-5">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <h3 className="ds-title">{a.title}</h3>
                  <p className="ds-body-sm mt-1.5">{a.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      )}
    </SectionRail>
  );
}
