import { assurances, testimonials } from "@/content/site";
import { CodeIcon, FileCheckIcon, GaugeIcon, Reveal, Section, UserIcon } from "./ui";

const ASSURANCE_ICONS = [UserIcon, FileCheckIcon, GaugeIcon, CodeIcon];

/**
 * Trust — premium commitment strip.
 *
 * Four commitments in a single quiet list: icon, title, one-line detail.
 * No cards, no grid, no shadow. When real testimonials exist they render
 * as oversized quotes instead.
 */
export function TrustLayer({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  const hasTestimonials = testimonials.length > 0;

  return (
    <Section id="trust" tone={tone}>
      <div className="ds-container">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div>
            <span className="ds-overline mb-4 block">What you can rely on</span>
            <h2 className="ds-h2">
              {hasTestimonials ? "What clients say" : "How this works, every time"}
            </h2>
          </div>

          <div>
            {hasTestimonials ? (
              <div className="space-y-14">
                {testimonials.map((t, i) => (
                  <Reveal key={t.name + t.company} delay={i * 0.05}>
                    <figure>
                      <blockquote className="text-[1.5rem] font-medium leading-[1.3] tracking-[-0.02em] text-fg md:text-[1.75rem]">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <figcaption className="ds-meta mt-5">
                        {t.name} · {t.role}, {t.company}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            ) : (
              <ul className="space-y-10">
                {assurances.map((a, i) => {
                  const Icon = ASSURANCE_ICONS[i];
                  return (
                    <Reveal as="li" key={a.title} delay={i * 0.04}>
                      <div className="flex items-start gap-4">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-fg-muted">
                          {Icon && <Icon className="h-4 w-4" />}
                        </span>
                        <div>
                          <h3 className="text-[1.125rem] font-medium tracking-[-0.01em] text-fg">
                            {a.title}
                          </h3>
                          <p className="ds-body mt-2 max-w-xl">{a.detail}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}