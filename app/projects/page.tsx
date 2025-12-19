"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { useRouter } from "next/navigation";

interface Project {
  title: string;
  status: string;
  date: string;
  description: string;
  tags: string[];
  link: string | null;
  repo: string | null;
}

const projects: Project[] = [
  {
    title: "Arbitrage",
    status: "Completado",
    date: "2024",
    description:
      "ArbitrageCard es la única plataforma de tarjetas de regalo con descuento diseñada para vendedores de arbitraje. La extensión de Chrome agiliza la gestión generando múltiples tarjetas para montos exactos, facilitando la copia de detalles y asignando números de orden.",
    tags: ["Plasmo", "React Query", "TypeScript"],
    link: "https://chromewebstore.google.com/detail/kblmbphnebmpalhdhgjabemaapbppjfj?utm_source=item-share-cb",
    repo: null,
  },
  {
    title: "Maui",
    status: "En Progreso",
    date: "2024",
    description:
      "Plataforma full-stack de gestión empresarial construida con React Native y Node.js. Cuenta con arquitectura de API RESTful, base de datos PostgreSQL con Prisma ORM, y sincronización de datos en tiempo real. Dashboard integral para gestionar todos los aspectos de las operaciones empresariales.",
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
    status: "Por Lanzar",
    date: "2024",
    description:
      "Plataforma full-stack de gestión de búsqueda laboral con extensión de Chrome. Construida con API backend NestJS, Supabase para base de datos y autenticación, y extensión basada en Plasmo. Incluye seguimiento automatizado de postulaciones, análisis y algoritmos de coincidencia de trabajos.",
    tags: ["NestJS", "TypeScript", "Supabase", "PostgreSQL", "Plasmo", "Vite"],
    link: "https://odinhr.co/",
    repo: null,
  },
  {
    title: "Fido",
    status: "Completado",
    date: "2023",
    description:
      "Sistema completo de gestión veterinaria construido con Django REST Framework. Incluye base de datos PostgreSQL, arquitectura de API RESTful, autenticación de usuarios, y operaciones CRUD completas para gestionar mascotas, dueños, citas e historiales médicos.",
    tags: ["Python", "Django", "Django REST", "PostgreSQL", "REST API"],
    link: null,
    repo: null,
  },
  {
    title: "Abrazo",
    status: "En Progreso",
    date: "2024",
    description:
      "Plataforma full-stack para la comunidad del tango con backend Node.js y frontend React. Incluye sistema de gestión de eventos, perfiles de usuario, notificaciones en tiempo real, y API RESTful. Aplicación móvil actualmente en desarrollo.",
    tags: ["React", "Node.js", "Express", "TypeScript", "REST API"],
    link: "https://www.abrazo.app/",
    repo: null,
  },
  {
    title: "Portero",
    status: "Completado",
    date: "2024",
    description:
      "Plataforma full-stack de seguridad IA construida con Next.js y TypeScript. Incluye rutas de API del servidor, integración de base de datos, sistema de autenticación, y monitoreo en tiempo real. Actúa como guardián para sistemas impulsados por IA, asegurando control de datos y cumplimiento normativo.",
    tags: ["Next.js", "TypeScript", "API Routes", "PostgreSQL", "Auth"],
    link: "https://portero.ai/",
    repo: null,
  },
  {
    title: "Mi Pata",
    status: "Completado",
    date: "2024",
    description:
      "Plataforma social full-stack para amantes de mascotas construida con React Native. Incluye API backend Node.js, características en tiempo real, sistema de carga de imágenes, y gestión completa de usuarios. La comunidad más grande de mascotas y quienes las amamos.",
    tags: ["React Native", "Node.js", "TypeScript", "React Query", "REST API"],
    link: "https://mipata.pe/",
    repo: null,
  },
];

interface ProjectStyle {
  bg: string;
  text: string;
  accent: string;
  button: string;
  tag: string;
}

const PROJECT_STYLES: ProjectStyle[] = [
  {
    bg: "bg-[#7c2d12] dark:bg-[#431407]",
    text: "text-orange-50",
    accent: "text-orange-200",
    button: "bg-orange-100 text-orange-900 hover:bg-white",
    tag: "border-orange-200/30 text-orange-100 bg-orange-900/20",
  },
  {
    bg: "bg-[#312e81] dark:bg-[#1e1b4b]",
    text: "text-indigo-50",
    accent: "text-indigo-200",
    button: "bg-indigo-100 text-indigo-900 hover:bg-white",
    tag: "border-indigo-200/30 text-indigo-100 bg-indigo-900/20",
  },
  {
    bg: "bg-[#881337] dark:bg-[#4c0519]",
    text: "text-rose-50",
    accent: "text-rose-200",
    button: "bg-rose-100 text-rose-900 hover:bg-white",
    tag: "border-rose-200/30 text-rose-100 bg-rose-900/20",
  },
  {
    bg: "bg-[#0f172a] dark:bg-[#020617]",
    text: "text-slate-50",
    accent: "text-slate-300",
    button: "bg-slate-100 text-slate-900 hover:bg-white",
    tag: "border-slate-200/30 text-slate-200 bg-slate-800/50",
  },
];

export default function ProjectsPage() {
  const router = useRouter();

  const getProjectStyle = (index: number): ProjectStyle => {
    return PROJECT_STYLES[index % PROJECT_STYLES.length];
  };

  return (
    <main className="bg-white dark:bg-black w-full min-h-screen text-zinc-900 dark:text-white transition-colors duration-300">
      <section
        id="all-projects"
        className="relative bg-[#FDFBF7] dark:bg-black border-zinc-200 dark:border-zinc-800 border-b w-full"
      >
        <div className="bg-[#FDFBF7] dark:bg-black px-6 md:px-12 py-20 transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-mono text-zinc-500 text-sm uppercase tracking-widest">
              Selected work that showcases my expertise.
            </h2>
            <button
              onClick={() => router.push("/")}
              className="font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-sm transition-colors"
            >
              ← Back to Home
            </button>
          </div>
          <p className="max-w-2xl font-light text-black dark:text-white text-4xl md:text-5xl transition-colors duration-300">
            Featured Projects
          </p>
        </div>

        <div className="z-10 relative px-6 md:px-12 pb-20">
          <div className="space-y-12">
            {projects.map((project, idx) => {
              const style = getProjectStyle(idx);

              return (
                <div
                  key={idx}
                  className={`relative w-full ${style.bg} rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10`}
                >
                  <div className="flex flex-col justify-center p-8 md:p-16 w-full md:w-1/2">
                    <div
                      className={`flex items-center gap-4 text-xs font-mono mb-6 ${style.accent} uppercase tracking-wider`}
                    >
                      <span>{project.date}</span>
                      <span className="bg-current opacity-50 w-px h-3"></span>
                      <span>{project.status}</span>
                    </div>

                    <h3
                      className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${style.text}`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`text-lg md:text-xl leading-relaxed mb-10 opacity-90 ${style.text}`}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-12">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`px-4 py-1.5 text-sm font-medium rounded-full border backdrop-blur-sm ${style.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all transform hover:-translate-y-1 hover:shadow-lg ${style.button}`}
                        >
                          <span>View Demo</span>
                          <ArrowUpRight
                            size={18}
                            className="group-hover:rotate-45 transition-transform"
                          />
                        </a>
                      )}

                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-8 py-4 bg-transparent border border-white/30 rounded-full font-bold hover:bg-white/10 transition-all ${style.text}`}
                        >
                          <Github size={20} />
                          <span>View Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="relative bg-black/10 w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                    <div className="absolute inset-0 flex justify-center items-center p-12">
                      <div className="relative flex flex-col gap-4 bg-white/10 shadow-2xl backdrop-blur-md p-6 border border-white/20 rounded-lg w-full aspect-[4/3] rotate-3 hover:rotate-0 transition-transform duration-700 transform">
                        <div className="bg-white/20 mb-4 rounded w-full h-8"></div>
                        <div className="flex gap-4 mb-4">
                          <div className="bg-white/10 rounded w-1/3 h-32"></div>
                          <div className="bg-white/10 rounded w-2/3 h-32"></div>
                        </div>
                        <div className="bg-white/10 rounded w-full h-4"></div>
                        <div className="bg-white/10 rounded w-3/4 h-4"></div>
                        <div className="top-6 right-6 absolute text-white/40">
                          <ArrowUpRight size={48} />
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

