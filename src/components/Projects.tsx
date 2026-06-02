import { FadeIn } from "@/components/FadeIn";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 border-t border-white/5 py-20">
      <FadeIn>
        <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
          Projects
        </h2>
        <p className="mt-3 max-w-xl text-sm text-zinc-500">
          Selected work — summaries based on READMEs and production experience.
        </p>
      </FadeIn>

      <div className="mt-10 flex flex-col gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
