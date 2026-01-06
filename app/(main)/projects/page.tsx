import { getProjects } from "@/sanity/lib/fetch";
import ProjectsList from "./ProjectsList";
import ProjectsHeader from "./ProjectsHeader";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <ProjectsHeader />

      {/* Projects List */}
      <section className="section-padding py-16">
        <ProjectsList projects={projects} />
      </section>
    </main>
  );
}
