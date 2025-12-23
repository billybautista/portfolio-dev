"use client";

import { ArrowLeft, ArrowUpRight, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { blogs } from "./data";

export default function BlogsPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <section className="section-padding border-b border-border bg-background py-20">
        <div className="mb-8 flex items-center justify-between">
          <span className="section-label">
            Thoughts, insights & technical deep-dives
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
          Blog Articles
        </h1>
      </section>

      {/* Blog Grid */}
      <section className="section-padding py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map((blog, idx) => (
            <article
              key={idx}
              className="group card flex flex-col overflow-hidden transition-all hover:border-border-hover hover-lift"
            >
              <Link href={`/blogs/${blog.slug}`} className="block h-full">
                {/* Preview mockup */}
                <div className="relative h-48 overflow-hidden border-b border-border bg-background-alt">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full max-w-xs transform rounded-lg border border-border bg-surface p-4 shadow-sm transition-transform duration-500 group-hover:scale-105">
                      <div className="mb-3 h-3 w-3/4 rounded bg-border" />
                      <div className="mb-2 h-2 w-full rounded bg-border/60" />
                      <div className="mb-2 h-2 w-5/6 rounded bg-border/60" />
                      <div className="h-2 w-4/6 rounded bg-border/60" />
                      <BookOpen
                        size={32}
                        className="absolute right-4 top-4 text-foreground-subtle/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  {/* Meta */}
                  <div className="mb-4 flex items-center gap-3 text-xs font-medium text-foreground-subtle">
                    <span>{blog.date}</span>
                    <span className="h-1 w-1 rounded-full bg-foreground-subtle" />
                    <span>{blog.category}</span>
                    {blog.readTime && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-foreground-subtle" />
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {blog.readTime}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 font-display text-xl font-bold tracking-tight text-foreground md:text-2xl group-hover:text-primary transition-colors">
                    {blog.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground-muted">
                    {blog.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {blog.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="rounded-full border border-border bg-surface-elevated px-2.5 py-1 text-xs font-medium text-foreground-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-foreground-muted">
                    Read Article
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover/btn:rotate-45"
                    />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
