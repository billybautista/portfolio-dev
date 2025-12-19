import Marquee from "./components/Marquee";
import About from "./components/sections/About";
import FallingPills from "./components/sections/FallingPills";
import Hero from "./components/sections/Hero";
import Philosophy from "./components/sections/Philosophy";
import Projects from "./components/sections/Projects";
import Stats from "./components/sections/Stats";
import TechStack from "./components/sections/TechStack";

export default function Home() {
  return (
    <main className="bg-white dark:bg-black w-full min-h-screen text-zinc-900 dark:text-white transition-colors duration-300">
      <Hero />
      <Stats />
      <About />
      <Marquee />
      <TechStack />
      <Philosophy />
      <FallingPills />
      <Projects limit={4} showAnimations={true} />
    </main>
  );
}
