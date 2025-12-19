"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";
import React, { useRef } from "react";

interface FallingPillsProps {
  triggerRef?: React.RefObject<HTMLElement>;
}

const tags = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind",
  "GSAP",
  "PostgreSQL",
  "Three.js",
  "Design",
  "Performance",
  "AWS",
  "Docker",
  "UX/UI",
  "Clean Code",
  "Scalability",
  "API Design",
];

const colors = [
  {
    border: "border-cyan-500",
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-100 dark:bg-cyan-950",
  },
  {
    border: "border-purple-500",
    text: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-950",
  },
  {
    border: "border-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-950",
  },
  {
    border: "border-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-100 dark:bg-rose-950",
  },
  {
    border: "border-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-950",
  },
  {
    border: "border-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-950",
  },
];

const FallingPills: React.FC<FallingPillsProps> = ({ triggerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !sceneRef.current) return;

      const { Engine, Render, World, Bodies, Runner, MouseConstraint, Mouse } =
        Matter;

      const engine = Engine.create();
      const world = engine.world;
      engine.world.gravity.y = 0.3;

      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const render = Render.create({
        element: container,
        engine: engine,
        options: {
          width,
          height,
          background: "transparent",
          wireframes: false,
          showAngleIndicator: false,
          pixelRatio: 1,
        },
      });

      // Ensure canvas is properly styled for mouse interaction
      render.canvas.style.position = "absolute";
      render.canvas.style.top = "0";
      render.canvas.style.left = "0";
      render.canvas.style.width = "100%";
      render.canvas.style.height = "100%";
      render.canvas.style.zIndex = "10";
      render.canvas.style.touchAction = "pan-y";

      const wallOptions = {
        isStatic: true,
        render: { fillStyle: "transparent" },
      };
      const ground = Bodies.rectangle(
        width / 2,
        height + 50,
        width,
        100,
        wallOptions
      );
      const leftWall = Bodies.rectangle(
        -50,
        height / 2,
        100,
        height * 2,
        wallOptions
      );
      const rightWall = Bodies.rectangle(
        width + 50,
        height / 2,
        100,
        height * 2,
        wallOptions
      );

      World.add(world, [ground, leftWall, rightWall]);

      const pillElements = Array.from(
        sceneRef.current.children
      ) as HTMLElement[];
      const bodies: Matter.Body[] = [];

      pillElements.forEach((el) => {
        const x = Math.random() * (width - 100) + 50;
        const y = -Math.random() * 800 - 200;

        const body = Bodies.rectangle(x, y, el.offsetWidth, el.offsetHeight, {
          restitution: 0.5,
          friction: 0.1,
          frictionAir: 0.02,
          render: { opacity: 0 },
        });

        (body as Matter.Body & { domElement: HTMLElement }).domElement = el;
        bodies.push(body);
      });

      World.add(world, bodies);

      const mouse = Mouse.create(render.canvas);

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

      // Disable scroll hijacking from mouse constraint
      const mouseElement = mouseConstraint.mouse.element;
      const mouseAny = mouseConstraint.mouse as unknown as {
        mousewheel: EventListener;
      };
      mouseElement.removeEventListener("mousewheel", mouseAny.mousewheel);
      mouseElement.removeEventListener("DOMMouseScroll", mouseAny.mousewheel);

      // Allow scroll to pass through the canvas
      const handleWheel = (e: WheelEvent) => {
        window.scrollBy(0, e.deltaY);
      };
      render.canvas.addEventListener("wheel", handleWheel, { passive: true });

      World.add(world, mouseConstraint);
      render.mouse = mouse;

      Render.run(render);

      const runner = Runner.create();
      runner.enabled = false;
      Runner.run(runner, engine);

      const triggerElement = triggerRef?.current || containerRef.current;

      // ScrollTrigger will be automatically cleaned up by useGSAP
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 60%",
        once: true,
        onEnter: () => {
          runner.enabled = true;
        },
      });

      const updateDOM = () => {
        bodies.forEach((body) => {
          const el = (body as Matter.Body & { domElement?: HTMLElement })
            .domElement;
          if (el) {
            const { x, y } = body.position;
            const angle = body.angle;
            el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${
              y - el.offsetHeight / 2
            }px) rotate(${angle}rad)`;
            el.style.opacity = "1";
          }
        });
        requestAnimationFrame(updateDOM);
      };

      const animId = requestAnimationFrame(updateDOM);

      const handleResize = () => {
        if (!container || !render.canvas) return;
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;

        render.canvas.width = newWidth;
        render.canvas.height = newHeight;

        Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 });
        Matter.Body.setPosition(rightWall, {
          x: newWidth + 50,
          y: newHeight / 2,
        });
      };

      window.addEventListener("resize", handleResize);

      // Cleanup function for Matter.js (ScrollTrigger is auto-cleaned by useGSAP)
      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);

        Render.stop(render);
        Runner.stop(runner);
        if (world) World.clear(world, false);
        if (engine) Engine.clear(engine);

        if (render.canvas) {
          render.canvas.removeEventListener("wheel", handleWheel);
          render.canvas.remove();
          (render as { canvas: HTMLCanvasElement | null }).canvas = null;
        }
        (render as { context: CanvasRenderingContext2D | null }).context = null;
        render.textures = {};
      };
    },
    { scope: containerRef, dependencies: [triggerRef] }
  );

  return (
    <div className="px-6 md:px-12 border-t border-b border-zinc-200 dark:border-zinc-800">
      <section className="relative bg-white dark:bg-black py-20 w-full h-[600px] overflow-hidden transition-colors duration-300 border-x border-zinc-200 dark:border-zinc-800">
        <div className="top-10 left-0 z-0 absolute w-full text-center pointer-events-none">
          <p className="mb-4 font-mono text-zinc-500 text-sm uppercase tracking-widest">
            Interests & Skills
          </p>
          <h2 className="font-light text-black dark:text-white text-3xl md:text-5xl transition-colors duration-300">
            Drag & Thro
          </h2>
        </div>

        <div
          ref={containerRef}
          className="z-10 absolute inset-0 w-full h-full  active:cursor-grabbing"
        >
          <div
            ref={sceneRef}
            className="top-0 left-0 absolute w-full h-full pointer-events-none z-20"
          >
            {tags.map((tag, i) => {
              const color = colors[i % colors.length];
              return (
                <div
                  key={i}
                  className={`absolute top-0 left-0 inline-block px-8 py-3 rounded-full border ${color.bg} ${color.border} ${color.text} text-xl md:text-2xl font-medium whitespace-nowrap select-none opacity-0 shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] will-change-transform`}
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FallingPills;
