"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { SanityProject } from "@/sanity/lib/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import ProjectCard from "../ProjectCard";

interface ProjectsProps {
  projects: SanityProject[];
  limit?: number;
}

const Projects: React.FC<ProjectsProps> = ({ projects, limit }) => {
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { language } = useLanguage();

  const t = {
    label: language === "en" ? "Projects" : "Proyectos",
    title: language === "en" ? "Selected Work" : "Trabajo Seleccionado",
    viewAll:
      language === "en" ? "View All Projects" : "Ver Todos los Proyectos",
  };

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
        {projectsToShow.map((project, idx) => (
          <div
            key={project._id}
            ref={(el) => {
              panelsRef.current[idx] = el;
            }}
            className="sticky top-20 flex w-full items-center justify-center section-padding overflow-hidden md:mb-5 mb-8"
          >
            <ProjectCard project={project} size="large" />
          </div>
        ))}

        {/* View All Button */}
        {hasMoreProjects && (
          <div className="sticky flex w-full items-center justify-center">
            <Link
              href="/projects"
              className="btn-primary group flex items-center gap-3 text-base"
            >
              <span>{t.viewAll}</span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:rotate-45"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
