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

  // Translations and project data
  const t = useMemo(
    () => ({
      label: "Projects",
      title: "Featured Projects",
      buttons: {
        demo: "View Demo",
        code: "View Code",
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

  // Limit projects if limit prop is provided
  const projectsToShow = limit ? t.items.slice(0, limit) : t.items;
  const hasMoreProjects = limit && t.items.length > limit;

  return (
    <section id="projects" className="relative bg-white dark:bg-black w-full">
      {/* Section Header - Sticky at top until first card covers it */}
      <div className=" bg-white dark:bg-black px-6 md:px-12 pt-20 transition-colors duration-300">
        <h2 className="mb-4 font-mono text-zinc-500 text-sm uppercase tracking-widest">
          {t.label}
        </h2>
        <p className="max-w-2xl font-light text-black dark:text-white text-4xl md:text-5xl transition-colors duration-300">
          {t.title}
        </p>
      </div>

      {/* Stacked Panels Container */}
      <div className="z-10 relative pb-20">
        {projectsToShow.map((project: Project, idx: number) => {
          return (
            <div
              key={idx}
              ref={(el) => {
                panelsRef.current[idx] = el;
              }}
              className="sticky top-16  min-h-[600px] w-full flex items-center justify-center px-6 md:px-12 overflow-hidden opacity-100"
            >
              {/* Card Surface - White rounded rectangle on light grey background */}
              <div className="relative w-full h-full  bg-white dark:bg-zinc-800  overflow-hidden flex flex-col md:flex-row border border-zinc-200 dark:border-zinc-700">
                {/* Text Content - Left Section */}
                <div className="z-20 relative flex flex-col justify-center p-8 md:p-16 w-full md:w-1/2">
                  {/* Header with date and status */}
                  <div className="flex items-center gap-4 text-xs font-mono mb-6 text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    <span>{project.date}</span>
                    <span className="bg-zinc-300 dark:bg-zinc-600 w-px h-3"></span>
                    <span className="text-amber-700 dark:text-amber-600">
                      {project.status}
                    </span>
                  </div>

                  {/* Title - Large, bold, dark blue */}
                  <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-blue-900 dark:text-blue-400">
                    {project.title}
                  </h3>

                  {/* Description - Dark grey text */}
                  <p className="text-lg md:text-xl leading-relaxed mb-10 text-zinc-700 dark:text-zinc-300">
                    {project.description}
                  </p>

                  {/* Tags - Small rounded rectangles with light grey background */}
                  <div className="flex flex-wrap gap-3 mb-12">
                    {project.tags.map((tag: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="px-4 py-1.5 text-sm font-medium rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 hover:shadow-lg bg-blue-900 dark:bg-blue-600 text-white"
                      >
                        <span>{t.buttons.demo}</span>
                        <ArrowUpRight
                          size={18}
                          className="group-hover:rotate-45 transition-transform"
                        />
                      </a>
                    )}

                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-full font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all"
                      >
                        <Github size={20} />
                        <span>{t.buttons.code}</span>
                        <ArrowUpRight size={18} className="ml-1" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Visual/Image Area - Right Section - Browser Window Mockup */}
                <div className="relative bg-zinc-50 dark:bg-zinc-800 w-full md:w-1/2 h-full overflow-hidden border-l border-zinc-200 dark:border-zinc-700">
                  <div className="absolute inset-0 flex flex-col p-6">
                    {/* Browser Window Header */}
                    <div className="flex items-center gap-2 mb-2">
                      {/* Window Controls - Two circular dots */}
                      <div className="w-3 h-3 rounded-full bg-amber-700 dark:bg-amber-600"></div>
                      <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600"></div>
                    </div>

                    {/* URL Bar - Thin light grey horizontal line */}
                    <div className="h-px bg-zinc-200 dark:bg-zinc-700 mb-6"></div>

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col gap-4">
                      {/* Two larger square-like cards side-by-side */}
                      <div className="flex gap-4">
                        <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg h-32"></div>
                        <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg h-32"></div>
                      </div>

                      {/* Wider, shorter rectangular card below */}
                      <div className="bg-zinc-200 dark:bg-zinc-700 rounded-lg h-24 p-4 flex flex-col gap-2">
                        <div className="h-2 bg-zinc-300 dark:bg-zinc-600 rounded w-full"></div>
                        <div className="h-2 bg-zinc-300 dark:bg-zinc-600 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* View All Projects Button */}
        {hasMoreProjects && (
          <div className="flex justify-center items-center w-full">
            <div className="relative flex justify-center items-center w-full h-full  overflow-hidden">
              <button
                onClick={() => router.push("/projects")}
                className="group flex items-center gap-3 bg-black dark:bg-white  px-12 py-6 rounded-full font-bold text-white dark:text-black text-lg"
              >
                <span>{t.buttons.viewAll}</span>
                <ArrowUpRight
                  size={24}
                  className="group-hover:rotate-45 transition-transform"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
