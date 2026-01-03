import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "Completed" },
          { title: "In Progress", value: "In Progress" },
          { title: "Coming Soon", value: "Coming Soon" },
        ],
        layout: "radio",
      },
      initialValue: "In Progress",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Year",
      type: "string",
      description: 'Year of the project (e.g., "2024")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "object",
      fields: [
        {
          name: "en",
          title: "English",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "es",
          title: "Español",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "link",
      title: "Live Link",
      type: "url",
      description: "Link to the live project",
    }),
    defineField({
      name: "repo",
      title: "Repository",
      type: "url",
      description: "Link to the source code repository",
    }),
    defineField({
      name: "media",
      title: "Project Media",
      type: "object",
      description: "Image or video showcasing the project",
      fields: [
        {
          name: "type",
          title: "Media Type",
          type: "string",
          options: {
            list: [
              { title: "Image", value: "image" },
              { title: "Video", value: "video" },
            ],
            layout: "radio",
          },
          initialValue: "image",
        },
        {
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          hidden: ({ parent }) => parent?.type !== "image",
        },
        {
          name: "video",
          title: "Video URL",
          type: "url",
          description: "YouTube, Vimeo, or direct video URL",
          hidden: ({ parent }) => parent?.type !== "video",
        },
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Description for accessibility",
        },
      ],
    }),
    defineField({
      name: "isHidden",
      title: "Hidden",
      type: "boolean",
      initialValue: false,
      description: "Hide this project from the public view",
    }),
    defineField({
      name: "content",
      title: "Project Content",
      type: "object",
      description:
        "Detailed content: what you did, challenges, features worked on",
      fields: [
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "es",
          title: "Español",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      date: "date",
      isHidden: "isHidden",
    },
    prepare({ title, status, date, isHidden }) {
      return {
        title: `${isHidden ? "🚫 " : ""}${title}`,
        subtitle: `${status} • ${date}${isHidden ? " • Hidden" : ""}`,
      };
    },
  },
});
