import { sections, site, socials } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="g-container py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a href="#home" className="-mx-2 inline-flex min-h-11 items-center rounded-full px-2">
              <span className="text-[1.375rem] leading-none font-medium tracking-[-0.01em] text-ink">
                <span className="text-g-blue">W</span>ahab
                <span className="text-g-red">.</span>
              </span>
            </a>
            <p className="g-body-sm mt-5 max-w-xs">{site.roleLong}</p>
            <p className="g-body-sm mt-2">{site.location}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <p className="g-title-sm text-ink">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex min-h-9 items-center py-1.5 text-[0.9375rem] text-ink-muted transition-colors hover:text-primary"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="g-title-sm text-ink">Elsewhere</p>
            <ul className="mt-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex min-h-9 items-center py-1.5 text-[0.9375rem] break-all text-ink-muted transition-colors hover:text-primary"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="g-body-sm">
            © {year} {site.name}
          </p>
          <p className="g-body-sm">Built with Next.js and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
