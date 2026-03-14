import { defineField, defineType } from 'sanity';

export const regulatoryInsightSchema = defineType({
  name: 'regulatoryInsight',
  title: 'Regulatory Insight',
  type: 'document',
  icon: () => '⚖️',
  fields: [
    defineField({
      name: 'circularTitle',
      title: 'Circular / Regulation Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'circularTitle', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'authority',
      title: 'Regulatory Authority',
      type: 'string',
      options: {
        list: [
          { title: 'SEBI',          value: 'SEBI' },
          { title: 'RBI',           value: 'RBI' },
          { title: 'MCA',           value: 'MCA' },
          { title: 'IRDAI',         value: 'IRDAI' },
          { title: 'PFRDA',         value: 'PFRDA' },
          { title: 'Finance Ministry', value: 'Finance Ministry' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'circularReference',
      title: 'Circular Reference Number',
      type: 'string',
      description: 'e.g. SEBI/HO/IMD/IMD-II/P/CIR/2024/123',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      description: 'Plain-language summary shown in the card preview',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'impactAnalysis',
      title: 'Impact Analysis',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'complianceNotes',
      title: 'Compliance Notes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'point',    type: 'string', title: 'Compliance Point' }),
            defineField({ name: 'deadline', type: 'date',   title: 'Deadline (if applicable)' }),
          ],
          preview: { select: { title: 'point' } },
        },
      ],
      description: 'Add individual compliance action items',
    }),
    defineField({
      name: 'affectedEntities',
      title: 'Who Is Affected',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. Listed Companies, Investment Advisers, NBFCs',
    }),
    defineField({
      name: 'pdfCircular',
      title: 'Downloadable PDF',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Upload the official circular or your analysis note as PDF',
    }),
    defineField({
      name: 'publishDate',
      title: 'Published Date',
      type: 'date',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle',       type: 'string', title: 'Meta Title' }),
        defineField({ name: 'metaDescription', type: 'text',   title: 'Meta Description', rows: 2 }),
      ],
    }),
  ],
  preview: {
    select: { title: 'circularTitle', subtitle: 'authority' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `[${subtitle}]` };
    },
  },
  orderings: [
    { title: 'Newest First', name: 'dateDesc', by: [{ field: 'publishDate', direction: 'desc' }] },
  ],
});
