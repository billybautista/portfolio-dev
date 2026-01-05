import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex w-full flex-col items-center justify-center bg-background text-foreground transition-colors duration-300">
      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center section-padding">
        {/* Error Code */}
        <div className="mb-10">
          <h1 className="font-display text-9xl font-bold tracking-tight text-foreground sm:text-[12rem] md:text-[16rem] lg:text-[20rem]">
            404
          </h1>
        </div>

        {/* Title */}
        <h2 className="section-title mb-10 text-center text-3xl text-foreground md:text-4xl lg:text-5xl">
          Page Not Found
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="btn-primary group flex items-center gap-2">
            <Home
              size={18}
              className="transition-transform group-hover:scale-110"
            />
            <span>Back to Home</span>
          </Link>
          <Link
            href="/#projects"
            className="btn-secondary group flex items-center gap-2"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>View Projects</span>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="mt-15 flex items-center gap-2 text-sm text-foreground-subtle">
          <span className="h-px w-12 bg-border" />
          <span>404</span>
          <span className="h-px w-12 bg-border" />
        </div>
      </div>
    </main>
  );
}

