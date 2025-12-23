"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Github,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { projects } from "../data";

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const project = useMemo(() => {
    return projects.find((p) => p.slug === slug);
  }, [slug]);

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="mb-4 text-4xl font-bold">Project Not Found</h1>
        <Link href="/projects" className="text-primary hover:underline">
          Back to Projects
        </Link>
      </main>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30";
      case "in progress":
        return "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30";
      case "coming soon":
        return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30";
      default:
        return "text-foreground-subtle bg-foreground-subtle/10";
    }
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground animate-in fade-in duration-500">
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-20">
        {/* Header Section */}
        <header className="mb-16">
          <div className="mb-8 flex items-center justify-between border-b border-border/50 pb-8">
            <span className="section-label">Project Details</span>
            <Link
              href="/projects"
              className="group flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm font-medium text-foreground-muted transition-all hover:bg-surface hover:text-foreground"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Projects
            </Link>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getStatusColor(
                project.status
              )}`}
            >
              <CheckCircle2 size={12} />
              {project.status}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-foreground-muted">
              <Calendar size={14} />
              {project.date}
            </span>
          </div>

          <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-foreground-muted md:text-xl">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <span>Visit Project</span>
                <ArrowUpRight size={18} />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <Github size={18} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </header>

        {/* Visual Showcase (Mockup) */}
        <section className="mb-20 overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-lg">
          <div className="relative aspect-video w-full bg-background-alt flex items-center justify-center p-10">
            <div className="relative w-3/4 h-3/4 rounded-xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden">
              {/* Browser Elements */}
              <div className="h-10 border-b border-border bg-surface px-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <div className="h-3 w-3 rounded-full bg-green-400/80" />
                <div className="ml-4 h-6 w-1/2 rounded-md bg-border/30" />
              </div>
              {/* Placeholder Content */}
              <div className="flex-1 bg-surface/50 p-8 flex flex-col gap-6">
                <div className="h-8 w-1/3 rounded-lg bg-border/30" />
                <div className="h-4 w-3/4 rounded-md bg-border/20" />
                <div className="h-4 w-1/2 rounded-md bg-border/20" />

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="h-32 rounded-lg bg-border/20" />
                  <div className="h-32 rounded-lg bg-border/20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Details Grid */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Tech Stack */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 font-display text-xl font-bold text-foreground">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground-muted transition-colors hover:border-border-hover hover:text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Context/Additional Info (Placeholder structure for future extension) */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="mb-4 font-display text-xl font-bold text-foreground">
                About the Project
              </h3>
              <div className="prose prose-invert max-w-none text-foreground-muted">
                <p>
                  This project represents a significant milestone in exploring{" "}
                  {project.tags[0]} capabilities. The main focus was to create a
                  seamless user experience while maintaining robust performance.
                </p>
                <p className="mt-4">
                  Key challenges included optimizing real-time data flow and
                  ensuring cross-platform compatibility. The solution
                  implemented leverages modern architectural patterns to achieve
                  these goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
