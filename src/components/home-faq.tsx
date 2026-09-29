import { homeFaqs } from "@/content/site";
import { Faqs, Reveal, SectionRail } from "./ui";

/**
 * Homepage FAQ — `homeFaqs` from content/site.ts, the objection-handling
 * questions in the order buyers actually ask them, in the index layout.
 * Answers are server-rendered inside the accordion, so they're in the
 * initial HTML for crawlers whether or not a panel is open.
 */
export function HomeFaq({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
  return (
    <SectionRail
      id="faq"
      tone={tone}
      overline="FAQ"
      title="Questions worth asking first"
      description="The things founders and agencies usually want to know before the first call."
    >
      <Reveal>
        <Faqs faqs={homeFaqs} />
      </Reveal>
    </SectionRail>
  );
}
