import { PortableTextBlock } from "next-sanity";

// ============= PROJECT TYPES =============

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface ProjectMedia {
  type: "image" | "video";
  image?: SanityImage;
  video?: string;
  alt?: string;
}

export interface SanityProject {
  _id: string;
  title: string;
  slug: string;
  status: "Completed" | "In Progress" | "Coming Soon";
  date: string;
  description: {
    en: string;
    es: string;
  };
  tags: string[];
  link: string | null;
  repo: string | null;
  media?: ProjectMedia;
  content?: {
    en?: PortableTextBlock[];
    es?: PortableTextBlock[];
  };
}

// ============= BLOG TYPES =============

export interface SanityBlog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  category: "Backend" | "Frontend" | "TypeScript" | "Database" | "API";
  tags: string[];
  link: string | null;
  readTime: string | null;
  content?: PortableTextBlock[];
  views: number;
  isLatest: boolean;
}

// ============= SLUG TYPES =============

export interface SlugItem {
  slug: string;
}
