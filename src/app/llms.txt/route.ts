import { insights } from "@/content/insights";
import { services } from "@/content/services";
import { founder, positioning, promise, site } from "@/content/site";
import { caseStudies, projects } from "@/content/work";

/**
 * llms.txt — a plain-Markdown map of the site, generated from the same content
 * the pages render so it cannot drift the way a hand-written copy would.
 *
 * Worth being clear about what this is and is not: Google's current guidance
 * says llms.txt is not required for Google Search or for its AI features, and
 * it is not a ranking shortcut. It is here because it costs nothing to
 * generate and some other agents do read it — the actual work of being legible
 * to a generative system is the crawlable HTML, the answer-first sections and
 * the structured data, all of which live in the pages themselves.
 */
export const dynamic = "force-static";

export function GET() {
  const u = (path: string) => `${site.url}${path}`;

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${positioning} ${promise} Based in ${site.location}.`,
    "",
    "## Pages",
    "",
    `- [Home](${u("/")}): The studio, proof, the four services, selected work and contact.`,
    `- [Work](${u("/work")}): Selected software projects, with case studies for the main ones.`,
    `- [Services](${u("/services")}): The four services: custom web development, business dashboards, software modernization and AI business automation.`,
    `- [Insights](${u("/insights")}): First-hand articles on migration, performance and building software that lasts.`,
    `- [About](${u("/about")}): Who is behind Craftwise: the founder, the experience and the way the studio works.`,
    `- [Contact](${u("/contact")}): Project inquiry form and direct contact.`,
    "",
    "## Services",
    "",
  ];

  for (const service of services) {
    lines.push(
      `- [${service.title}](${u(`/services/${service.slug}`)}): ${service.definition}`,
    );
  }

  lines.push("", "## Case studies", "");
  for (const project of caseStudies) {
    lines.push(
      `- [${project.title}](${u(`/work/${project.slug}`)}): ${project.caseStudy.metaDescription}`,
    );
  }

  lines.push("", "## Insights", "");
  for (const insight of insights) {
    lines.push(`- [${insight.title}](${u(`/insights/${insight.slug}`)}): ${insight.definition}`);
  }

  lines.push("", "## Other production work", "");
  for (const project of projects.filter((p) => !p.caseStudy)) {
    lines.push(`- ${project.title} (${project.kind}): ${project.blurb}${project.href ? ` — ${project.href}` : ""}`);
  }

  lines.push(
    "",
    "## Verified claims",
    "",
    "- 5+ years of production frontend experience, working since 2020.",
    "- 7 live projects, all publicly linked from /work.",
    `- 30% Core Web Vitals improvement on the Sunhub platform — measured before and after; the work behind it is documented at ${u("/work/sunhub")}.`,
    "- No other performance, traffic, revenue or conversion figures are claimed anywhere on this site.",
    "",
    "## Contact",
    "",
    `- Email: ${site.email}`,
    `- Founder: ${founder.name}`,
    `- Location: ${site.location} (${site.timezone})`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
