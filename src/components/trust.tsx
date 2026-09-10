import { assurances, testimonials } from "@/content/site";
import { CheckIcon, Reveal, Section, SectionHeading } from "./ui";

/**
 * The trust layer.
 *
 * Two states, one slot. When real testimonials exist they lead, because a
 * client's words outrank mine on every claim they overlap with. Until then the
 * slot carries the four commitments that can be verified against how the
 * engagement actually runs — which is a weaker signal than a testimonial and a
 * far stronger one than a fabricated quote.
 *
 * The empty state is deliberate rather than unfinished. A testimonials section
 * populated with invented praise would undo the credibility every other page
 * here is built to earn, and there is no version of "three plausible quotes"
 * that is worth that risk. Add real ones to `testimonials` in content/site.ts
 * and this section changes shape on its own.
 */
export function TrustLayer({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  const hasTestimonials = testimonials.length > 0;

  return (
    <Section id="trust" tone={tone}>
      <SectionHeading
        overline="What you can rely on"
        title={hasTestimonials ? "What clients say" : "How this works, every time"}
        description={
          hasTestimonials
            ? "From people who have shipped something with me."
            : "Four commitments that hold on every engagement, whichever service it is. Each one is checkable against how the work actually runs — not an adjective."
        }
      />

      {hasTestimonials ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name + t.company} delay={i * 0.05} className="h-full">
              <figure className="ds-card flex h-full flex-col p-7">
                <blockquote className="ds-body flex-1 text-ink">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <span className="block text-[0.9375rem] font-semibold text-ink">{t.name}</span>
                  <span className="ds-body-sm block">
                    {t.role}, {t.company}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      ) : (
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {assurances.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.04} className="flex flex-col bg-card p-7">
              <CheckIcon className="text-success" />
              <h3 className="ds-title-sm mt-4">{item.title}</h3>
              <p className="ds-body-sm mt-3">{item.detail}</p>
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  );
}
