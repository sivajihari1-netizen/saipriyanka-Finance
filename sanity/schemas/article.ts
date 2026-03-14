import { defineField, defineType } from 'sanity';

export const articleSchema = defineType({
  name: 'article',
  title: 'Blog Article',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (R) => R.required().min(10).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Market Analysis',    value: 'Market Analysis' },
          { title: 'Finance Simplified', value: 'Finance Simplified' },
          { title: 'Capital Markets',    value: 'Capital Markets' },
          { title: 'Regulatory Analysis',value: 'Regulatory Analysis' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt Text' }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (R) => R.required().max(300),
      description: 'Short description shown in article cards (max 300 chars)',
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal',    value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote',     value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold',   value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code',   value: 'code' },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text' })],
        },
      ],
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      validation: (R) => R.required().min(1).max(60),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage',
      type: 'boolean',
      description: 'Toggle to show this article as the hero feature on the homepage',
      initialValue: false,
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle',       type: 'string', title: 'Meta Title (max 60 chars)' }),
        defineField({ name: 'metaDescription', type: 'text',   title: 'Meta Description (max 160 chars)', rows: 2 }),
        defineField({ name: 'ogImage',         type: 'image',  title: 'Open Graph Image (1200×630)' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
  orderings: [
    { title: 'Newest First', name: 'dateDesc', by: [{ field: 'publishDate', direction: 'desc' }] },
  ],
});
