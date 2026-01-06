import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Messages",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "read",
      title: "Read",
      type: "boolean",
      initialValue: false,
      description: "Mark as read when you have reviewed this message",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      read: "read",
    },
    prepare({ title, subtitle, read }) {
      return {
        title: `${read ? "✓" : "●"} ${title}`,
        subtitle,
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
  ],
});




