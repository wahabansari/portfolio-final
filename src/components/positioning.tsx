import { principles } from "@/content/site";
import { CheckIcon, Reveal, Section, SectionHeading } from "./ui";

/**
 * Why work with me.
 *
 * Four principles, each anchored to something demonstrable — a length of
 * service, a prior role, a measured result, a working practice. The section
 * repeats on every service page deliberately: whichever page a buyer enters
 * on, the argument for hiring me should be the same one. Rendered in the
 * site's one shared card style.
 */
export function Principles({
  id,
  tone = "plain",
  heading = "Why work with me",
  description = "Four things I would want to be judged on. Each is tied to something you can check rather than to an adjective.",
}: {
  id?: string;
  tone?: "plain" | "soft" | "deep";
  heading?: string;
  description?: string;
}) {
  return (
    <Section id={id} tone={tone}>
      <SectionHeading overline="Approach" title={heading} description={description} />

      <ol className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
        {principles.map((principle, i) => (
          <Reveal as="li" key={principle.title} delay={i * 0.05} className="h-full">
            <div className="ds-card flex h-full items-start gap-4 p-7">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <CheckIcon className="h-4 w-4" />
              </span>
              <div>
                <h3 className="ds-title">{principle.title}</h3>
                <p className="ds-body-sm mt-2">{principle.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
