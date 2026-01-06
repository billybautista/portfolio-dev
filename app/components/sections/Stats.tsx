"use client";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

import Counter from "../Counter";

interface StatsProps {
  homeViews?: number;
  projectCount?: number;
}

const Stats: React.FC<StatsProps> = ({ homeViews = 0, projectCount = 0 }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: homeViews, label: t("stats.views", "Page Views") },
    { value: 4, label: t("stats.experience", "Years Experience") },
    { value: projectCount, label: t("stats.projects", "Projects Shipped") },
    { value: 5, label: t("stats.clients", "Happy Clients") },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  return (
    <section
      id="stats"
      className="relative w-full bg-background transition-colors duration-300"
    >
      <div
        ref={containerRef}
        className="grid grid-cols-2 border-y border-border md:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            onMouseMove={handleMouseMove}
            className={`group relative flex flex-col items-center justify-center px-4 py-16 transition-colors duration-300 ${
              index !== 0 ? "border-l border-border" : ""
            }`}
          >
            {/* Spotlight Effect */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(400px circle at var(--x) var(--y), var(--border), transparent 40%)`,
              }}
            />

            <h3 className="relative z-10 mb-2 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              <Counter value={stat.value} suffix="+" />
            </h3>
            <p className="relative z-10 text-xs font-medium uppercase tracking-widest text-foreground-subtle">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
