import { getProjectBySlug, getProjectSlugs } from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import ProjectDetail from "./ProjectDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
