import { defineField, defineType } from 'sanity';

export const researchItemSchema = defineType({
  name: 'researchItem',
  title: 'Research Library',
  type: 'document',
  icon: () => '📚',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (R) => R.required().max(400),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '📋 Framework',        value: 'framework' },
          { title: '🔬 Research Note',    value: 'research' },
          { title: '📖 Guide',            value: 'guide' },
          { title: '📊 Analysis Report',  value: 'analysis' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: { accept: '.pdf' },
      validation: (R) => R.required(),
      description: 'Upload the PDF — a download button is auto-generated on the site',
    }),
    defineField({
      name: 'pageCount',
      title: 'Number of Pages',
      type: 'number',
      description: 'Shown as metadata in the card (e.g. "18 pages")',
    }),
    defineField({
      name: 'publishDate',
      title: 'Published Date',
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
      title: 'Feature at Top',
      type: 'boolean',
      initialValue: false,
      description: 'Pin this item to the top of the research library',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
    prepare({ title, subtitle }) {
      const icons: Record<string, string> = {
        framework: '📋', research: '🔬', guide: '📖', analysis: '📊',
      };
      return { title, subtitle: icons[subtitle] + ' ' + subtitle };
    },
  },
  orderings: [
    { title: 'Featured First', name: 'featured', by: [{ field: 'featured', direction: 'desc' }, { field: 'publishDate', direction: 'desc' }] },
    { title: 'Newest First',   name: 'dateDesc',  by: [{ field: 'publishDate', direction: 'desc' }] },
  ],
});
