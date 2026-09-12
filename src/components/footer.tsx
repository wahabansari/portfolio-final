"use client";

import Link from "next/link";
import { ArrowIcon, GithubIcon, LinkedinIcon, MailIcon, Wordmark } from "./ui";
import { useContent, useLocaleHref } from "./locale-provider";

/* Muted by default, ink on hover. A wall of blue links reads as noise, and the
   footer is not where the accent should be doing work. */
const linkClass =
  "inline-flex min-h-8 items-center py-1 text-[0.9375rem] text-ink-muted transition-colors hover:text-ink";

const SOCIAL_ICONS: Record<string, typeof MailIcon> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: MailIcon,
};

export function Footer() {
  const year = new Date().getFullYear();
  const localeHref = useLocaleHref();
  const { site, services, work } = useContent();
  const { positioning, sections, socials } = site;
  const { caseStudies } = work;

  return (
    <footer className="relative border-t border-border bg-surface">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-accent-line"
      />
      <div className="ds-container">
        {/* ── Identity band ──────────────────────────────────────────────
            Proposition, key facts and a direct route to the conversation,
            sitting above the link grid so the last big message a visitor
            sees is the proposition, not a sitemap. */}
        <div className="grid gap-10 border-b border-border pb-12 md:grid-cols-12 md:gap-8 md:pb-16 md:pt-16">
          <div className="md:col-span-5">
            <Link
              href={localeHref("/")}
              aria-label="Wahab Ansari — home"
              className="-mx-2 inline-flex min-h-11 items-center rounded-lg px-2"
            >
              <Wordmark role={site.role} />
            </Link>
            <p className="ds-body-sm mt-5 max-w-sm">{positioning}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              {site.available && (
                <span className="ds-chip ds-chip-accent">
                  <span
                    aria-hidden
                    className="relative flex h-1.5 w-1.5"
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  {site.availabilityNote}
                </span>
              )}
              <span className="ds-body-sm text-ink-muted">
                {site.locationShort} · {site.timezone.split(" ")[0]}
              </span>
            </div>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={`mailto:${site.email}`}
                data-track="cta_click"
                data-track-label="footer-email"
                className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-ink transition-colors hover:text-accent"
              >
                <MailIcon className="h-4 w-4 shrink-0 text-accent" />
                {site.email}
              </a>
              <Link
                href={localeHref("/contact")}
                data-track="cta_click"
                data-track-label="footer"
                className="ds-link"
              >
                Discuss your project
                <ArrowIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* ── Navigation columns ─────────────────────────────────────── */}
          <nav aria-label="Footer" className="md:col-span-2">
            <p className="ds-meta">Site</p>
            <ul className="mt-4">
              {sections.map((s) => (
                <li key={s.id}>
                  <Link href={localeHref(s.href)} className={linkClass}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="md:col-span-3">
            <p className="ds-meta">Services</p>
            <ul className="mt-4">
              {services.services.map((s) => (
                <li key={s.slug}>
                  <Link href={localeHref(`/services/${s.slug}`)} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="ds-meta">Explore</p>
            <ul className="mt-4">
              {caseStudies.map((p) => (
                <li key={p.slug}>
                  <Link href={localeHref(`/work/${p.slug}`)} className={linkClass}>
                    {p.title}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.resumeHref}
                  data-track="resume_click"
                  data-track-label="footer"
                  className={linkClass}
                >
                  Résumé (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────
            Social icon buttons, the built-with credit, and a back-to-top
            link — small and light, everything the footer's bottom should
            be. */}
        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex gap-2.5">
            {socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-track={
                      s.label === "GitHub"
                        ? "github_click"
                        : s.label === "LinkedIn"
                          ? "linkedin_click"
                          : undefined
                    }
                    data-track-label="footer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-ink-soft transition-[border-color,color,background-color] duration-200 hover:border-accent-line hover:bg-accent-soft hover:text-accent"
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : s.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-wrap items-center gap-3 text-[0.8125rem] text-ink-muted">
            <span>© {year} {site.shortName}</span>
            <span aria-hidden>·</span>
            <span>{site.locationShort}</span>
            <span aria-hidden>·</span>
            <span className="text-ink-soft">Built with Next.js, TypeScript and Tailwind CSS</span>
          </div>

          <Link
            href="#"
            aria-label="Back to top"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center self-start rounded-lg border border-border bg-card text-ink-soft transition-[border-color,color,background-color] duration-200 hover:border-accent-line hover:bg-accent-soft hover:text-accent md:self-auto"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m18 15-6-6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
