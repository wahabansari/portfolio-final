import { assurances, testimonials } from "@/content/site";
import { CodeIcon, FileCheckIcon, GaugeIcon, Reveal, Section, SectionHeading, UserIcon } from "./ui";

/* Each commitment gets the icon that matches its subject: who you talk to,
   what is agreed, what is measured, and what you are left with. */
const ASSURANCE_ICONS = [UserIcon, FileCheckIcon, GaugeIcon, CodeIcon];

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
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name + t.company} delay={i * 0.05} className="h-full">
              <figure className="flex h-full flex-col p-7">
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
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {assurances.map((item, i) => {
            const Icon = ASSURANCE_ICONS[i % ASSURANCE_ICONS.length];
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.04}
                className="flex gap-4 bg-card p-6 md:p-8"
              >
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
              <div>
                <h3 className="text-[0.9375rem] leading-snug font-semibold text-ink md:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-muted">{item.detail}</p>
              </div>
              </Reveal>
            );
          })}
        </ul>
      )}
    </Section>
  );
}
