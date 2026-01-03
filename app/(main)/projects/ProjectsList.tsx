"use client";

import ProjectCard from "@/app/components/ProjectCard";
import { SanityProject } from "@/sanity/lib/types";

interface ProjectsListProps {
  projects: SanityProject[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
