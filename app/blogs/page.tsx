"use client";

import { ArrowUpRight, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

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

interface BlogStyle {
  bg: string;
  text: string;
  accent: string;
  button: string;
  tag: string;
}

const BLOG_STYLES: BlogStyle[] = [
  {
    bg: "bg-[#581c87] dark:bg-[#3b0764]",
    text: "text-purple-50",
    accent: "text-purple-200",
    button: "bg-purple-100 text-purple-900 hover:bg-white",
    tag: "border-purple-200/30 text-purple-100 bg-purple-900/20",
  },
  {
    bg: "bg-[#1e3a8a] dark:bg-[#1e40af]",
    text: "text-blue-50",
    accent: "text-blue-200",
    button: "bg-blue-100 text-blue-900 hover:bg-white",
    tag: "border-blue-200/30 text-blue-100 bg-blue-900/20",
  },
  {
    bg: "bg-[#166534] dark:bg-[#14532d]",
    text: "text-green-50",
    accent: "text-green-200",
    button: "bg-green-100 text-green-900 hover:bg-white",
    tag: "border-green-200/30 text-green-100 bg-green-900/20",
  },
  {
    bg: "bg-[#9f1239] dark:bg-[#831843]",
    text: "text-pink-50",
    accent: "text-pink-200",
    button: "bg-pink-100 text-pink-900 hover:bg-white",
    tag: "border-pink-200/30 text-pink-100 bg-pink-900/20",
  },
  {
    bg: "bg-[#155e75] dark:bg-[#164e63]",
    text: "text-cyan-50",
    accent: "text-cyan-200",
    button: "bg-cyan-100 text-cyan-900 hover:bg-white",
    tag: "border-cyan-200/30 text-cyan-100 bg-cyan-900/20",
  },
  {
    bg: "bg-[#4c1d95] dark:bg-[#5b21b6]",
    text: "text-violet-50",
    accent: "text-violet-200",
    button: "bg-violet-100 text-violet-900 hover:bg-white",
    tag: "border-violet-200/30 text-violet-100 bg-violet-900/20",
  },
];

export default function BlogsPage() {
  const router = useRouter();

  const getBlogStyle = (index: number): BlogStyle => {
    return BLOG_STYLES[index % BLOG_STYLES.length];
  };

  return (
    <main className="bg-white dark:bg-black w-full min-h-screen text-zinc-900 dark:text-white transition-colors duration-300">
      <section
        id="all-blogs"
        className="relative bg-[#FDFBF7] dark:bg-black border-zinc-200 dark:border-zinc-800 border-b w-full"
      >
        <div className="bg-[#FDFBF7] dark:bg-black px-6 md:px-12 py-20 transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-mono text-zinc-500 text-sm uppercase tracking-widest">
              Thoughts, insights, and technical deep-dives.
            </h2>
            <button
              onClick={() => router.push("/")}
              className="font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-sm transition-colors"
            >
              ← Back to Home
            </button>
          </div>
          <p className="max-w-2xl font-light text-black dark:text-white text-4xl md:text-5xl transition-colors duration-300">
            Blog Articles
          </p>
        </div>

        <div className="z-10 relative px-6 md:px-12 pb-20">
          <div className="space-y-12">
            {blogs.map((blog, idx) => {
              const style = getBlogStyle(idx);

              return (
                <div
                  key={idx}
                  className={`relative w-full ${style.bg} rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10`}
                >
                  <div className="flex flex-col justify-center p-8 md:p-16 w-full md:w-1/2">
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
                      {blog.tags.map((tag, tIdx) => (
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
                          <span>Read Article</span>
                          <ArrowUpRight
                            size={18}
                            className="group-hover:rotate-45 transition-transform"
                          />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="relative bg-black/10 w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                    <div className="absolute inset-0 flex justify-center items-center p-12">
                      <div className="relative flex flex-col gap-4 bg-white/10 shadow-2xl backdrop-blur-md p-6 border border-white/20 rounded-lg w-full aspect-[4/3] rotate-3 hover:rotate-0 transition-transform duration-700 transform">
                        <div className="bg-white/20 mb-4 rounded w-full h-6"></div>
                        <div className="bg-white/15 mb-2 rounded w-3/4 h-4"></div>
                        <div className="bg-white/15 mb-4 rounded w-full h-4"></div>
                        <div className="flex gap-4 mb-4">
                          <div className="bg-white/10 rounded w-full h-24"></div>
                        </div>
                        <div className="bg-white/10 rounded w-full h-3"></div>
                        <div className="bg-white/10 rounded w-5/6 h-3"></div>
                        <div className="bg-white/10 rounded w-4/6 h-3"></div>
                        <div className="top-6 right-6 absolute text-white/40">
                          <BookOpen size={48} />
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

