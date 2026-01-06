"use client";

import { urlFor } from "@/sanity/lib/image";
import { SanityProject } from "@/sanity/lib/types";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  project: SanityProject;
  size?: "default" | "large";
}

// Helper to get embed URL for different video platforms
const getVideoEmbed = (url: string) => {
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
      url: `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&mute=1&loop=1`,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return {
      type: "iframe",
      url: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1`,
    };
  }

  // Direct video file
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return { type: "video", url };
  }

  return null;
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-emerald-600 dark:text-emerald-400";
    case "in progress":
      return "text-amber-600 dark:text-amber-400";
    case "coming soon":
      return "text-blue-600 dark:text-blue-400";
    case "maintenance":
      return "text-purple-600 dark:text-purple-400";
    default:
      return "text-foreground-subtle";
  }
};

export default function ProjectCard({
  project,
  size = "default",
}: ProjectCardProps) {
  const { t, i18n } = useTranslation();
  const language = (i18n.language as "en" | "es") || "en";

  const getDescription = () => {
    return project.description?.[language] || project.description?.en || "";
  };

  const labels = {
    demo: t("projects.demo", "Live Demo"),
    code: t("projects.code", "Source"),
    details: t("projects.details", "View Details"),
  };

  const isLarge = size === "large";

  // Render media (image, video, or fallback)
  const renderMedia = () => {
    const media = project.media;

    // Video support
    if (media?.type === "video" && media.video) {
      const videoEmbed = getVideoEmbed(media.video);

      if (videoEmbed?.type === "iframe") {
        return (
          <div
            className={
              isLarge
                ? "absolute inset-4 md:inset-6 overflow-hidden rounded-xl"
                : "absolute inset-0"
            }
          >
            <iframe
              src={videoEmbed.url}
              title={media.alt || project.title}
              className="w-full h-full"
              allow="autoplay"
            />
          </div>
        );
      }

      if (videoEmbed?.type === "video") {
        return (
          <div
            className={
              isLarge
                ? "absolute inset-4 md:inset-6 overflow-hidden rounded-xl"
                : "absolute inset-0"
            }
          >
            <video
              src={videoEmbed.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        );
      }
    }

    // Image support
    if (media?.type === "image" && media.image) {
      return (
        <div
          className={
            isLarge
              ? "absolute inset-4 md:inset-6 overflow-hidden rounded-xl"
              : "absolute inset-0"
          }
        >
          <Image
            src={urlFor(media.image).url()}
            alt={media.alt || project.title}
            fill
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <Link
            href={`/projects/${project.slug}`}
            className="absolute inset-0 z-10"
          />
        </div>
      );
    }

    // Fallback: Browser mockup placeholder
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative w-full max-w-xs transform rounded-lg border border-border bg-surface p-4 shadow-sm transition-transform duration-500 group-hover:scale-105 group-hover:rotate-0 rotate-2">
          <div className="mb-3 flex gap-2">
            <div className="h-2 w-2 rounded-full bg-border" />
            <div className="h-2 w-2 rounded-full bg-border" />
            <div className="h-2 w-2 rounded-full bg-border" />
          </div>
          <div className="mb-2 h-2 w-full rounded bg-border/60" />
          <div className="mb-4 flex gap-2">
            <div className="h-12 flex-1 rounded bg-border/40" />
            <div className="h-12 flex-1 rounded bg-border/40" />
          </div>
          <div className="h-2 w-3/4 rounded bg-border/60" />
          <Link
            href={`/projects/${project.slug}`}
            className="absolute inset-0 z-10"
          >
            <ArrowUpRight
              size={28}
              className="absolute right-4 top-4 text-foreground-subtle/30"
            />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <article
      className={`group card flex flex-col overflow-hidden transition-all hover:border-border-hover md:flex-row ${
        isLarge ? "md:h-[500px]" : ""
      }`}
    >
      {/* Content */}
      <div
        className={`flex flex-1 flex-col ${
          isLarge ? "p-5 sm:p-6 md:p-10 lg:p-12" : "p-6 md:p-8 lg:p-10"
        }`}
      >
        {/* Meta */}
        <div
          className={`flex items-center gap-3 font-medium uppercase tracking-widest text-foreground-subtle ${
            isLarge ? "mb-3 md:mb-6 text-[10px] sm:text-xs" : "mb-4 text-xs"
          }`}
        >
          <span>{project.date}</span>
          <span className="h-1 w-1 rounded-full bg-foreground-subtle" />
          <span className={getStatusColor(project.status)}>
            {t(`projects.status.${project.status}`, project.status)}
          </span>
        </div>

        {/* Title */}
        <Link
          href={`/projects/${project.slug}`}
          className={`font-display font-bold tracking-tight text-foreground hover:text-primary transition-colors ${
            isLarge
              ? "mb-2 md:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              : "mb-3 text-2xl md:text-3xl"
          }`}
        >
          {project.title}
        </Link>

        {/* Description */}
        <p
          className={`leading-relaxed text-foreground-muted ${
            isLarge
              ? "mb-4 md:mb-8 text-sm sm:text-base md:text-lg line-clamp-3 md:line-clamp-none"
              : "mb-6 text-base"
          }`}
        >
          {getDescription()}
        </p>

        {/* Tags - hidden on mobile for large variant */}
        <div
          className={`flex-wrap gap-2 ${isLarge ? "hidden sm:flex mb-6 md:mb-10" : "flex mb-8"}`}
        >
          {project.tags?.slice(0, isLarge ? 4 : undefined).map((tag, tIdx) => (
            <span
              key={tIdx}
              className={`rounded-full border border-border bg-surface-elevated font-medium text-foreground-muted ${
                isLarge
                  ? "px-2 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs"
                  : "px-3 py-1 text-xs"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center gap-2 sm:gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className={`btn-primary group/btn flex items-center gap-2 ${isLarge ? "text-sm sm:text-base" : ""}`}
          >
            <span>{labels.details}</span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover/btn:rotate-45"
            />
          </Link>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-secondary flex items-center gap-2 ${isLarge ? "hidden sm:flex" : ""}`}
            >
              <span>{labels.demo}</span>
              <ArrowUpRight size={16} />
            </a>
          )}

          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-secondary flex items-center gap-2 ${isLarge ? "hidden sm:flex" : ""}`}
            >
              <Github size={16} />
              <span>{labels.code}</span>
            </a>
          )}
        </div>
      </div>

      {/* Preview area */}
      <div
        className={`relative overflow-hidden border-b border-border bg-background-alt md:border-b-0 md:border-r ${
          isLarge
            ? "aspect-video md:aspect-auto md:h-full md:w-1/2"
            : "h-48 md:h-auto md:w-2/5"
        }`}
      >
        {/* Gradient Background (only for large) */}
        {isLarge && (
          <>
            <div className="absolute inset-0 from-border/20 via-transparent to-border/10" />
            <div className="absolute inset-0 from-surface-elevated/30 via-transparent to-border/5" />
          </>
        )}
        {renderMedia()}
      </div>
    </article>
  );
}
