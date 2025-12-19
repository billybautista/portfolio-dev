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

  const icons = [
    { name: "React", icon: ReactIcon },
    { name: "Next.js", icon: NextIcon, invertDark: true },
    { name: "TypeScript", icon: TSIcon },
    { name: "JavaScript", icon: JSIcon },
    { name: "Node.js", icon: NodeIcon },
    { name: "Tailwind CSS", icon: TailwindIcon },
    { name: "Prisma", icon: PrismaIcon, invertDark: true },
    { name: "PostgreSQL", icon: PostgresIcon },
    { name: "MongoDB", icon: MongoIcon, invertDark: true },
    { name: "GraphQL", icon: GraphQLIcon },
    { name: "Express", icon: ExpressIcon, invertDark: true },
    { name: "Nest.js", icon: NestIcon },
    { name: "React Query", icon: ReactQueryIcon },
    { name: "Supabase", icon: SupabaseIcon },
    { name: "Python", icon: PythonIcon },
    { name: "Django", icon: DjangoIcon },
    { name: "Plasmo", icon: PlasmoIcon, invertDark: true },
    { name: "Strapi", icon: StrapiIcon },
    { name: "Sanity", icon: SanityIcon, invertDark: true },
    { name: "TypeORM", icon: TypeORMIcon },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current && sectionRef.current) {
        const items = gridRef.current.children;

        gsap.set(items, {
          opacity: 0.3,
          filter: "grayscale(100%)",
        });

        gsap.to(items, {
          opacity: 1,
          filter: "grayscale(0%)",
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 20%",
            end: "top 0%",
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-background py-32 transition-colors duration-300"
    >
      <div className="mb-16">
        <span className="section-label mb-4 block">Tech Stack</span>
        <h2 className="section-title text-4xl text-foreground md:text-5xl">
          Tools I use to build
        </h2>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-10"
      >
        {icons.map((item, idx) => (
          <div
            key={idx}
            className="group flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:border-border-hover hover:bg-surface-elevated"
            title={item.name}
          >
            <div className="flex h-10 w-10 items-center justify-center transition-transform duration-300 group-hover:scale-110 md:h-12 md:w-12">
              <Image
                src={item.icon}
                alt={item.name}
                width={48}
                height={48}
                className={`h-8 w-8 object-contain transition-all duration-300 md:h-10 md:w-10 ${
                  item.invertDark ? "dark:invert" : ""
                }`}
              />
            </div>
            <span className="mt-2 text-center text-[10px] font-medium text-foreground-subtle opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:text-xs">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
