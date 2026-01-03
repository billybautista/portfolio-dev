import { client } from "./client";
import {
  blogBySlugQuery,
  blogSlugsQuery,
  blogsQuery,
  featuredBlogsQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
} from "./queries";
import { SanityBlog, SanityProject, SlugItem } from "./types";

// Revalidate: 0 = sin caché (cambios inmediatos)
// En producción puedes cambiar a 60 o más segundos
const REVALIDATE_TIME = 0;

// ============= PROJECT FETCHERS =============

export async function getProjects(): Promise<SanityProject[]> {
  return client.fetch(
    projectsQuery,
    {},
    { next: { revalidate: REVALIDATE_TIME } }
  );
}

export async function getProjectBySlug(
  slug: string
): Promise<SanityProject | null> {
  return client.fetch(
    projectBySlugQuery,
    { slug },
    { next: { revalidate: REVALIDATE_TIME } }
  );
}

export async function getProjectSlugs(): Promise<SlugItem[]> {
  return client.fetch(
    projectSlugsQuery,
    {},
    { next: { revalidate: REVALIDATE_TIME } }
  );
}

export async function getFeaturedProjects(): Promise<SanityProject[]> {
  return client.fetch(
    featuredProjectsQuery,
    {},
    { next: { revalidate: REVALIDATE_TIME } }
  );
}

// ============= BLOG FETCHERS =============

export async function getBlogs(): Promise<SanityBlog[]> {
  return client.fetch(
    blogsQuery,
    {},
    { next: { revalidate: REVALIDATE_TIME } }
  );
}

export async function getBlogBySlug(slug: string): Promise<SanityBlog | null> {
  return client.fetch(
    blogBySlugQuery,
    { slug },
    { next: { revalidate: REVALIDATE_TIME } }
  );
}

export async function getBlogSlugs(): Promise<SlugItem[]> {
  return client.fetch(
    blogSlugsQuery,
    {},
    { next: { revalidate: REVALIDATE_TIME } }
  );
}

export async function getFeaturedBlogs(): Promise<SanityBlog[]> {
  return client.fetch(
    featuredBlogsQuery,
    {},
    { next: { revalidate: REVALIDATE_TIME } }
  );
}
