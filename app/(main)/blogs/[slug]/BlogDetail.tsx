"use client";

import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { SanityBlog } from "@/sanity/lib/types";

interface BlogDetailProps {
  blog: SanityBlog;
}

export default function BlogDetail({ blog }: BlogDetailProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <main className="min-h-screen w-full bg-background text-foreground animate-in fade-in duration-500">
      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Header Section */}
        <header className="mb-12">
          {/* Back Navigation */}
          <div className="mb-12 flex items-center justify-between border-b border-border/50 pb-8">
            <span className="section-label">Blog Article</span>
            <Link
              href="/blogs"
              className="group flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm font-medium text-foreground-muted transition-all hover:bg-surface hover:text-foreground"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Articles
            </Link>
          </div>

          {/* Meta */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
            <span className="flex items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1 font-medium text-primary">
              {blog.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(blog.date)}
            </span>
            {blog.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {blog.readTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mb-6 font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          {/* Description */}
          <p className="text-xl leading-relaxed text-foreground-muted">
            {blog.description}
          </p>
        </header>

        {/* Banner Image Placeholder */}
        <div className="mb-12 aspect-[2/1] w-full overflow-hidden rounded-2xl border border-border bg-surface-elevated">
          <div className="flex h-full w-full items-center justify-center bg-background-alt text-foreground-subtle">
            {/* Abstract Pattern */}
            <div className="relative h-full w-full opacity-10">
              <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-primary blur-3xl" />
              <div className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-secondary blur-3xl" />
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-lg prose-invert max-w-none text-foreground-muted prose-headings:font-display prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground-emphasis">
          {blog.content && blog.content.length > 0 ? (
            <PortableText value={blog.content} />
          ) : (
            <div className="space-y-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <h2>Key Takeaways</h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <ul>
                <li>First important point about {blog.title}</li>
                <li>Second critical aspect to consider</li>
                <li>Third finding from our research</li>
              </ul>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
            </div>
          )}
        </article>

        {/* Footer Tags */}
        <div className="mt-16 border-t border-border/50 pt-8">
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground-subtle">
            <Tag size={14} />
            Related Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {blog.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-foreground-muted transition-colors hover:border-border-hover hover:text-foreground cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

