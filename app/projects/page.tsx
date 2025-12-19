"use client";

import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";

interface Project {
  title: string;
  status: string;
  date: string;
  description: string;
  tags: string[];
  link: string | null;
  repo: string | null;
}

const projects: Project[] = [
  {
    title: "Arbitrage",
    status: "Completed",
    date: "2024",
    description:
      "ArbitrageCard is the only discount gift card platform designed for arbitrage sellers. The Chrome extension streamlines management by generating multiple cards for exact amounts, facilitating detail copying and order number assignment.",
    tags: ["Plasmo", "React Query", "TypeScript"],
    link: "https://chromewebstore.google.com/detail/kblmbphnebmpalhdhgjabemaapbppjfj?utm_source=item-share-cb",
    repo: null,
  },
  {
    title: "Maui",
    status: "In Progress",
    date: "2024",
    description:
      "Full-stack business management platform built with React Native and Node.js. Features RESTful API architecture, PostgreSQL database with Prisma ORM, and real-time data synchronization. Comprehensive dashboard for managing all business operations.",
    tags: [
      "React Native",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "TypeScript",
    ],
    link: "https://maui-app.com/es",
    repo: null,
  },
  {
    title: "Odin",
    status: "Coming Soon",
    date: "2024",
    description:
      "Full-stack job search management platform with Chrome extension. Built with NestJS backend API, Supabase for database and authentication, and Plasmo-based extension. Includes automated application tracking, analytics, and job matching algorithms.",
    tags: ["NestJS", "TypeScript", "Supabase", "PostgreSQL", "Plasmo", "Vite"],
    link: "https://odinhr.co/",
    repo: null,
  },
  {
    title: "Fido",
    status: "Completed",
    date: "2023",
    description:
      "Complete veterinary management system built with Django REST Framework. Includes PostgreSQL database, RESTful API architecture, user authentication, and full CRUD operations for managing pets, owners, appointments, and medical records.",
    tags: ["Python", "Django", "Django REST", "PostgreSQL", "REST API"],
    link: null,
    repo: null,
  },
  {
    title: "Abrazo",
    status: "In Progress",
    date: "2024",
    description:
      "Full-stack platform for the tango community with Node.js backend and React frontend. Includes event management system, user profiles, real-time notifications, and RESTful API. Mobile app currently in development.",
    tags: ["React", "Node.js", "Express", "TypeScript", "REST API"],
    link: "https://www.abrazo.app/",
    repo: null,
  },
  {
    title: "Portero",
    status: "Completed",
    date: "2024",
    description:
      "Full-stack AI security platform built with Next.js and TypeScript. Includes server API routes, database integration, authentication system, and real-time monitoring. Acts as guardian for AI-powered systems, ensuring data control and regulatory compliance.",
    tags: ["Next.js", "TypeScript", "API Routes", "PostgreSQL", "Auth"],
    link: "https://portero.ai/",
    repo: null,
  },
  {
    title: "Mi Pata",
    status: "Completed",
    date: "2024",
    description:
      "Full-stack social platform for pet lovers built with React Native. Includes Node.js backend API, real-time features, image upload system, and comprehensive user management. The largest community of pets and those who love them.",
    tags: ["React Native", "Node.js", "TypeScript", "React Query", "REST API"],
    link: "https://mipata.pe/",
    repo: null,
  },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-emerald-600 dark:text-emerald-400";
    case "in progress":
      return "text-amber-600 dark:text-amber-400";
    case "coming soon":
      return "text-blue-600 dark:text-blue-400";
    default:
      return "text-foreground-subtle";
  }
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <section className="section-padding border-b border-border bg-background py-20">
        <div className="mb-8 flex items-center justify-between">
          <span className="section-label">
            Selected work showcasing my expertise
          </span>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
        <h1 className="section-title text-4xl text-foreground md:text-5xl lg:text-6xl">
          All Projects
        </h1>
      </section>

      {/* Projects List */}
      <section className="section-padding py-16">
        <div className="space-y-6">
          {projects.map((project, idx) => (
            <article
              key={idx}
              className="group card flex flex-col overflow-hidden transition-all hover:border-border-hover md:flex-row"
            >
              {/* Preview mockup */}
              <div className="relative h-48 overflow-hidden border-b border-border bg-background-alt md:h-auto md:w-2/5 md:border-b-0 md:border-r">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full max-w-xs transform rounded-lg border border-border bg-surface p-4 shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0 rotate-2">
                    <div className="mb-3 flex gap-2">
                      <div className="h-2 w-2 rounded-full bg-border" />
                      <div className="h-2 w-2 rounded-full bg-border" />
                      <div className="h-2 w-2 rounded-full bg-border" />
                    </div>
                    <div className="mb-2 h-2 w-full rounded bg-border/60" />
                    <div className="mb-4 flex gap-2">
                      <div className="h-12 flex-1 rounded bg-border/40" />
                      <div className="h-12 flex-1 rounded bg-border/40" />
                    </div>
                    <div className="h-2 w-3/4 rounded bg-border/60" />
                    <ArrowUpRight
                      size={28}
                      className="absolute right-4 top-4 text-foreground-subtle/30"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
                {/* Meta */}
                <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-foreground-subtle">
                  <span>{project.date}</span>
                  <span className="h-1 w-1 rounded-full bg-foreground-subtle" />
                  <span className={getStatusColor(project.status)}>
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mb-3 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="mb-6 text-base leading-relaxed text-foreground-muted">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-foreground-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-auto flex flex-wrap items-center gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary group/btn flex items-center gap-2"
                    >
                      <span>View Project</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover/btn:rotate-45"
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
                      <span>Source Code</span>
                    </a>
                  )}

                  {!project.link && !project.repo && (
                    <span className="text-sm text-foreground-subtle">
                      Private project
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
