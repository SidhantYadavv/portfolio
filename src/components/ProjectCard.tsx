import { FsmDiagram } from "@/components/FsmDiagram";
import { ProjectVideo } from "@/components/ProjectVideo";
import type { Project } from "@/data/projects";
import { accent } from "@/lib/channels";

type ProjectCardProps = {
  project: Project;
  index: number;
};

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h7v7M13 3 4 12" />
    </svg>
  );
}

function linkLabel(href: string) {
  return href.includes("github.com") ? "View code" : "Visit live site";
}

function Media({ project }: { project: Project }) {
  const ch = accent;

  if (project.video) {
    return <ProjectVideo src={project.video} title={project.title} />;
  }

  if (project.href) {
    const host = new URL(project.href).host;
    return (
      <div className="flex aspect-[4/3] flex-col justify-between gap-4 overflow-hidden p-5 sm:aspect-video sm:p-8">
        <p className="font-mono text-[0.8125rem] text-screen-dim">
          No recording. The product is live.
        </p>
        <svg
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          aria-hidden
          className="h-12 w-full opacity-70 sm:h-16"
        >
          <path
            d="M0 45 H40 V15 H90 V45 H140 V15 H190 V45 H240 V15 H290 V45 H340 V15 H400"
            fill="none"
            stroke={ch.stroke}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div>
          <p className="font-display text-[clamp(2.25rem,6vw,3.75rem)] leading-none font-bold text-screen-text">
            {host}
          </p>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-[6px] bg-ch1 px-4 font-medium text-screen transition-colors hover:bg-[#ffd659]"
          >
            Open {host}
            <ExternalIcon />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex aspect-video items-center px-4 sm:px-10">
      <FsmDiagram />
    </div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ch = accent;
  const headingId = `project-${index}`;
  const flip = index % 2 === 1;

  return (
    <article
      aria-labelledby={headingId}
      data-trace-burst
      className="border-t border-ink/10 py-14 sm:py-20"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.8125rem]">
          <span aria-hidden className={`size-2 rounded-full ${ch.led}`} />
          <span className={ch.text}>CH{project.channel}</span>
          {project.role && <span className="text-ink-2">{project.role}</span>}
        </p>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.9375rem] text-ink underline decoration-ink/30 hover:decoration-ink"
          >
            {linkLabel(project.href)}
            <span className="sr-only"> for {project.title} (opens in new tab)</span>
            <ExternalIcon />
          </a>
        )}
      </div>

      <h3
        id={headingId}
        className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.92] font-extrabold tracking-[-0.005em] uppercase"
      >
        {project.title}
      </h3>

      <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-12 lg:gap-12">
        <div className={`lg:sticky lg:top-24 lg:col-span-7 lg:self-start ${flip ? "lg:order-last" : ""}`}>
          <figure className="rounded-[12px] bg-panel-2 p-1.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.05),0_24px_48px_-28px_rgb(0_0_0/0.9)] sm:p-2">
            <div className="on-screen overflow-hidden rounded-[7px] bg-screen">
              <div className="flex items-center justify-between gap-3 border-b border-white/5 px-3 py-2 font-mono text-[0.75rem] text-screen-dim">
                <span>
                  <span className={ch.text}>CH{project.channel}</span>{" "}
                  {project.video
                    ? "Demo recording"
                    : project.href
                      ? "Live product"
                      : "State diagram"}
                </span>
                <span aria-hidden className={`h-0.5 w-8 rounded-full ${ch.bg}`} />
              </div>
              <Media project={project} />
            </div>
          </figure>
        </div>

        <div className="lg:col-span-5">
          <p className="text-xl leading-snug text-ink sm:text-[1.375rem]">
            {project.overview}
          </p>

          <h4 className="mt-8 text-[0.9375rem] font-semibold text-ink">
            What I built
          </h4>
          <ul className="mt-3 space-y-3 text-ink-2">
            {project.built.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden
                  className={`mt-[0.7em] h-px w-3 shrink-0 ${ch.bg}`}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h4 className="mt-8 text-[0.9375rem] font-semibold text-ink">
            Result
          </h4>
          <p className={`mt-2 font-display text-[1.75rem] leading-tight font-bold ${ch.text}`}>
            {project.highlight}
          </p>

          <h4 className="mt-8 text-[0.9375rem] font-semibold text-ink">
            Stack
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2 font-mono text-[0.8125rem]">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-[4px] border border-ink/15 px-2 py-1 text-ink-2"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
