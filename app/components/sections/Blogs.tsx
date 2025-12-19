"use client";
import gsap from "gsap";
import { ArrowUpRight, BookOpen, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef } from "react";

interface Blog {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  link?: string;
  readTime?: string;
}

interface BlogsProps {
  limit?: number;
  showAnimations?: boolean;
}

const Blogs: React.FC<BlogsProps> = ({ limit, showAnimations = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  const t = useMemo(
    () => ({
      label: "Blog",
      title: "Thoughts & Insights",
      buttons: {
        read: "Read Article",
        viewAll: "View All Articles",
      },
      items: [
        {
          title: "Building Scalable APIs with NestJS",
          description:
            "A comprehensive guide to architecting robust RESTful APIs using NestJS, covering dependency injection, modular architecture, and best practices for enterprise applications.",
          date: "2024",
          category: "Backend",
          tags: ["NestJS", "TypeScript", "API Design", "Architecture"],
          link: "#",
          readTime: "8 min",
        },
        {
          title: "Mastering React Performance Optimization",
          description:
            "Deep dive into React performance optimization techniques, including memoization, code splitting, lazy loading, and profiling strategies for large-scale applications.",
          date: "2024",
          category: "Frontend",
          tags: ["React", "Performance", "Optimization", "JavaScript"],
          link: "#",
          readTime: "12 min",
        },
        {
          title: "TypeScript Patterns for Modern Development",
          description:
            "Exploring advanced TypeScript patterns, type safety strategies, and how to leverage the type system to build more maintainable and error-free applications.",
          date: "2024",
          category: "TypeScript",
          tags: ["TypeScript", "Best Practices", "Type Safety", "Patterns"],
          link: "#",
          readTime: "10 min",
        },
        {
          title: "Database Design Principles",
          description:
            "Understanding relational database design, normalization, indexing strategies, and how to design schemas that scale with your application's growth.",
          date: "2023",
          category: "Database",
          tags: ["PostgreSQL", "Database Design", "SQL", "Architecture"],
          link: "#",
          readTime: "15 min",
        },
        {
          title: "GraphQL vs REST: Choosing the Right API",
          description:
            "A practical comparison between GraphQL and REST APIs, exploring use cases, trade-offs, and when to choose each approach for your project.",
          date: "2023",
          category: "API",
          tags: ["GraphQL", "REST", "API Design", "Comparison"],
          link: "#",
          readTime: "7 min",
        },
        {
          title: "Modern State Management in React",
          description:
            "Exploring state management solutions from Context API to Zustand and Jotai, helping you choose the right tool for your React application's needs.",
          date: "2023",
          category: "Frontend",
          tags: ["React", "State Management", "Zustand", "Context API"],
          link: "#",
          readTime: "9 min",
        },
      ],
    }),
    []
  );

  const blogsToShow = limit ? t.items.slice(0, limit) : t.items;
  const hasMoreBlogs = limit && t.items.length > limit;

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAnimations) return;

    const ctx = gsap.context(() => {
      const firstPanel = panelsRef.current[0];

      if (headerRef.current) {
        const navbarHeight = 80;

        if (firstPanel) {
          const headerTop = headerRef.current.offsetTop;
          const panelTop = firstPanel.offsetTop;
          const distanceToPanel = panelTop - headerTop;

          gsap.to(headerRef.current, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: headerRef.current,
              start: `top-=${navbarHeight} top`,
              end: `top+=${distanceToPanel + 50} top`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        } else {
          gsap.to(headerRef.current, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: headerRef.current,
              start: `top-=${navbarHeight} top`,
              end: "top top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;

        const nextPanel = panelsRef.current[i + 1];

        if (nextPanel) {
          gsap.to(panel, {
            scale: 0.95,
            y: -40,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: nextPanel,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [t, showAnimations]);

  return (
    <section
      id="blogs"
      ref={containerRef}
      className="relative w-full bg-background"
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="section-padding z-0 bg-background pt-32 transition-colors duration-300 md:sticky md:top-0"
      >
        <span className="section-label mb-4 block">{t.label}</span>
        <h2 className="section-title max-w-2xl text-4xl text-foreground md:text-5xl">
          {t.title}
        </h2>
      </div>

      {/* Stacked Panels */}
      <div className="relative z-10 pb-20">
        {blogsToShow.map((blog: Blog, idx: number) => {
          return (
            <div
              key={idx}
              ref={(el) => {
                panelsRef.current[idx] = el;
              }}
              className="sticky top-20 flex min-h-[550px] w-full items-center justify-center section-padding overflow-hidden opacity-100"
            >
              {/* Card */}
              <div className="card relative flex h-full w-full flex-col overflow-hidden md:flex-row">
                {/* Text Content */}
                <div className="relative z-20 flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:p-16">
                  {/* Meta */}
                  <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-foreground-subtle">
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
                  <h3 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                    {blog.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-8 text-base leading-relaxed text-foreground-muted md:text-lg">
                    {blog.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-10 flex flex-wrap gap-2">
                    {blog.tags.map((tag: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="rounded-full border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-4">
                    {blog.link && (
                      <a
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary group flex items-center gap-2"
                      >
                        <span>{t.buttons.read}</span>
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:rotate-45"
                        />
                      </a>
                    )}
                  </div>
                </div>

                {/* Visual Area */}
                <div className="relative h-64 w-full border-t border-border bg-background-alt md:h-auto md:w-1/2 md:border-l md:border-t-0">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full max-w-sm rounded-lg border border-border bg-surface p-6 shadow-sm transition-transform duration-500 hover:scale-105">
                      <div className="mb-4 h-4 w-3/4 rounded bg-border" />
                      <div className="mb-2 h-3 w-full rounded bg-border/60" />
                      <div className="mb-2 h-3 w-5/6 rounded bg-border/60" />
                      <div className="mb-4 h-3 w-4/6 rounded bg-border/60" />
                      <div className="h-16 w-full rounded bg-border/40" />
                      <BookOpen
                        size={32}
                        className="absolute right-6 top-6 text-foreground-subtle/30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* View All Button */}
        {hasMoreBlogs && (
          <div className="mt-8 flex w-full items-center justify-center">
            <button
              onClick={() => router.push("/blogs")}
              className="btn-primary group flex items-center gap-3 text-base"
            >
              <span>{t.buttons.viewAll}</span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:rotate-45"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
