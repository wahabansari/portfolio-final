import io

def edit(path, pairs):
    s = io.open(path, encoding="utf-8").read()
    for a, b in pairs:
        assert a in s, f"{path}: MISSING -> {a[:80]!r}"
        s = s.replace(a, b, 1)
    io.open(path, "w", encoding="utf-8", newline="\n").write(s)

# Each section gains `hideHeading` (the PageHeader supplies the h1 on its own
# route) and a `tone` override so the body can sit on white under a grey header.
SECTIONS = [
    ("src/components/about.tsx", "About", '<Section id="about">', '"plain"'),
    ("src/components/work.tsx", "Work", '<Section id="work" tone="grey">', '"grey"'),
    ("src/components/experience.tsx", "Experience", '<Section id="experience">', '"plain"'),
    ("src/components/skills.tsx", "Skills", '<Section id="skills" tone="grey">', '"grey"'),
]

for path, comp, section_open, default_tone in SECTIONS:
    s = io.open(path, encoding="utf-8").read()

    s = s.replace(
        f"export function {comp}({{ preview = false }}: {{ preview?: boolean }}) {{",
        f"export function {comp}({{\n  preview = false,\n  hideHeading = false,\n  tone = {default_tone},\n}}: {{\n  preview?: boolean;\n  hideHeading?: boolean;\n  tone?: \"plain\" | \"grey\";\n}}) {{",
        1,
    )
    sid = section_open.split('id="')[1].split('"')[0]
    s = s.replace(section_open, f'<Section id="{sid}" tone={{tone}}>', 1)

    # wrap the SectionHeading in the hideHeading guard
    a = s.index("      <SectionHeading")
    b = s.index("      />", a) + len("      />")
    inner = s[a:b].replace("\n", "\n  ")
    s = s[:a] + "      {!hideHeading && (\n  " + inner + "\n      )}" + s[b:]

    io.open(path, "w", encoding="utf-8", newline="\n").write(s)
    print("props ->", comp)

# Contact builds its heading inline.
edit("src/components/contact.tsx", [
    ("export function Contact({ preview = false }: { preview?: boolean }) {",
     'export function Contact({\n  preview = false,\n  hideHeading = false,\n  tone = "blue",\n}: {\n  preview?: boolean;\n  hideHeading?: boolean;\n  tone?: "plain" | "grey" | "blue";\n}) {'),
    ('<Section id="contact" tone="blue">', '<Section id="contact" tone={tone}>'),
    ('          <p className="g-overline">Contact</p>',
     '          {!hideHeading && <p className="g-overline">Contact</p>}'),
])
s = io.open("src/components/contact.tsx", encoding="utf-8").read()
s = s.replace('''          {preview ? (
            <h2 className="g-h2 mt-4 max-w-xl">Let&apos;s build something together</h2>
          ) : (
            <h1 className="g-display mt-4 max-w-xl">Let&apos;s build something together</h1>
          )}''',
'''          {!hideHeading &&
            (preview ? (
              <h2 className="g-h2 mt-4 max-w-xl">Let&apos;s build something together</h2>
            ) : (
              <h1 className="g-display mt-4 max-w-xl">Let&apos;s build something together</h1>
            ))}''', 1)
io.open("src/components/contact.tsx", "w", encoding="utf-8", newline="\n").write(s)

# Credentials sits under About on /about — give it a plain tone there.
edit("src/components/credentials.tsx", [
    ("export function Credentials() {", 'export function Credentials({ tone = "grey" }: { tone?: "plain" | "grey" }) {'),
    ('<Section id="background" tone="grey">', '<Section id="background" tone={tone}>'),
])

# ── The standalone pages: grey PageHeader, white body ────────────────────
HEADERS = {
    "about": ('overline="About"', 'title="Design sensibility, engineering discipline"',
              "lede={about.statement}", 'import { about } from "@/content/site";',
              "<About hideHeading />\n        <Credentials tone=\"grey\" />"),
    "work": ('overline="Work"', 'title="Selected projects"',
             'lede="Production platforms I\'ve designed, built or migrated. Every one is live and linked."',
             "", '<Work hideHeading tone="plain" />'),
    "experience": ('overline="Experience"', 'title="Where I\'ve worked"',
                   'lede="Five years across product engineering and interface design."',
                   "", "<Experience hideHeading />"),
    "skills": ('overline="Skills"', 'title="Tools and technologies"',
               'lede="What I reach for, grouped by what it does."',
               "", '<Skills hideHeading tone="plain" />'),
    "contact": ('overline="Contact"', 'title="Let\'s build something together"',
                'lede="Hire me full-time, or bring me a project. Frontend, full-stack, WordPress and AI automation."',
                "", '<Contact hideHeading tone="plain" />'),
}

for slug, (overline, title, lede, extra_import, body) in HEADERS.items():
    p = f"src/app/{slug}/page.tsx"
    s = io.open(p, encoding="utf-8").read()
    s = s.replace('import { PageJsonLd } from "@/components/service-ui";',
                  'import { PageHeader, PageJsonLd } from "@/components/service-ui";', 1)
    if extra_import:
        s = s.replace('import { PageHeader, PageJsonLd } from "@/components/service-ui";',
                      'import { PageHeader, PageJsonLd } from "@/components/service-ui";\n' + extra_import, 1)

    a = s.index('      <main id="main">')
    b = s.index("      </main>")
    header = f'''      <main id="main">
        <PageHeader
          trail={{[{{ label: "Home", href: "/" }}, {{ label: "{slug[0].upper() + slug[1:]}" }}]}}
          {overline}
          {title}
          {lede}
        />
        {body}
'''
    s = s[:a] + header + s[b:]
    s = s.replace('<main className="pt-6">', '<main>')
    io.open(p, "w", encoding="utf-8", newline="\n").write(s)
    print("header ->", slug)

print("done")
