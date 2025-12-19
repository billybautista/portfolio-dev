"use client";
import { ArrowUpRight, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo, useRef } from "react";

interface Project {
  title: string;
  description: string;
  date: string;
  status: string;
  tags: string[];
  link?: string;
  repo?: string;
}

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
      },
      items: [
        {
          title: "Arbitrage",
          description:
            "A sophisticated trading platform that enables users to identify and capitalize on price discrepancies across multiple exchanges in real-time.",
          date: "2024",
          status: "Production",
          tags: ["Next.js", "TypeScript", "WebSocket", "Trading"],
          link: "https://arbitrage.example.com",
          repo: "https://github.com/example/arbitrage",
        },
        {
          title: "Maui",
          description:
            "A comprehensive project management tool designed for remote teams, featuring real-time collaboration and advanced task tracking capabilities.",
          date: "2024",
          status: "Production",
          tags: ["React", "Node.js", "PostgreSQL", "GraphQL"],
          link: "https://maui.example.com",
          repo: "https://github.com/example/maui",
        },
        {
          title: "Odin",
          description:
            "An AI-powered analytics dashboard that transforms complex data into actionable insights with intuitive visualizations and predictive modeling.",
          date: "2023",
          status: "Production",
          tags: ["Next.js", "Python", "Machine Learning", "D3.js"],
          link: "https://odin.example.com",
          repo: "https://github.com/example/odin",
        },
        {
          title: "Fido",
          description:
            "A pet care management application that helps pet owners track health records, appointments, and daily care routines for their furry friends.",
          date: "2023",
          status: "Production",
          tags: ["React Native", "Express", "MongoDB", "Stripe"],
          link: "https://fido.example.com",
          repo: "https://github.com/example/fido",
        },
        {
          title: "Abrazo",
          description:
            "A social networking platform focused on connecting communities through shared interests and local events, fostering meaningful relationships.",
          date: "2023",
          status: "Production",
          tags: ["Next.js", "Prisma", "PostgreSQL", "Redis"],
          link: "https://abrazo.example.com",
          repo: "https://github.com/example/abrazo",
        },
        {
          title: "Portero",
          description:
            "A smart building management system that integrates IoT devices, access control, and facility management into a unified platform.",
          date: "2022",
          status: "Production",
          tags: ["Nest.js", "TypeScript", "IoT", "WebSocket"],
          link: "https://portero.example.com",
          repo: "https://github.com/example/portero",
        },
        {
          title: "Mi Pata",
          description:
            "An e-commerce platform specializing in artisanal products, featuring a seamless shopping experience with integrated payment and inventory management.",
          date: "2022",
          status: "Production",
          tags: ["Next.js", "Django", "PostgreSQL", "Stripe"],
          link: "https://mipata.example.com",
          repo: "https://github.com/example/mipata",
        },
      ],
    }),
    []
  );

  const projectsToShow = limit ? t.items.slice(0, limit) : t.items;
  const hasMoreProjects = limit && t.items.length > limit;

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
        {projectsToShow.map((project: Project, idx: number) => {
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
                  <h3 className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
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
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary group flex items-center gap-2"
                      >
                        <span>{t.buttons.demo}</span>
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:rotate-45"
                        />
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
          <div className="mt-8 flex w-full items-center justify-center">
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
