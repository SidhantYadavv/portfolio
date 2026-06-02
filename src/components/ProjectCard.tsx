"use client";

import { motion } from "framer-motion";
import { ProjectVideo } from "@/components/ProjectVideo";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.06,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 transition duration-300 hover:border-violet-500/40 hover:bg-zinc-900/60"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium text-zinc-100">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          {project.highlight && (
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-violet-400/90">
              {project.highlight}
            </p>
          )}
        </div>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-zinc-600 transition hover:text-violet-400"
            aria-label={`Open ${project.title}`}
          >
            ↗
          </a>
        )}
      </div>

      {project.video && (
        <div className="mt-5">
          <ProjectVideo src={project.video} title={project.title} />
        </div>
      )}

      <p className="mt-4 text-sm leading-relaxed text-zinc-400">
        {project.summary}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md bg-zinc-800/60 px-2 py-1 text-xs text-zinc-400"
          >
            {tag}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
