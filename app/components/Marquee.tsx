"use client";
import React from "react";

const Marquee: React.FC = () => {
  const words = [
    "BUILD",
    "INNOVATE",
    "DESIGN",
    "CREATE",
    "OPTIMIZE",
    "SCALE",
    "DELIVER",
    "ITERATE",
  ];

  return (
    <div className="w-full border-y border-border bg-surface py-6 overflow-hidden transition-colors duration-300">
      {/* Mask for fade edges */}
      <div
        className="w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="flex animate-marquee">
          {/* Duplicate content for seamless loop */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {words.map((word, index) => (
                <span
                  key={index}
                  className="flex items-center gap-8 px-8 md:gap-12 md:px-12"
                >
                  <span className="font-display text-2xl font-bold tracking-wide text-foreground md:text-4xl">
                    {word}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
