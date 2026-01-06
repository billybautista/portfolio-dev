"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Matter from "matter-js";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

interface FallingPillsProps {
  triggerRef?: React.RefObject<HTMLElement>;
}

// Monochromatic, sophisticated color palette
const colors = [
  {
    border: "border-neutral-300 dark:border-neutral-700",
    text: "text-neutral-700 dark:text-neutral-300",
    bg: "bg-white dark:bg-neutral-900",
  },
  {
    border: "border-neutral-400 dark:border-neutral-600",
    text: "text-neutral-800 dark:text-neutral-200",
    bg: "bg-neutral-50 dark:bg-neutral-800",
  },
  {
    border: "border-neutral-200 dark:border-neutral-800",
    text: "text-neutral-600 dark:text-neutral-400",
    bg: "bg-neutral-100 dark:bg-neutral-900",
  },
];

const FallingPills: React.FC<FallingPillsProps> = ({ triggerRef }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const tags = t("fallingPills.tags", {
    returnObjects: true,
    defaultValue: [
      "Full-Stack Engineering",
      "End-to-End Development",
      "API Design",
      "Data Modeling",
      "Performance Optimization",
      "User Experience",
      "Backend Architecture",
      "Frontend Architecture",
      "Code Maintainability",
      "Product Thinking",
    ],
  }) as string[];

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

      const mouseElement = mouseConstraint.mouse.element;
      const mouseAny = mouseConstraint.mouse as unknown as {
        mousewheel: EventListener;
        mousedown: EventListener;
        mousemove: EventListener;
        mouseup: EventListener;
      };

      // Remove default blocking listeners
      mouseElement.removeEventListener("mousewheel", mouseAny.mousewheel);
      mouseElement.removeEventListener("DOMMouseScroll", mouseAny.mousewheel);
      mouseElement.removeEventListener("touchstart", mouseAny.mousedown);
      mouseElement.removeEventListener("touchmove", mouseAny.mousemove);
      mouseElement.removeEventListener("touchend", mouseAny.mouseup);

      // Re-add touch listeners as passive to allow scrolling
      mouseElement.addEventListener("touchstart", mouseAny.mousedown, {
        passive: true,
      });
      mouseElement.addEventListener("touchmove", mouseAny.mousemove, {
        passive: true,
      });
      mouseElement.addEventListener("touchend", mouseAny.mouseup, {
        passive: true,
      });

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
    <div className="border-y border-border">
      <section className="relative h-[600px] w-full overflow-hidden bg-background transition-colors duration-300">
        <div className="pointer-events-none absolute left-0 top-10 z-0 w-full text-center">
          <span className="section-label mb-4 block">
            {t("fallingPills.label", "Interests & Skills")}
          </span>
          <h2 className="section-title text-3xl text-foreground md:text-5xl">
            {t("fallingPills.title", "Drag & Explore")}
          </h2>
        </div>

        <div
          ref={containerRef}
          className="absolute inset-0 z-10 h-full w-full active:cursor-grabbing"
        >
          <div
            ref={sceneRef}
            className="pointer-events-none absolute left-0 top-0 z-20 h-full w-full"
          >
            {tags.map((tag, i) => {
              const color = colors[i % colors.length];
              return (
                <div
                  key={i}
                  className={`text-sm absolute left-0 top-0 inline-block select-none whitespace-nowrap rounded-full border px-4 py-2 font-medium opacity-0 shadow-sm transition-shadow will-change-transform hover:shadow-md md:px-10 md:py-4 md:text-2xl ${color.bg} ${color.border} ${color.text}`}
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
