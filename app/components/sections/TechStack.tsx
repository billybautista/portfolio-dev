"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

import DjangoIcon from "@/public/icons/django.svg";
import ExpressIcon from "@/public/icons/expressjs.svg";
import GraphQLIcon from "@/public/icons/graphql.svg";
import JSIcon from "@/public/icons/javascript.svg";
import MongoIcon from "@/public/icons/mongodb.svg";
import NestIcon from "@/public/icons/nestjs.svg";
import NextIcon from "@/public/icons/nextjs.svg";
import NodeIcon from "@/public/icons/nodejs.svg";
import PlasmoIcon from "@/public/icons/plasmo.svg";
import PostgresIcon from "@/public/icons/postgresql.svg";
import PrismaIcon from "@/public/icons/prisma.svg";
import PythonIcon from "@/public/icons/python.svg";
import ReactIcon from "@/public/icons/react.svg";
import ReactQueryIcon from "@/public/icons/reactquery.svg";
import SanityIcon from "@/public/icons/sanity.svg";
import StrapiIcon from "@/public/icons/strapi.svg";
import SupabaseIcon from "@/public/icons/supabase.svg";
import TailwindIcon from "@/public/icons/tailwindcss.svg";
import TypeORMIcon from "@/public/icons/typeorm.svg";
import TSIcon from "@/public/icons/typescript.svg";

import Image from "next/image";

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Frontend
  const frontendIcons = [
    {
      name: "React",
      icon: ReactIcon,
    },
    {
      name: "Next.js",
      icon: NextIcon,
      invertDark: true,
    },
    {
      name: "Plasmo",
      icon: PlasmoIcon,
      invertDark: true,
    },
    {
      name: "JavaScript",
      icon: JSIcon,
    },
    {
      name: "TypeScript",
      icon: TSIcon,
    },
    {
      name: "React Query",
      icon: ReactQueryIcon,
    },
    {
      name: "Tailwind CSS",
      icon: TailwindIcon,
    },
    {
      name: "Strapi",
      icon: StrapiIcon,
    },
    {
      name: "Sanity",
      icon: SanityIcon,
      invertDark: true,
    },
    {
      name: "GraphQL",
      icon: GraphQLIcon,
    },
  ];

  // Backend
  const backendIcons = [
    {
      name: "Node.js",
      icon: NodeIcon,
    },
    {
      name: "Express",
      icon: ExpressIcon,
      invertDark: true,
    },
    {
      name: "Nest.js",
      icon: NestIcon,
    },
    {
      name: "Python",
      icon: PythonIcon,
    },
    {
      name: "Django",
      icon: DjangoIcon,
    },
    {
      name: "Supabase",
      icon: SupabaseIcon,
    },
  ];

  // Database
  const databaseIcons = [
    {
      name: "MongoDB",
      icon: MongoIcon,
      invertDark: true,
    },
    {
      name: "PostgreSQL",
      icon: PostgresIcon,
    },
    {
      name: "Prisma",
      icon: PrismaIcon,
      invertDark: true,
    },
    {
      name: "TypeORM",
      icon: TypeORMIcon,
    },
  ];

  const icons = [...frontendIcons, ...backendIcons, ...databaseIcons];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current && sectionRef.current) {
        const items = gridRef.current.children;

        // Initial state: grayscale and slightly transparent
        gsap.set(items, {
          opacity: 0.4,
          filter: "grayscale(100%)",
        });

        // Animate each icon as user scrolls through the section
        gsap.to(items, {
          opacity: 1,
          filter: "grayscale(0%)",
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 15%",
            end: "top 0%",
            scrub: 0.5,
            markers: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white dark:bg-black px-6 md:px-12 py-32 transition-colors duration-300">
      <div ref={sectionRef} className="mb-14 md:text-left text-center">
        <h2 className="mb-4 font-mono text-zinc-500 text-sm uppercase tracking-widest">
          Tech Stack
        </h2>
        <p className="font-light text-black dark:text-white text-4xl md:text-5xl transition-colors duration-300">
          The tools I use to build the future.
        </p>
      </div>

      <div
        ref={gridRef}
        className="place-items-center gap-6 md:gap-4 grid grid-cols-3 md:grid-cols-5"
      >
        {icons.map((item, idx) => (
          <div
            key={idx}
            className="tech-icon group flex flex-col justify-center items-center gap-3 cursor-pointer"
            title={item.name}
          >
            <div className="flex justify-center items-center w-20 md:w-24 h-20 md:h-24 group-hover:scale-110 transition-transform duration-300 transform">
              <Image
                src={item.icon}
                alt={item.name}
                width={100}
                height={100}
                className={`w-16 md:w-20 h-16 md:h-20 object-contain transition-transform duration-300 ${
                  item.invertDark ? "dark:invert" : ""
                }`}
              />
            </div>
            <span className="opacity-0 group-hover:opacity-100 font-medium text-zinc-600 dark:group-hover:text-white dark:text-zinc-400 group-hover:text-zinc-900 text-xs md:text-sm text-center transition-all duration-300">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
