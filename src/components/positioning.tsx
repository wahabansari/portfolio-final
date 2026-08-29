import { audiences, principles } from "@/content/site";
import { Reveal, Section, SectionHeading } from "./ui";

/**
 * Who I work with.
 *
 * The site serves three commercially distinct buyers and they do not read the
 * same page the same way. Naming each one explicitly lets a visitor find their
 * own situation in one pass instead of inferring it from a services list —
 * and it is what stops the copy drifting into "I work with everyone".
 */
export function Audiences({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="who" tone={tone}>
      <SectionHeading
        overline="Who I work with"
        title="Three kinds of client, three different problems"
        description="If none of these describes you, say so anyway — it is usually faster for me to tell you I am the wrong person than for you to work it out."
      />

      <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border lg:grid-cols-3">
        {audiences.map((audience, i) => (
          <Reveal as="li" key={audience.who} delay={i * 0.05} className="flex flex-col bg-card p-7 md:p-8">
            <span className="ds-meta text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="ds-title mt-4">{audience.who}</h3>
            <p className="ds-body-sm mt-3.5">{audience.detail}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/**
 * Why work with me.
 *
 * Four principles, each anchored to something demonstrable — a length of
 * service, a prior role, a measured result, a working practice. The section
 * repeats on every service page deliberately: whichever page a buyer enters
 * on, the argument for hiring me should be the same one.
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

      <ul className="grid gap-6 md:grid-cols-2 lg:gap-7">
        {principles.map((principle, i) => (
          <Reveal as="li" key={principle.title} delay={i * 0.04} className="h-full">
            <div className="ds-card h-full p-7 md:p-8">
              <h3 className="ds-title-sm">{principle.title}</h3>
              <p className="ds-body-sm mt-3">{principle.detail}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
