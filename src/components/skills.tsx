import Link from "next/link";
import { byRequest, capabilities } from "@/content/site";
import {
  ArrowIcon,
  CodeIcon,
  GaugeIcon,
  LayersIcon,
  LayoutIcon,
  Reveal,
  RocketIcon,
  Section,
  SectionHeading,
  ServerIcon,
  SparklesIcon,
} from "./ui";

const GROUP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: CodeIcon,
  "Product engineering": LayoutIcon,
  "Backend capability": ServerIcon,
  Performance: GaugeIcon,
  Delivery: RocketIcon,
  "Workflow automation": SparklesIcon,
};

/**
 * Capabilities as one ruled table, a row per group: an icon and a name, one
 * line on what the group is for, the lead skills as solid chips (what the
 * studio would want to be judged on) and the supporting inventory as quieter,
 * smaller chips. The strip underneath keeps the "also available, by request" work visible without
 * letting it define the positioning.
 */
export function Capabilities({
  tone = "plain",
  hideHeading = false,
}: {
  tone?: "plain" | "soft" | "deep";
  hideHeading?: boolean;
}) {
  return (
    <Section id="capabilities" tone={tone}>
      {!hideHeading && (
        <SectionHeading
          overline="Capabilities"
          title="What the studio is deep in"
          description="Grouped by what each skill is for. The highlighted chips are the core; the lighter ones are the supporting toolkit."
        />
      )}

      {/* One ruled table: the group on the left (icon, name, what it is for),
          its skills on the right. Solid chips are the core; quiet ones the toolkit. */}
      <ul className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-bg">
        {capabilities.map((group, i) => {
          const Icon = GROUP_ICONS[group.title] ?? LayersIcon;
          return (
            <Reveal as="li" key={group.title} delay={i * 0.04} className="border-b border-border-subtle last:border-b-0">
              <div className="grid gap-4 p-6 md:grid-cols-12 md:gap-8 md:p-7">
                <div className="flex items-start gap-4 md:col-span-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="ds-title">{group.title}</h3>
                    <p className="ds-body-sm mt-1">{group.summary}</p>
                  </div>
                </div>

                <div className="md:col-span-8">
                  <ul className="flex flex-wrap gap-2">
                    {group.lead.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-accent-hairline bg-accent-soft px-3 py-1 text-[0.8125rem] font-semibold text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {group.support.map((item) => (
                      <li key={item} className="ds-chip !text-[0.6875rem]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={0.1} className="mx-auto mt-8 max-w-6xl">
        <div className="flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="ds-meta">Also available, by request</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {byRequest.map((item) => (
                <li key={item} className="ds-chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/contact" className="ds-link shrink-0">
            Ask about one
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
