import { getBlogs } from "@/sanity/lib/fetch";
import { notFound } from "next/navigation";
import BlogsList from "./BlogsList";
import BlogsHeader from "./BlogsHeader";

export default async function BlogsPage() {
  // Hide blogs in production
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const blogs = await getBlogs();

  return (
    <main className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <BlogsHeader />

      {/* Blog Grid */}
      <section className="section-padding py-16">
        <BlogsList blogs={blogs} />
      </section>
    </main>
  );
}
