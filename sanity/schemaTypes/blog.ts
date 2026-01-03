import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Backend', value: 'Backend' },
          { title: 'Frontend', value: 'Frontend' },
          { title: 'TypeScript', value: 'TypeScript' },
          { title: 'Database', value: 'Database' },
          { title: 'API', value: 'API' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g., "8 min read"',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'views',
      title: 'Views',
      type: 'number',
      initialValue: 0,
      description: 'Number of views for this blog post',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'isLatest',
      title: 'Most Recent',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this blog post as the most recent one',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      views: 'views',
      isLatest: 'isLatest',
    },
    prepare({ title, subtitle, views, isLatest }) {
      return {
        title,
        subtitle: `${subtitle}${isLatest ? ' • Latest' : ''} • ${views || 0} views`,
      }
    },
  },
})

