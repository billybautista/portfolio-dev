"use client";

import { usePageViews } from "@/app/hooks/usePageViews";
import { urlFor } from "@/sanity/lib/image";
import { SanityProject } from "@/sanity/lib/types";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Github,
} from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface ProjectDetailProps {
  project: SanityProject;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30";
    case "in progress":
      return "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30";
    case "coming soon":
      return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30";
    case "maintenance":
      return "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30";
    default:
      return "text-foreground-subtle bg-foreground-subtle/10";
  }
};

// Helper to convert video URLs to embed format
const getEmbedUrl = (
  url: string
): { type: "iframe" | "video"; url: string } | null => {
  // Loom
  const loomMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
  if (loomMatch) {
    return {
      type: "iframe",
      url: `https://www.loom.com/embed/${loomMatch[1]}`,
    };
  }

  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (youtubeMatch) {
    return {
      type: "iframe",
      url: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return {
      type: "iframe",
      url: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  // Direct video URL
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return { type: "video", url };
  }

  return null;
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const { t, i18n } = useTranslation();
  const language = (i18n.language as "en" | "es") || "en";

  // Track page views
  usePageViews(`/projects/${project.slug}`);

  const getDescription = () => {
    return project.description?.[language] || project.description?.en || "";
  };

  const renderMedia = () => {
    const media = project.media;

    // If there's an image
    if (media?.type === "image" && media.image) {
      return (
        <Image
          src={urlFor(media.image).url()}
          alt={media.alt || project.title}
          fill
          className="object-cover"
          priority
        />
      );
    }

    // If there's a video
    if (media?.type === "video" && media.video) {
      const videoEmbed = getEmbedUrl(media.video);

      if (videoEmbed?.type === "video") {
        // Direct video file
        return (
          <video
            src={videoEmbed.url}
            controls
            className="w-full h-full object-cover"
            poster={media.alt}
          >
            Your browser does not support the video tag.
          </video>
        );
      } else if (videoEmbed?.type === "iframe") {
        // YouTube/Vimeo/Loom embed
        return (
          <iframe
            src={videoEmbed.url}
            title={media.alt || project.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }
    }

    // Fallback: Browser mockup placeholder
    return (
      <div className="relative w-3/4 h-3/4 rounded-xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden">
        {/* Browser Elements */}
        <div className="h-10 border-b border-border bg-surface px-4 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <div className="h-3 w-3 rounded-full bg-green-400/80" />
          <div className="ml-4 h-6 w-1/2 rounded-md bg-border/30" />
        </div>
        {/* Placeholder Content */}
        <div className="flex-1 bg-surface/50 p-8 flex flex-col gap-6">
          <div className="h-8 w-1/3 rounded-lg bg-border/30" />
          <div className="h-4 w-3/4 rounded-md bg-border/20" />
          <div className="h-4 w-1/2 rounded-md bg-border/20" />
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div className="h-32 rounded-lg bg-border/20" />
            <div className="h-32 rounded-lg bg-border/20" />
          </div>
        </div>
      </div>
    );
  };

  const hasMedia = project.media?.image || project.media?.video;

  return (
    <main className="min-h-screen w-full bg-background text-foreground animate-in fade-in duration-500">
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-20">
        {/* Header Section */}
        <header className="mb-16">
          <div className="mb-8 flex items-center justify-between border-b border-border/50 pb-8">
            <span className="section-label">
              {t("projects.projectDetails", "Project Details")}
            </span>
            <Link
              href="/projects"
              className="group flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm font-medium text-foreground-muted transition-all hover:bg-surface hover:text-foreground"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              {t("projects.back", "Back to Projects")}
            </Link>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getStatusColor(
                project.status
              )}`}
            >
              <CheckCircle2 size={12} />
              {t(`projects.status.${project.status}`, project.status)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-foreground-muted">
              <Calendar size={14} />
              {project.date}
            </span>
          </div>

          <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {project.title}
          </h1>

          <p className="max-w-3xl text-lg leading-relaxed text-foreground-muted md:text-xl">
            {getDescription()}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2"
              >
                <span>{t("projects.visit", "Visit Project")}</span>
                <ArrowUpRight size={18} />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <Github size={18} />
                <span>{t("projects.code", "Source")}</span>
              </a>
            )}
          </div>
        </header>

        {/* Visual Showcase */}
        <section className="mb-20 overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-lg">
          <div
            className={`relative w-full bg-background-alt flex items-center justify-center ${
              hasMedia ? "aspect-video" : "aspect-video p-10"
            }`}
          >
            {renderMedia()}
          </div>
        </section>

        {/* Details Grid */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Tech Stack */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 font-display text-xl font-bold text-foreground">
              {t("projects.technologies", "Technologies")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground-muted transition-colors hover:border-border-hover hover:text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Project Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="mb-4 font-display text-xl font-bold text-foreground">
                {t("projects.about", "About the Project")}
              </h3>
              <div className="prose prose-lg prose-invert max-w-none text-foreground-muted prose-headings:font-display prose-headings:text-foreground prose-strong:text-foreground-emphasis prose-ul:list-disc prose-li:marker:text-foreground-subtle">
                {project.content?.[language] ? (
                  <PortableText value={project.content[language]} />
                ) : project.content?.en ? (
                  <PortableText value={project.content.en} />
                ) : (
                  <p className="text-foreground-muted italic">
                    {t(
                      "projects.noContent",
                      "No detailed content available yet."
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
