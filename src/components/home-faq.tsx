import { homeFaqs } from "@/content/site";
import { Faqs, Reveal, Section, SectionHeading } from "./ui";

/**
 * Homepage FAQ - `homeFaqs` from content/site.ts, the objection-handling
 * questions in the order buyers actually ask them. Answers are server-rendered
 * inside the accordion, so they are in the initial HTML for crawlers whether
 * or not a panel is open.
 */
export function HomeFaq({ tone = "soft" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <Section id="faq" tone={tone}>
      <SectionHeading
        overline=""
        title="Questions worth asking first"
        description="What founders and agencies usually want to know before the first call."
      />
      <Reveal>
        <Faqs faqs={homeFaqs} className="mx-auto max-w-3xl" />
      </Reveal>
    </Section>
  );
}
