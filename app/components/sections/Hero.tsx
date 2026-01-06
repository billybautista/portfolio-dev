"use client";
import { ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center section-padding min-h-screen"
    >
      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-30" />

      <div className="relative z-10 flex h-full flex-col justify-center pb-32 pt-20">
        {/* Status badge */}
        <div className="mb-8 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-md font-medium text-foreground-muted">
            {t("hero.available", "Available for new projects")}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="mb-6">
          <span className="block font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            Billy Bautista
          </span>
          <span className="mt-2 block font-display text-3xl font-medium tracking-tight text-foreground-muted sm:text-4xl md:text-5xl lg:text-6xl">
            {t("hero.role", "Software Engineer")}
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-xl text-lg leading-relaxed text-foreground-muted md:text-xl">
          {t(
            "hero.description",
            "Crafting elegant digital experiences through clean code and thoughtful design. Specialized in building fast, scalable web applications."
          )}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#projects" className="btn-primary">
            {t("hero.viewWork", "View My Work")}
          </a>
          <a href="#contact" className="btn-secondary">
            {t("hero.contact", "Get In Touch")}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <a
          href="#stats"
          className="flex flex-col items-center gap-2 text-foreground-subtle transition-colors hover:text-foreground"
        >
          <span className="text-xs font-medium uppercase tracking-widest">
            {t("hero.scroll", "Scroll")}
          </span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
