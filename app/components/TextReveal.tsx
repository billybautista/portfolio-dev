"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  type?: "words" | "letters";
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = "",
  type = "letters",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!textRef.current || !containerRef.current) return;

      const split = new SplitText(textRef.current, {
        type: type === "words" ? "words" : "chars,words",
      });

      const elements = type === "words" ? split.words : split.chars;

      gsap.from(elements, {
        opacity: 0.15,
        duration: 0.5,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 0.5,
          start: "top 80%",
          end: "bottom 60%",
          // markers: true, // Descomentar para debug
        },
      });

      // Cleanup
      return () => {
        split.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div ref={textRef}>{children}</div>
    </div>
  );
};

export default TextReveal;
