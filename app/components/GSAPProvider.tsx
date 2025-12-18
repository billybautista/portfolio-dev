"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ReactNode } from "react";

// Registrar plugins globalmente una sola vez
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

interface GSAPProviderProps {
  children: ReactNode;
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  return <>{children}</>;
}
