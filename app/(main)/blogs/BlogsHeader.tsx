"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function BlogsHeader() {
  const { t } = useTranslation();

  return (
    <section className="section-padding border-b border-border bg-background py-20">
      <div className="mb-8 flex items-center justify-between">
        <span className="section-label">
          {t("blog.blogLabel", "Thoughts, insights & technical deep-dives")}
        </span>
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm font-medium text-foreground-muted transition-all hover:bg-surface hover:text-foreground"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
          />
          {t("projects.backToHome", "Back to Home")}
        </Link>
      </div>
      <h1 className="section-title text-4xl text-foreground md:text-5xl lg:text-6xl">
        {t("blog.blogArticles", "Blog Articles")}
      </h1>
    </section>
  );
}


