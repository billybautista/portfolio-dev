export interface Blog {
  title: string;
  slug: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  link: string | null;
  readTime?: string;
  content?: string; // Placeholder for actual content
}

export const blogs: Blog[] = [
  {
    title: "Building Scalable APIs with NestJS",
    slug: "building-scalable-apis-nestjs",
    description:
      "A comprehensive guide to architecting robust RESTful APIs using NestJS, covering dependency injection, modular architecture, and best practices for enterprise applications.",
    date: "2024",
    category: "Backend",
    tags: ["NestJS", "TypeScript", "API Design", "Architecture"],
    link: "#",
    readTime: "8 min read",
    content: `
      <h2>Introduction</h2>
      <p>NestJS has become a go-to framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).</p>
      
      <h3>Why NestJS?</h3>
      <p>Under the hood, Nest makes use of robust HTTP Server frameworks like Express (the default) and optionally can be configured to use Fastify!</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Extensible: Allows use of any other libraries thanks to modular architecture.</li>
        <li>Versatile: Adaptive ecosystem is a fully-fledged backbone for all kinds of server-side applications.</li>
        <li>Progressive: Takes advantage of latest JavaScript features, bringing design patterns and mature solutions into Node.js world.</li>
      </ul>
    `,
  },
  {
    title: "Mastering React Performance Optimization",
    slug: "mastering-react-performance",
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
    slug: "typescript-patterns",
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
    slug: "database-design-principles",
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
    slug: "graphql-vs-rest",
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
    slug: "modern-state-management-react",
    description:
      "Exploring state management solutions from Context API to Zustand and Jotai, helping you choose the right tool for your React application's needs.",
    date: "2023",
    category: "Frontend",
    tags: ["React", "State Management", "Zustand", "Context API"],
    link: "#",
    readTime: "9 min read",
  },
];
