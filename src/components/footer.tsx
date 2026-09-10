import Link from "next/link";
import { services } from "@/content/services";
import { positioning, sections, site, socials } from "@/content/site";
import { caseStudies } from "@/content/work";
import { ArrowIcon, Wordmark } from "./ui";

/* Muted by default, ink on hover. A wall of blue links reads as noise, and the
   footer is not where the accent should be doing work. */
const linkClass =
  "inline-flex min-h-8 items-center py-1 text-[0.9375rem] text-ink-muted transition-colors hover:text-ink";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="ds-container py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Identity, the positioning sentence, and the one repeated action */}
          <div className="md:col-span-4">
            <Link
              href="/"
              aria-label="Wahab Ansari — home"
              className="-mx-2 inline-flex min-h-11 items-center rounded-lg px-2"
            >
              <Wordmark />
            </Link>
            <p className="ds-body-sm mt-5 max-w-xs">{positioning}</p>
            <Link href="/contact" data-track="cta_click" data-track-label="footer" className="ds-link mt-5">
              Discuss your project
              <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <p className="ds-meta">Site</p>
            <ul className="mt-4">
              {sections.map((s) => (
                <li key={s.id}>
                  <Link href={s.href} className={linkClass}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* The services and nothing else — the footer is not a place to
              reproduce the sitemap. */}
          <nav aria-label="Services" className="md:col-span-3">
            <p className="ds-meta">Services</p>
            <ul className="mt-4">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="ds-meta">Case studies</p>
            <ul className="mt-4">
              {caseStudies.map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}`} className={linkClass}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="ds-meta mt-8">Elsewhere</p>
            <ul className="mt-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    /* The external profiles are the entity model's corroborating
                       signals, so it is worth knowing which ones get followed. */
                    data-track={
                      s.label === "GitHub"
                        ? "github_click"
                        : s.label === "LinkedIn"
                          ? "linkedin_click"
                          : undefined
                    }
                    data-track-label="footer"
                    className={linkClass}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.resumeHref} data-track="resume_click" className={linkClass}>
                  Résumé (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="ds-body-sm">
            © {year} {site.name} · {site.location}
          </p>
          <p className="ds-body-sm">Built with Next.js, TypeScript and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
