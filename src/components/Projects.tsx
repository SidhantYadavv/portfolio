import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto max-w-6xl scroll-mt-14 px-4 pt-8 sm:px-6"
    >
      <div data-trace-burst="small" className="max-w-2xl pb-10 sm:pb-14">
        <h2
          id="work-heading"
          className="font-display text-[clamp(3rem,9vw,6rem)] leading-[0.9] font-extrabold uppercase"
        >
          Selected work
        </h2>
        <p className="mt-5 text-lg text-ink-2">
          Four builds across web, data, AI and hardware: what each one is,
          what I built, and what came out of it.
        </p>
      </div>

      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </section>
  );
}
