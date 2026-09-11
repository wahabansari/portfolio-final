import Image from "next/image";
import type { Project } from "@/content/work";
import { cn } from "@/lib/cn";

/**
 * Interface plate — the preview that sits on a project card.
 *
 * These are deliberately schematic wireframes, not screenshots and not
 * pretending to be. Rendering a fake screenshot of a real client's product
 * would be a claim about what that product looks like, and I have no right to
 * make one; a diagram of the layout type communicates the same thing honestly
 * and stays legible at card size.
 *
 * When a real screenshot exists it is dropped into /public/work and set as
 * `image` on the project — the plate is the fallback, not the intent.
 */

type Bar = { w: string; h?: number; accent?: boolean; strong?: boolean };

function Block({ w, h = 6, accent, strong }: Bar) {
  return (
    <span
      aria-hidden
      className={cn(
        "block rounded-[3px]",
        accent ? "bg-accent/70" : strong ? "bg-border-strong" : "bg-border",
      )}
      style={{ width: w, height: h }}
    />
  );
}

function Tile({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block rounded-[5px] border border-border bg-surface", className)}
    />
  );
}

/** The wireframe body, per layout archetype. */
function Wireframe({ plate }: { plate: Project["plate"] }) {
  switch (plate) {
    /* A data-dense platform: sidebar, toolbar, table rows. */
    case "platform":
      return (
        <div className="flex h-full gap-2.5">
          <div className="flex w-[18%] flex-col gap-2 rounded-[5px] border border-border bg-surface p-2">
            <Block w="80%" accent />
            <Block w="60%" />
            <Block w="70%" />
            <Block w="50%" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <Block w="34%" h={8} strong />
              <span className="flex-1" />
              <Block w="16%" h={8} accent />
            </div>
            <div className="grid flex-1 grid-rows-4 gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <Tile key={i} className="h-full" />
              ))}
            </div>
          </div>
        </div>
      );

    /* A marketing site: hero, then a three-up capability row. */
    case "marketing":
      return (
        <div className="flex h-full flex-col gap-2.5">
          <div className="flex flex-col gap-1.5">
            <Block w="62%" h={9} strong />
            <Block w="44%" />
            <span className="h-1" />
            <Block w="22%" h={8} accent />
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <Tile key={i} className="h-full" />
            ))}
          </div>
        </div>
      );

    /* An application behind a login: nav, stat row, panel. */
    case "app":
      return (
        <div className="flex h-full flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Block w="20%" h={8} accent />
            <span className="flex-1" />
            <Block w="10%" h={8} />
            <span
              aria-hidden
              className="block h-2.5 w-2.5 rounded-full border border-border-strong"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <Tile key={i} className="h-8" />
            ))}
          </div>
          <Tile className="flex-1" />
        </div>
      );

    /* Commerce: a product grid under a filter bar. */
    case "commerce":
      return (
        <div className="flex h-full flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <Block w="26%" h={8} strong />
            <span className="flex-1" />
            <Block w="14%" h={8} />
          </div>
          <div className="grid flex-1 grid-cols-4 grid-rows-2 gap-2">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Tile key={i} className="h-full" />
            ))}
          </div>
        </div>
      );

    /* Marketplace: a filter rail beside stacked listing rows. */
    case "marketplace":
      return (
        <div className="flex h-full gap-2.5">
          <div className="flex w-[26%] flex-col gap-2 rounded-[5px] border border-border bg-surface p-2">
            <Block w="70%" />
            <Block w="85%" />
            <Block w="55%" />
            <Block w="75%" />
          </div>
          <div className="grid flex-1 grid-rows-3 gap-2">
            {[0, 1, 2].map((i) => (
              <Tile key={i} className="h-full" />
            ))}
          </div>
        </div>
      );

    /* Portal: a content column beside a persistent action panel. */
    case "portal":
      return (
        <div className="flex h-full flex-col gap-2.5">
          <Block w="50%" h={9} strong />
          <div className="flex flex-1 gap-2.5">
            <div className="flex flex-[2] flex-col gap-1.5">
              <Block w="92%" />
              <Block w="86%" />
              <Block w="70%" />
              <span className="flex-1" />
              <Block w="34%" h={8} accent />
            </div>
            <Tile className="flex-1" />
          </div>
        </div>
      );

    /* Listing: a wide feature card above a paired row. */
    case "listing":
    default:
      return (
        <div className="flex h-full flex-col gap-2.5">
          <Tile className="h-1/2" />
          <div className="grid flex-1 grid-cols-2 gap-2">
            <Tile className="h-full" />
            <div className="flex flex-col justify-between">
              <Block w="80%" />
              <Block w="60%" />
              <Block w="40%" h={8} accent />
            </div>
          </div>
        </div>
      );
  }
}

export function Plate({
  project,
  className,
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  if (project.image) {
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-surface", className)}>
        <Image
          src={project.image}
          alt={`${project.title} — ${project.kind}`}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("aspect-[16/10] overflow-hidden bg-surface", className)}
      role="img"
      aria-label={`${project.title} — schematic of a ${project.kind.toLowerCase()} interface`}
    >
      <div className="flex h-full flex-col p-3 md:p-4">
        {/* Browser chrome carrying the real domain — the one factual thing on
            the plate, and what makes it read as a diagram of a live site. */}
        <div className="flex items-center gap-2 pb-3">
          <span aria-hidden className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-1.5 w-1.5 rounded-full bg-border-strong" />
            ))}
          </span>
          <span className="flex-1 truncate rounded-[var(--radius-sm)] border border-border bg-bg px-2.5 py-0.5 text-[0.625rem] tracking-wide text-ink-soft">
            {project.domain ?? project.title.toLowerCase()}
          </span>
        </div>
        <div className="min-h-0 flex-1 rounded-[6px] border border-border bg-bg p-3">
          <Wireframe plate={project.plate} />
        </div>
      </div>
    </div>
  );
}
