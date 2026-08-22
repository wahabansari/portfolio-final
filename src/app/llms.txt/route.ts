import { serviceCategories } from "@/content/services";
import { projects, site, summaryShort } from "@/content/site";

/**
 * llms.txt — a plain-Markdown map of the site for AI agents and LLM crawlers.
 * Generated from the same content the pages render, so it can't drift the way
 * a hand-written copy would.
 *
 * The format wants a single H1, an optional blockquote summary, then sections
 * of links with short descriptions.
 */
export const dynamic = "force-static";

export function GET() {
  const u = (path: string) => `${site.url}${path}`;

  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.role} in ${site.location}. ${summaryShort}`,
    "",
    "## Pages",
    "",
    `- [Home](${u("/")}): Overview, services, selected work and background.`,
    `- [About](${u("/about")}): Background, working style and current focus.`,
    `- [Work](${u("/work")}): Production platforms designed, built or migrated.`,
    `- [Experience](${u("/experience")}): Roles, responsibilities and stack per role.`,
    `- [Skills](${u("/skills")}): Technologies grouped by what they do.`,
    `- [Contact](${u("/contact")}): How to start a project or get in touch.`,
    "",
    "## Services",
    "",
    `- [All services](${u("/services")}): Index of every service, by category.`,
  ];

  for (const category of serviceCategories) {
    lines.push(
      "",
      `### ${category.title}`,
      "",
      `- [${category.shortTitle} overview](${u(`/services/${category.slug}`)}): ${category.tagline}.`,
    );
    for (const service of category.services) {
      lines.push(
        `- [${service.title}](${u(`/services/${category.slug}/${service.slug}`)}): ${service.summary}`,
      );
    }
  }

  lines.push("", "## Selected work", "");
  for (const project of projects) {
    lines.push(`- ${project.title} (${project.kind}): ${project.blurb}`);
  }

  lines.push(
    "",
    "## Contact",
    "",
    `- Email: ${site.email}`,
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
