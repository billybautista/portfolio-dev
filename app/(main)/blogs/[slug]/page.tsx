import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogSlugs } from "@/sanity/lib/fetch";
import BlogDetail from "./BlogDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetail blog={blog} />;
}
