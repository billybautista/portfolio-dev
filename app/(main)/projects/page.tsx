import { getProjects } from "@/sanity/lib/fetch";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProjectsList from "./ProjectsList";

export default async function ProjectsPage() {
  const projects = await getProjects();

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
            className="group flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm font-medium text-foreground-muted transition-all hover:bg-surface hover:text-foreground"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Home
          </Link>
        </div>
        <h1 className="section-title text-4xl text-foreground md:text-5xl lg:text-6xl">
          All Projects
        </h1>
      </section>

      {/* Projects List */}
      <section className="section-padding py-16">
        <ProjectsList projects={projects} />
      </section>
    </main>
  );
}
