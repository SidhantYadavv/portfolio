import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-6xl scroll-mt-14 px-4 pt-8 pb-20 sm:px-6 sm:pb-28"
    >
      <div data-trace-burst="small" className="max-w-2xl pb-10 sm:pb-14">
        <h2
          id="experience-heading"
          className="font-display text-[clamp(3rem,9vw,6rem)] leading-[0.9] font-extrabold uppercase"
        >
          Experience
        </h2>
        <p className="mt-5 text-lg text-ink-2">Where I&rsquo;ve worked so far.</p>
      </div>

      {/* A timeline: one trace runs down the left, each role is a marker on it */}
      <ol className="relative border-l border-ch1/40 pl-6 sm:pl-10 lg:ml-[13rem] lg:pl-12">
        {experience.map((job, i) => (
          <li
            key={`${job.company}-${i}`}
            className="relative pb-14 last:pb-0 sm:pb-16"
          >
            <span
              aria-hidden
              className="absolute top-2 -left-6 size-2.5 -translate-x-1/2 rounded-full bg-ch1 shadow-[0_0_10px_var(--ch1)] sm:-left-10 lg:-left-12"
            />

            <p className="tabular font-mono text-[0.8125rem] text-ink-2 lg:absolute lg:top-1 lg:-left-[16rem] lg:w-[12rem] lg:text-right">
              <span className="text-ch1">
                {job.start} – {job.end}
              </span>
              {job.current && (
                <span className="mt-1 flex items-center gap-1.5 lg:justify-end">
                  <span
                    aria-hidden
                    className="size-1.5 rounded-full bg-ch1 shadow-[0_0_6px_var(--ch1)]"
                  />
                  Current role
                </span>
              )}
              {job.location && <span className="block">{job.location}</span>}
            </p>

            <h3 className="mt-2 font-display text-[clamp(2rem,5vw,3rem)] leading-[0.95] font-extrabold uppercase lg:mt-0">
              {job.role}
            </h3>
            <p className="mt-1 text-lg text-ink">
              {job.href ? (
                <a
                  href={job.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-ink/30 hover:decoration-ink"
                >
                  {job.company}
                </a>
              ) : (
                job.company
              )}
            </p>

            {job.summary && (
              <p className="mt-4 max-w-2xl text-ink-2">{job.summary}</p>
            )}

            <ul className="mt-4 max-w-2xl space-y-2.5 text-ink-2">
              {job.points.map((point, j) => (
                <li key={j} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.7em] h-px w-3 shrink-0 bg-ch1"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2 font-mono text-[0.8125rem]">
              {job.tags.map((tag, j) => (
                <li
                  key={j}
                  className="rounded-[4px] border border-ink/15 px-2 py-1 text-ink-2"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
