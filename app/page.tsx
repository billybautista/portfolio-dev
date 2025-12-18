import Marquee from "./components/Marquee";
import About from "./components/sections/About";
import Hero from "./components/sections/Hero";
import Stats from "./components/sections/Stats";

export default function Home() {
  return (
    <main className="bg-white dark:bg-black w-full min-h-screen text-zinc-900 dark:text-white transition-colors duration-300">
      <Hero />
      <Stats />
      <About />
      <Marquee />
    </main>
  );
}
