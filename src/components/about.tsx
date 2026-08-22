import Link from "next/link";
import { about, site } from "@/content/site";
import { ArrowIcon, DownloadIcon, Field, Reveal, Section, SectionHeading } from "./ui";

/** `preview` renders the short version used on the home page. */
export function About({
  preview = false,
  hideHeading = false,
  tone = "plain",
}: {
  preview?: boolean;
  hideHeading?: boolean;
  tone?: "plain" | "grey";
}) {
  return (
    <Section id="about" tone={tone}>
      {!hideHeading && (
        <SectionHeading
          level={preview ? "h2" : "h1"}
          overline="About"
          title="Design sensibility, engineering discipline"
          description={about.statement}
        />
      )}

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div className="max-w-prose space-y-6">
            {(preview ? about.paragraphs.slice(0, 1) : about.paragraphs).map((p, i) => (
              <p key={i} className="g-body text-[1.0625rem] leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Actions sit under the copy on the left, not floated beside the
              heading — that kept breaking the shared left edge. */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {preview && (
              <Link href="/about" className="g-btn g-btn-filled w-full sm:w-auto">
                More about me
                <ArrowIcon />
              </Link>
            )}
            <a href={site.resumeHref} className="g-btn g-btn-tonal w-full sm:w-auto">
              <DownloadIcon />
              Download résumé
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-5">
          <div className="g-card-soft p-7 md:p-8">
            <h3 className="g-title-sm">At a glance</h3>
            <dl className="mt-6 space-y-6">
              {about.facts.map((f) => (
                <Field key={f.k} label={f.k} value={f.v} />
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
