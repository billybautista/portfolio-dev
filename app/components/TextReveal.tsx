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
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = new SplitText(textRef.current, {
        type: "chars,words",
      });
      gsap.from(split.chars, {
        opacity: 0.15,
        duration: 2,
        stagger: 2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: 0.5,
          start: "top center",
          end: "bottom 70%",
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
