import io, re

def edit(path, pairs):
    s = io.open(path, encoding="utf-8").read()
    for a, b in pairs:
        assert a in s, f"{path}: MISSING -> {a[:80]!r}"
        s = s.replace(a, b, 1)
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)

# Contact: heading can be suppressed, tone overridable.
edit("src/components/contact.tsx", [
    ("export function Contact({ preview = false }: { preview?: boolean }) {",
     'export function Contact({\n  preview = false,\n  hideHeading = false,\n  tone = "blue",\n}: {\n  preview?: boolean;\n  hideHeading?: boolean;\n  tone?: "plain" | "grey" | "blue";\n}) {'),
    ('<Section id="contact" tone="blue">', '<Section id="contact" tone={tone}>'),
    ('          <p className="g-overline">Contact</p>',
     '          {!hideHeading && <p className="g-overline">Contact</p>}'),
    ('''          {preview ? (
            <h2 className="g-h2 mt-4 max-w-xl">Let&apos;s build something together</h2>
          ) : (
            <h1 className="g-display mt-4 max-w-xl">Let&apos;s build something together</h1>
          )}''',
     '''          {!hideHeading &&
            (preview ? (
              <h2 className="g-h2 mt-4 max-w-xl">Let&apos;s build something together</h2>
            ) : (
              <h1 className="g-display mt-4 max-w-xl">Let&apos;s build something together</h1>
            ))}'''),
])

edit("src/components/credentials.tsx", [
    ("export function Credentials() {", 'export function Credentials({ tone = "grey" }: { tone?: "plain" | "grey" }) {'),
    ('<Section id="background" tone="grey">', '<Section id="background" tone={tone}>'),
])

# ── Standalone pages: grey PageHeader, white body ────────────────────────
PAGES = {
    "about": dict(label="About", overline="About",
                  title="Design sensibility, engineering discipline",
                  lede="I sit in the seam between design and engineering — where a Figma file becomes something a browser renders in under a second.",
                  body='<About hideHeading />\n        <Credentials tone="grey" />'),
    "work": dict(label="Work", overline="Work", title="Selected projects",
                 lede="Production platforms I have designed, built or migrated. Every one is live and linked.",
                 body='<Work hideHeading tone="plain" />'),
    "experience": dict(label="Experience", overline="Experience", title="Where I have worked",
                       lede="Five years across product engineering and interface design.",
                       body="<Experience hideHeading />"),
    "skills": dict(label="Skills", overline="Skills", title="Tools and technologies",
                   lede="What I reach for, grouped by what it does.",
                   body='<Skills hideHeading tone="plain" />'),
    "contact": dict(label="Contact", overline="Contact", title="Let&apos;s build something together",
                    lede="Hire me full-time, or bring me a project. Frontend, full-stack, WordPress and AI automation.",
                    body='<Contact hideHeading tone="plain" />'),
}

for slug, cfg in PAGES.items():
    p = f"src/app/{slug}/page.tsx"
    s = io.open(p, encoding="utf-8").read()

    s = s.replace('import { PageJsonLd } from "@/components/service-ui";',
                  'import { PageHeader, PageJsonLd } from "@/components/service-ui";', 1)

    new_main = (
        '      <main id="main">\n'
        '        <PageHeader\n'
        f'          trail={{[{{ label: "Home", href: "/" }}, {{ label: "{cfg["label"]}" }}]}}\n'
        f'          overline="{cfg["overline"]}"\n'
        f'          title="{cfg["title"]}"\n'
        f'          lede="{cfg["lede"]}"\n'
        '        />\n'
        f'        {cfg["body"]}\n'
        '      </main>'
    )
    s = re.sub(r'      <main[^>]*>[\s\S]*?</main>', lambda m: new_main, s, count=1)
    io.open(p, "w", encoding="utf-8", newline="\n").write(s)
    print("page ->", slug)

print("done")
