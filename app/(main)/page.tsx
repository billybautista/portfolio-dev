import { getProjects } from "@/sanity/lib/fetch";
import Marquee from "../components/Marquee";
import About from "../components/sections/About";
import FallingPills from "../components/sections/FallingPills";
import Hero from "../components/sections/Hero";
import Philosophy from "../components/sections/Philosophy";
import Projects from "../components/sections/Projects";
import Stats from "../components/sections/Stats";
import TechStack from "../components/sections/TechStack";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="bg-background w-full min-h-screen text-foreground transition-colors duration-400">
      <Hero />
      <Stats />
      <About />
      <Marquee />
      <TechStack />
      <Philosophy />
      <FallingPills />
      <Projects projects={projects} limit={4} />
    </main>
  );
}
