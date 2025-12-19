"use client";

import { ArrowLeft, ArrowUpRight, BookOpen, Clock } from "lucide-react";
import Link from "next/link";

interface Blog {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  link: string | null;
  readTime?: string;
}

const blogs: Blog[] = [
  {
    title: "Building Scalable APIs with NestJS",
    description:
      "A comprehensive guide to architecting robust RESTful APIs using NestJS, covering dependency injection, modular architecture, and best practices for enterprise applications.",
    date: "2024",
    category: "Backend",
    tags: ["NestJS", "TypeScript", "API Design", "Architecture"],
    link: "#",
    readTime: "8 min read",
  },
  {
    title: "Mastering React Performance Optimization",
    description:
      "Deep dive into React performance optimization techniques, including memoization, code splitting, lazy loading, and profiling strategies for large-scale applications.",
    date: "2024",
    category: "Frontend",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    link: "#",
    readTime: "12 min read",
  },
  {
    title: "TypeScript Patterns for Modern Development",
    description:
      "Exploring advanced TypeScript patterns, type safety strategies, and how to leverage the type system to build more maintainable and error-free applications.",
    date: "2024",
    category: "TypeScript",
    tags: ["TypeScript", "Best Practices", "Type Safety", "Patterns"],
    link: "#",
    readTime: "10 min read",
  },
  {
    title: "Database Design Principles",
    description:
      "Understanding relational database design, normalization, indexing strategies, and how to design schemas that scale with your application's growth.",
    date: "2023",
    category: "Database",
    tags: ["PostgreSQL", "Database Design", "SQL", "Architecture"],
    link: "#",
    readTime: "15 min read",
  },
  {
    title: "GraphQL vs REST: Choosing the Right API",
    description:
      "A practical comparison between GraphQL and REST APIs, exploring use cases, trade-offs, and when to choose each approach for your project.",
    date: "2023",
    category: "API",
    tags: ["GraphQL", "REST", "API Design", "Comparison"],
    link: "#",
    readTime: "7 min read",
  },
  {
    title: "Modern State Management in React",
    description:
      "Exploring state management solutions from Context API to Zustand and Jotai, helping you choose the right tool for your React application's needs.",
    date: "2023",
    category: "Frontend",
    tags: ["React", "State Management", "Zustand", "Context API"],
    link: "#",
    readTime: "9 min read",
  },
];

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
            className="flex items-center gap-2 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
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
                <h2 className="mb-3 font-display text-xl font-bold tracking-tight text-foreground md:text-2xl">
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
                {blog.link && (
                  <a
                    href={blog.link}
                    className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-foreground-muted"
                  >
                    Read Article
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover/btn:rotate-45"
                    />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
