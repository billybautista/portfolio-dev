import { groq } from "next-sanity";

// ============= PROJECT QUERIES =============

export const projectsQuery = groq`
  *[_type == "project" && !isHidden] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    status,
    date,
    description,
    tags,
    link,
    repo,
    media,
    isFeatured
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    status,
    date,
    description,
    tags,
    link,
    repo,
    media,
    isFeatured,
    content
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && !isHidden] {
    "slug": slug.current
  }
`;

// ============= BLOG QUERIES =============

export const blogsQuery = groq`
  *[_type == "blog"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    date,
    category,
    tags,
    link,
    readTime,
    views,
    isLatest
  }
`;

export const blogBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    date,
    category,
    tags,
    link,
    readTime,
    content,
    views,
    isLatest
  }
`;

export const blogSlugsQuery = groq`
  *[_type == "blog"] {
    "slug": slug.current
  }
`;

// ============= LIMITED QUERIES FOR HOME PAGE =============

export const featuredProjectsQuery = groq`
  *[_type == "project" && !isHidden && isFeatured == true] | order(date desc)[0...4] {
    _id,
    title,
    "slug": slug.current,
    status,
    date,
    description,
    tags,
    link,
    repo,
    media,
    isFeatured
  }
`;

export const featuredBlogsQuery = groq`
  *[_type == "blog"] | order(date desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    description,
    date,
    category,
    tags,
    link,
    readTime,
    views
  }
`;
