export interface Project {
  title: string;
  slug: string;
  status: string;
  date: string;
  description: string;
  tags: string[];
  link: string | null;
  repo: string | null;
}

export const projects: Project[] = [
  {
    title: "Arbitrage",
    slug: "arbitrage",
    status: "Completed",
    date: "2024",
    description:
      "ArbitrageCard is the only discount gift card platform designed for arbitrage sellers. The Chrome extension streamlines management by generating multiple cards for exact amounts, facilitating detail copying and order number assignment.",
    tags: ["Plasmo", "React Query", "TypeScript"],
    link: "https://chromewebstore.google.com/detail/kblmbphnebmpalhdhgjabemaapbppjfj?utm_source=item-share-cb",
    repo: null,
  },
  {
    title: "Maui",
    slug: "maui",
    status: "In Progress",
    date: "2024",
    description:
      "Full-stack business management platform built with React Native and Node.js. Features RESTful API architecture, PostgreSQL database with Prisma ORM, and real-time data synchronization. Comprehensive dashboard for managing all business operations.",
    tags: [
      "React Native",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "TypeScript",
    ],
    link: "https://maui-app.com/es",
    repo: null,
  },
  {
    title: "Odin",
    slug: "odin",
    status: "Coming Soon",
    date: "2024",
    description:
      "Full-stack job search management platform with Chrome extension. Built with NestJS backend API, Supabase for database and authentication, and Plasmo-based extension. Includes automated application tracking, analytics, and job matching algorithms.",
    tags: ["NestJS", "TypeScript", "Supabase", "PostgreSQL", "Plasmo", "Vite"],
    link: "https://odinhr.co/",
    repo: null,
  },
  {
    title: "Fido",
    slug: "fido",
    status: "Completed",
    date: "2023",
    description:
      "Complete veterinary management system built with Django REST Framework. Includes PostgreSQL database, RESTful API architecture, user authentication, and full CRUD operations for managing pets, owners, appointments, and medical records.",
    tags: ["Python", "Django", "Django REST", "PostgreSQL", "REST API"],
    link: null,
    repo: null,
  },
  {
    title: "Abrazo",
    slug: "abrazo",
    status: "In Progress",
    date: "2024",
    description:
      "Full-stack platform for the tango community with Node.js backend and React frontend. Includes event management system, user profiles, real-time notifications, and RESTful API. Mobile app currently in development.",
    tags: ["React", "Node.js", "Express", "TypeScript", "REST API"],
    link: "https://www.abrazo.app/",
    repo: null,
  },
  {
    title: "Portero",
    slug: "portero",
    status: "Completed",
    date: "2024",
    description:
      "Full-stack AI security platform built with Next.js and TypeScript. Includes server API routes, database integration, authentication system, and real-time monitoring. Acts as guardian for AI-powered systems, ensuring data control and regulatory compliance.",
    tags: ["Next.js", "TypeScript", "API Routes", "PostgreSQL", "Auth"],
    link: "https://portero.ai/",
    repo: null,
  },
  {
    title: "Mi Pata",
    slug: "mi-pata",
    status: "Completed",
    date: "2024",
    description:
      "Full-stack social platform for pet lovers built with React Native. Includes Node.js backend API, real-time features, image upload system, and comprehensive user management. The largest community of pets and those who love them.",
    tags: ["React Native", "Node.js", "TypeScript", "React Query", "REST API"],
    link: "https://mipata.pe/",
    repo: null,
  },
];
