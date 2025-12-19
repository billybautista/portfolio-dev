"use client";
import React from "react";

const Marquee: React.FC = () => {
  const words = [
    "DEVELOP",
    "INNOVATE",
    "DRIVE",
    "SOLVE",
    "CREATE",
    "OPTIMIZE",
    "AUTOMATE",
    "CONNECT",
    "INSPIRE",
  ];

  return (
    <div className="w-full py-10 bg-[#FDFBF7] dark:bg-black transition-colors duration-300 overflow-hidden px-6 md:px-12">
      {/* Mask for fade edges */}
      <div
        className="w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex animate-marquee">
          {/* Duplicate content for seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {words.map((word, index) => (
                <span
                  key={index}
                  className="text-xl md:text-3xl lg:text-4xl font-bold tracking-widest px-6 md:px-10 uppercase transition-colors duration-300 text-[#1A2E05] dark:text-zinc-200"
                >
                  {word}
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
