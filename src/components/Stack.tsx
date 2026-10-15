import { toolkit, type Tool } from "@/data/stack";

/** Stand-in for tools without a logo: a small IC package with a short code on it. */
function ChipGlyph({ code }: { code: string }) {
  const pins = [12, 20, 28];
  return (
    <svg viewBox="0 0 44 40" aria-hidden className="h-12 w-[3.3rem] sm:h-14 sm:w-[3.85rem]">
      {pins.map((y) => (
        <g key={y} stroke="var(--ink-2)" strokeOpacity="0.6" strokeWidth="1.5">
          <line x1="1" y1={y} x2="6" y2={y} />
          <line x1="38" y1={y} x2="43" y2={y} />
        </g>
      ))}
      <rect
        x="6"
        y="4"
        width="32"
        height="32"
        rx="3"
        fill="var(--screen)"
        stroke="var(--ink-2)"
        strokeOpacity="0.6"
      />
      <circle cx="11" cy="9" r="1.3" fill="var(--ink-2)" fillOpacity="0.7" />
      <text
        x="22"
        y="24"
        textAnchor="middle"
        fill="var(--ch1)"
        className="font-mono"
        fontSize={code.length > 4 ? 7.5 : 9}
      >
        {code}
      </text>
    </svg>
  );
}

function ToolTile({ tool }: { tool: Tool }) {
  return (
    <li className="group flex flex-col items-center gap-3 px-1 py-5 text-center sm:py-6">
      {/* Same motion as hashmeet.dev: a 12° tilt from the bottom-right corner over 500ms */}
      <span className="flex h-12 origin-bottom-right items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:rotate-12 motion-reduce:transition-none sm:h-14">
        {tool.logo ? (
          // Plain <img>: tiny static SVGs gain nothing from next/image
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/stack/${tool.logo}`}
            alt=""
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
            className="h-12 w-auto max-w-16 object-contain sm:h-14 sm:max-w-[4.5rem]"
          />
        ) : (
          <ChipGlyph code={tool.code ?? tool.name.slice(0, 4)} />
        )}
      </span>
      <span className="inline-block text-sm leading-tight text-ink-2 transition-[color,scale] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110 group-hover:text-ch1 motion-reduce:transition-none sm:text-[0.9375rem]">
        {tool.name}
      </span>
    </li>
  );
}

export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="mx-auto max-w-6xl scroll-mt-14 px-4 pt-8 pb-20 sm:px-6 sm:pb-28"
    >
      <div data-trace-burst="small" className="max-w-2xl pb-10 sm:pb-12">
        <h2
          id="stack-heading"
          className="font-display text-[clamp(3rem,9vw,6rem)] leading-[0.9] font-extrabold uppercase"
        >
          Toolkit
        </h2>
        <p className="mt-5 text-lg text-ink-2">
          The languages, frameworks and hardware I build with.
        </p>
      </div>

      <div className="divide-y divide-ink/10 border-y border-ink/10">
        {toolkit.map((group) => (
          <div
            key={group.title}
            className="grid gap-3 py-6 lg:grid-cols-[13rem_1fr] lg:gap-8 lg:py-8"
          >
            <h3 className="pt-1 font-semibold text-ink lg:pt-5">
              {group.title}
            </h3>
            <ul className="grid grid-cols-4 gap-1 sm:grid-cols-5 md:grid-cols-6 xl:grid-cols-9">
              {group.tools.map((tool) => (
                <ToolTile key={tool.name} tool={tool} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
