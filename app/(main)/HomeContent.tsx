"use client";

import { useGetPageViews } from "@/app/hooks/useGetPageViews";
import { usePageViews } from "@/app/hooks/usePageViews";
import { SanityProject } from "@/sanity/lib/types";
import Marquee from "../components/Marquee";
import About from "../components/sections/About";
import FallingPills from "../components/sections/FallingPills";
import Hero from "../components/sections/Hero";
import Philosophy from "../components/sections/Philosophy";
import Projects from "../components/sections/Projects";
import Stats from "../components/sections/Stats";
import TechStack from "../components/sections/TechStack";

interface HomeContentProps {
  projects: SanityProject[];
}

export default function HomeContent({ projects }: HomeContentProps) {
  usePageViews("/");
  const { views: homeViews } = useGetPageViews("/");

  // Count only non-hidden projects
  const visibleProjectsCount = projects.filter((p) => !p.isHidden).length;

  return (
    <main className="bg-background w-full min-h-screen text-foreground transition-colors duration-400">
      <Hero />
      <Stats homeViews={homeViews} projectCount={visibleProjectsCount} />
      <About />
      <Marquee />
      <TechStack />
      <Philosophy />
      <FallingPills />
      <Projects projects={projects} limit={4} />
    </main>
  );
}
