import Link from "next/link";
import { problemPaths } from "@/content/site";
import { ArrowIcon, Reveal, Section } from "./ui";

/**
 * "What are you trying to solve?"
 *
 * The routing layer between a visitor's problem and the right service page.
 *
 * A services list asks a buyer to translate their situation into my vocabulary
 * before they can act — to know that "our site is slow and nobody converts" is
 * filed under "Website Redesign & Conversion". This asks the question in their
 * words instead, and every answer goes to exactly one page.
 *
 * Structure: an editorial two-column layout. The question stands on the left
 * like an index heading — the whole section is "here is how to read this
 * site" — and the answer column on the right is an ordered reading list rather
 * than a grid of boxes. Rows keep the one-decision interaction (each is a
 * direct link), and the page disclaimers sit under the heading where they
 * read as a contract rather than fine print.
 *
 * The rows are links rather than a filter or an accordion on purpose: the
 * fastest possible interaction is the one that just takes you there. Anything
 * that reveals more copy in place is a second decision before the first one
 * has paid off.
 */
export function ProblemSelector({ tone = "plain" }: { tone?: "plain" | "soft" | "deep" }) {
 return (
 <Section id="start" tone={tone}>
 <Reveal className="mb-10 md:mb-14">
 <div className="mx-auto max-w-3xl text-center">
 <span className="ds-overline">Start here</span>
 <h2 className="ds-h2 mt-5">What are you trying to solve?</h2>
 <p className="ds-lede mt-5 mx-auto">
 Pick the closest one. Each goes to a page that states who it is
 for, what it includes and where the scope ends — no form in
 between.
 </p>
 </div>
 </Reveal>

 <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
 <div className="lg:col-span-4">
 <div className="lg:sticky lg:top-24">
 <div className="space-y-2 border-l border-accent-line pl-5">
 <p className="ds-meta">Six roads in, one door</p>
 <p className="ds-body-sm ">
 Every problem below routes to a single service page, so the
 summary you read is the page it links to — nothing is overloaded
 between here and there.
 </p>
 </div>
 </div>
 </div>

 <ul className="lg:col-span-8">
 {problemPaths.map((path, i) => (
 <Reveal as="li" key={path.href + path.problem} delay={i * 0.03}>
 <Link
 href={path.href}
 data-track="cta_click"
 data-track-label={`problem:${path.href.replace("/services/", "")}`}
 className="group grid gap-2 border-b border-border py-5 transition-colors hover:bg-accent-soft/60 md:grid-cols-12 md:items-baseline md:gap-6 md:px-4 md:py-6"
 >
 <span className="md:col-span-1">
 <span
 aria-hidden
 className="font-display text-[0.8125rem] font-semibold text-ink-soft tabular-nums transition-colors group-hover:text-accent"
 >
 {String(i + 1).padStart(2, "0")}
 </span>
 </span>
 <span className="md:col-span-7">
 <span className="ds-title block text-ink transition-colors group-hover:text-accent">
 {path.problem}
 </span>
 <span className="ds-body-sm mt-1.5 block">{path.detail}</span>
 </span>
 <span className="flex items-center justify-between gap-3 md:col-span-4 md:justify-end">
 <span className="ds-link text-[0.875rem]">{path.label}</span>
 <ArrowIcon className="h-4 w-4 shrink-0 text-ink-soft transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:text-accent" />
 </span>
 </Link>
 </Reveal>
 ))}
 </ul>
 </div>
 </Section>
 );
}