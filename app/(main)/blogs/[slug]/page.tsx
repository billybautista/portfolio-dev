import { getBlogBySlug, getBlogSlugs } from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import BlogDetail from "./BlogDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Don't generate static params for blogs in production
  if (process.env.NODE_ENV === "production") {
    return [];
  }

  const slugs = await getBlogSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function BlogPage({ params }: PageProps) {
  // Hide blogs in production
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetail blog={blog} />;
}
