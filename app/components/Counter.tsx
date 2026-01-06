"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({
  value,
  duration = 2,
  suffix = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const obj = { value: 0 };

    gsap.fromTo(
      obj,
      { value: 0 },
      {
        value: value,
        duration: duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (element) {
            element.innerText = Math.round(obj.value).toLocaleString() + suffix;
          }
        },
      }
    );
  }, [value, duration, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

export default Counter;
