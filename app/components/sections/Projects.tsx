"use client";
import { ArrowUpRight, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useRef } from "react";
import { projects } from "../../projects/data";

interface ProjectsProps {
  limit?: number;
  showAnimations?: boolean;
}

const Projects: React.FC<ProjectsProps> = ({
  limit,
  showAnimations = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  const t = useMemo(
    () => ({
      label: "Projects",
      title: "Selected Work",
      buttons: {
        demo: "Live Demo",
        code: "Source",
        viewAll: "View All Projects",
        details: "View Details",
      },
    }),
    []
  );

  const projectsToShow = limit ? projects.slice(0, limit) : projects;
  const hasMoreProjects = limit && projects.length > limit;

  return (
    <section id="projects" className="relative w-full bg-background">
      {/* Section Header */}
      <div className="section-padding bg-background pt-32 transition-colors duration-300">
        <span className="section-label mb-4 block">{t.label}</span>
        <h2 className="section-title max-w-2xl text-4xl text-foreground md:text-5xl">
          {t.title}
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 pb-20 pt-16">
        {projectsToShow.map((project, idx) => {
          return (
            <div
              key={idx}
              ref={(el) => {
                panelsRef.current[idx] = el;
              }}
              className="sticky top-20 flex min-h-[550px] w-full items-center justify-center section-padding overflow-hidden opacity-100"
            >
              {/* Card */}
              <div className="card relative flex h-full w-full flex-col overflow-hidden md:flex-row">
                {/* Text Content */}
                <div className="relative z-20 flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:p-16">
                  {/* Meta */}
                  <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-foreground-subtle">
                    <span>{project.date}</span>
                    <span className="h-1 w-1 rounded-full bg-foreground-subtle" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl cursor-pointer hover:text-primary transition-colors"
                    onClick={() => router.push(`/projects/${project.slug}`)}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-8 text-base leading-relaxed text-foreground-muted md:text-lg">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-10 flex flex-wrap gap-2">
                    {project.tags.map((tag: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => router.push(`/projects/${project.slug}`)}
                      className="btn-primary group flex items-center gap-2"
                    >
                      <span>{t.buttons.details}</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:rotate-45"
                      />
                    </button>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary group flex items-center gap-2"
                      >
                        <span>{t.buttons.demo}</span>
                        <ArrowUpRight size={16} />
                      </a>
                    )}

                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center gap-2"
                      >
                        <Github size={16} />
                        <span>{t.buttons.code}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Visual Area */}
                <div className="relative h-64 w-full border-t border-border bg-background-alt md:h-auto md:w-1/2 md:border-l md:border-t-0">
                  <div className="absolute inset-0 flex flex-col p-6 md:p-8">
                    {/* Browser mockup header */}
                    <div className="mb-4 flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/30" />
                      <div className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/30" />
                      <div className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/30" />
                    </div>

                    {/* URL bar */}
                    <div className="mb-6 h-px w-full bg-border" />

                    {/* Content placeholders */}
                    <div className="flex flex-1 flex-col gap-4">
                      <div className="flex gap-4">
                        <div className="h-24 flex-1 rounded-xl bg-border/50" />
                        <div className="h-24 flex-1 rounded-xl bg-border/50" />
                      </div>
                      <div className="flex h-16 flex-col gap-2 rounded-xl bg-border/50 p-4">
                        <div className="h-2 w-full rounded bg-border" />
                        <div className="h-2 w-3/4 rounded bg-border" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* View All Button */}
        {hasMoreProjects && (
          <div className="flex w-full items-center justify-center">
            <button
              onClick={() => router.push("/projects")}
              className="btn-primary group flex items-center gap-3 text-base z-10"
            >
              <span>{t.buttons.viewAll}</span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:rotate-45"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
