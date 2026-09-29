import { Reveal } from "./ui";

type ProcessStep = { step: string; detail: string; benefit?: string };

/**
 * The five-step process as one row of hairline-topped columns — number,
 * step name, what happens, what you get. Pure markup: no state, no scroll
 * listener, nothing but the site-wide fade-up.
 */
export function ProcessSteps({ steps }: { steps: readonly ProcessStep[] }) {
  return (
    <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.step} delay={i * 0.05} className="h-full">
          <div className="flex h-full flex-col border-t-2 border-fg pt-4">
            <span className="text-[0.8125rem] font-semibold text-accent tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="ds-h3 mt-3">{s.step}</h3>
            <p className="ds-body-sm mt-2">{s.detail}</p>
            {s.benefit && (
              <div className="mt-auto pt-5">
                <p className="ds-body-sm border-t border-border pt-3 text-fg">
                  <span className="font-semibold text-accent">You get: </span>
                  {s.benefit}
                </p>
              </div>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
