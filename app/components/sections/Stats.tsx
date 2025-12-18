"use client";
import React, { useRef } from "react";

const Stats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const stats = [
    { target: 15, suffix: "k+", label: "views", leadingZero: false },
    { target: 4, suffix: "+", label: "years", leadingZero: true },
    { target: 8, suffix: "+", label: "shipped", leadingZero: true },
    { target: 5, suffix: "+", label: "clients", leadingZero: true },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  };

  return (
    <section className="relative w-full bg-white/50 dark:bg-black/50 transition-colors duration-300 backdrop-blur-sm">
      <div
        ref={containerRef}
        className="grid grid-cols-2 md:grid-cols-4 border-t border-zinc-200 dark:border-zinc-800"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            onMouseMove={handleMouseMove}
            className={`group relative flex flex-col items-center justify-center py-12 px-4 transition-colors duration-300 ${
              index !== stats.length - 1
                ? "border-r border-zinc-200 dark:border-zinc-800"
                : ""
            }`}
          >
            {/* Spotlight Effect - Light Mode (Black Glow) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"
              style={{
                background: `radial-gradient(400px circle at var(--x) var(--y), rgba(0, 0, 0, 0.05), transparent 40%)`,
              }}
            />

            {/* Spotlight Effect - Dark Mode (White Glow) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden dark:block"
              style={{
                background: `radial-gradient(400px circle at var(--x) var(--y), rgba(255, 255, 255, 0.1), transparent 40%)`,
              }}
            />

            <h3 className="relative z-10 text-3xl md:text-5xl font-bold text-black dark:text-white mb-2 tracking-tight flex items-baseline">
              <span
                ref={(el) => {
                  numberRefs.current[index] = el;
                }}
              >
                {stat.leadingZero ? "00" : "0"}
              </span>
              <span>{stat.suffix}</span>
            </h3>
            <p className="relative z-10 text-[10px] md:text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-center">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
