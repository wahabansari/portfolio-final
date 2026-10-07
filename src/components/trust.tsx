import { assurances, testimonials } from "@/content/site";
import { CheckIcon, Reveal, Section, SectionHeading } from "./ui";

/**
 * Trust - what clients say, as two plain quotes. No boxes: the type is the
 * design. If the testimonials array is ever empty, the four working
 * commitments render instead, so the section never has to fabricate
 * anything to fill space.
 */
export function TrustLayer({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
  const hasTestimonials = testimonials.length > 0;

  return (
    <Section id="trust" tone={tone}>
      <SectionHeading
        overline=""
        title={hasTestimonials ? "What clients say" : "How this works, every time"}
      />

      {hasTestimonials ? (
        <ul className="theme-tint mx-auto grid max-w-6xl gap-x-14 gap-y-12 rounded-[28px] px-7 py-12 md:grid-cols-2 md:px-14 md:py-16">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name + t.company} delay={i * 0.06}>
              <figure>
                <blockquote className="text-[1.25rem] font-semibold leading-[1.4] tracking-[-0.02em] text-fg md:text-[1.5rem]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5">
                  <span className="block text-[0.9375rem] font-semibold text-fg">{t.name}</span>
                  <span className="ds-meta">
                    {t.role} on {t.company}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : (
        <ul className="mx-auto grid max-w-4xl gap-x-12 gap-y-8 sm:grid-cols-2">
          {assurances.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.05}>
              <div className="flex items-start gap-4">
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
    </Section>
  );
}
