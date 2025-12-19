"use client";
import gsap from "gsap";
import { ArrowUpRight, BookOpen } from "lucide-react";
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

  // Translations and blog data
  const t = useMemo(
    () => ({
      label: "Blog",
      title: "Thoughts, insights, and technical deep-dives.",
      buttons: {
        read: "Read Article",
        viewAll: "View All Blogs",
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
      ],
    }),
    []
  );

  // Limit blogs if limit prop is provided
  const blogsToShow = limit ? t.items.slice(0, limit) : t.items;
  const hasMoreBlogs = limit && t.items.length > limit;

  // Helper to generate distinct solid background styles for stacked cards
  const getBlogStyle = (index: number) => {
    const styles = [
      {
        // Purple
        bg: "bg-[#581c87] dark:bg-[#3b0764]",
        text: "text-purple-50",
        accent: "text-purple-200",
        button: "bg-purple-100 text-purple-900 hover:bg-white",
        tag: "border-purple-200/30 text-purple-100 bg-purple-900/20",
      },
      {
        // Blue
        bg: "bg-[#1e3a8a] dark:bg-[#1e40af]",
        text: "text-blue-50",
        accent: "text-blue-200",
        button: "bg-blue-100 text-blue-900 hover:bg-white",
        tag: "border-blue-200/30 text-blue-100 bg-blue-900/20",
      },
      {
        // Green
        bg: "bg-[#166534] dark:bg-[#14532d]",
        text: "text-green-50",
        accent: "text-green-200",
        button: "bg-green-100 text-green-900 hover:bg-white",
        tag: "border-green-200/30 text-green-100 bg-green-900/20",
      },
      {
        // Pink
        bg: "bg-[#9f1239] dark:bg-[#831843]",
        text: "text-pink-50",
        accent: "text-pink-200",
        button: "bg-pink-100 text-pink-900 hover:bg-white",
        tag: "border-pink-200/30 text-pink-100 bg-pink-900/20",
      },
      {
        // Cyan
        bg: "bg-[#155e75] dark:bg-[#164e63]",
        text: "text-cyan-50",
        accent: "text-cyan-200",
        button: "bg-cyan-100 text-cyan-900 hover:bg-white",
        tag: "border-cyan-200/30 text-cyan-100 bg-cyan-900/20",
      },
      {
        // Violet
        bg: "bg-[#4c1d95] dark:bg-[#5b21b6]",
        text: "text-violet-50",
        accent: "text-violet-200",
        button: "bg-violet-100 text-violet-900 hover:bg-white",
        tag: "border-violet-200/30 text-violet-100 bg-violet-900/20",
      },
    ];
    return styles[index % styles.length];
  };

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip animations if showAnimations is false
    if (!showAnimations) return;

    // Use layout effect context for cleanup
    const ctx = gsap.context(() => {
      const firstPanel = panelsRef.current[0];

      // Fade out header when it approaches the navbar and keep it hidden
      if (headerRef.current) {
        // Navbar height is approximately 80px (h-16 + padding + pt-4)
        const navbarHeight = 80;

        if (firstPanel) {
          // Calculate the distance from header to panel to extend the fade animation
          // This ensures continuous fade from navbar approach to panel coverage
          const headerTop = headerRef.current.offsetTop;
          const panelTop = firstPanel.offsetTop;
          const distanceToPanel = panelTop - headerTop;

          // Single continuous animation from navbar approach to panel coverage
          gsap.to(headerRef.current, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: headerRef.current,
              start: `top-=${navbarHeight} top`, // Start fading when header is navbarHeight away from top
              end: `top+=${distanceToPanel + 50} top`, // Extend until panel is well past (50px buffer)
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        } else {
          // If no panel, just fade when reaching navbar
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

      // Create animations for each panel
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;

        // We want to animate the CURRENT panel when the NEXT panel starts covering it
        const nextPanel = panelsRef.current[i + 1];

        if (nextPanel) {
          gsap.to(panel, {
            scale: 0.95, // Scale down slightly
            y: -40, // Move up slightly
            opacity: 0, // Fade out when covered
            ease: "none",
            scrollTrigger: {
              trigger: nextPanel, // Trigger based on the NEXT panel's movement
              start: "top bottom", // When next panel enters viewport
              end: "top top", // When next panel hits top
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
      className="relative bg-[#FDFBF7] dark:bg-black w-full"
    >
      {/* Section Header - Sticky at top until first card covers it */}
      <div
        ref={headerRef}
        className="md:top-0 z-0 md:sticky bg-[#FDFBF7] dark:bg-black px-6 md:px-12 pt-20 transition-colors duration-300"
      >
        <h2 className="mb-4 font-mono text-zinc-500 text-sm uppercase tracking-widest">
          {t.label}
        </h2>
        <p className="max-w-2xl font-light text-black dark:text-white text-4xl md:text-5xl transition-colors duration-300">
          {t.title}
        </p>
      </div>

      {/* Stacked Panels Container */}
      <div className="z-10 relative pb-20">
        {blogsToShow.map((blog: Blog, idx: number) => {
          const style = getBlogStyle(idx);

          return (
            <div
              key={idx}
              ref={(el) => {
                panelsRef.current[idx] = el;
              }}
              className={`sticky top-20 h-[calc(100vh-5rem)] min-h-[600px] w-full flex items-center justify-center p-4 md:p-8 overflow-hidden opacity-100`}
            >
              {/* Card Surface */}
              <div
                className={`relative w-full h-full max-h-[90vh] ${style.bg} rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10`}
              >
                {/* Text Content */}
                <div className="z-20 relative flex flex-col justify-center p-8 md:p-16 w-full md:w-1/2 blog-content">
                  <div
                    className={`flex items-center gap-4 text-xs font-mono mb-6 ${style.accent} uppercase tracking-wider`}
                  >
                    <span>{blog.date}</span>
                    <span className="bg-current opacity-50 w-px h-3"></span>
                    <span>{blog.category}</span>
                    {blog.readTime && (
                      <>
                        <span className="bg-current opacity-50 w-px h-3"></span>
                        <span>{blog.readTime}</span>
                      </>
                    )}
                  </div>

                  <h3
                    className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${style.text}`}
                  >
                    {blog.title}
                  </h3>

                  <p
                    className={`text-lg md:text-xl leading-relaxed mb-10 opacity-90 ${style.text}`}
                  >
                    {blog.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-12">
                    {blog.tags.map((tag: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className={`px-4 py-1.5 text-sm font-medium rounded-full border backdrop-blur-sm ${style.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {blog.link && (
                      <a
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 hover:shadow-lg ${style.button}`}
                      >
                        <span>{t.buttons.read}</span>
                        <ArrowUpRight
                          size={18}
                          className="group-hover:rotate-45 transition-transform"
                        />
                      </a>
                    )}
                  </div>
                </div>

                {/* Visual/Image Area - Placeholder abstract shapes */}
                <div className="relative bg-black/10 w-full md:w-1/2 h-full overflow-hidden">
                  {/* Abstract Decorative Elements mimicking blog/article style */}
                  <div className="absolute inset-0 flex justify-center items-center p-12">
                    <div className="relative flex flex-col gap-4 bg-white/10 shadow-2xl backdrop-blur-md p-6 border border-white/20 rounded-lg w-full aspect-[4/3] rotate-3 hover:rotate-0 transition-transform duration-700 transform">
                      {/* Blog article skeleton UI */}
                      <div className="bg-white/20 mb-4 rounded w-full h-6"></div>
                      <div className="bg-white/15 mb-2 rounded w-3/4 h-4"></div>
                      <div className="bg-white/15 mb-4 rounded w-full h-4"></div>
                      <div className="flex gap-4 mb-4">
                        <div className="bg-white/10 rounded w-full h-24"></div>
                      </div>
                      <div className="bg-white/10 rounded w-full h-3"></div>
                      <div className="bg-white/10 rounded w-5/6 h-3"></div>
                      <div className="bg-white/10 rounded w-4/6 h-3"></div>

                      {/* Book Icon - Blog style */}
                      <div className="top-6 right-6 absolute text-white/40">
                        <BookOpen size={48} />
                      </div>
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          );
        })}

        {/* View All Blogs Button */}
        {hasMoreBlogs && (
          <div className="top-20 sticky flex justify-center items-center p-4 md:p-8 w-full h-[calc(100vh-5rem)] min-h-[600px]">
            <div className="relative flex justify-center items-center bg-gradient-to-br from-zinc-100 dark:from-zinc-900 to-zinc-200 dark:to-zinc-800 shadow-2xl border border-zinc-200 dark:border-zinc-700 rounded-[40px] w-full h-full max-h-[90vh] overflow-hidden">
              <button
                onClick={() => router.push("/blogs")}
                className="group flex items-center gap-3 bg-black dark:bg-white hover:shadow-2xl px-12 py-6 rounded-full font-bold text-white dark:text-black text-lg hover:scale-105 transition-all hover:-translate-y-1 transform"
              >
                <span>{t.buttons.viewAll}</span>
                <ArrowUpRight
                  size={24}
                  className="group-hover:rotate-45 transition-transform"
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
