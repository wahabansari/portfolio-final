import { services } from "@/content/services";
import { positioning, site } from "@/content/site";
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
    `> ${positioning} Based in ${site.location}.`,
    "",
    "## Pages",
    "",
    `- [Home](${u("/")}): Positioning, proof, services, selected work and contact.`,
    `- [Work](${u("/work")}): Production projects, with three written up as case studies.`,
    `- [Services](${u("/services")}): The five services, in commercial order.`,
    `- [About](${u("/about")}): Background, experience, capabilities and credentials.`,
    `- [Contact](${u("/contact")}): Project brief form and direct contact paths.`,
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
    `- Location: ${site.location} (${site.timezone})`,
    `- Résumé: ${u(site.resumeHref)}`,
    "",
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
