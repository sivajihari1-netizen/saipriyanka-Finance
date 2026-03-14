import { defineField, defineType } from 'sanity';

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Saipriyanka Cheerla — Finance Intelligence',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Meta Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      description: 'Used when no page-specific OG image is set (1200×630 recommended)',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter / X URL',
      type: 'url',
    }),
    defineField({
      name: 'substackUrl',
      title: 'Substack / Newsletter URL',
      type: 'url',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'newsletterSubtext',
      title: 'Newsletter Section Subtext',
      type: 'text',
      rows: 2,
      description: 'Appears below "The Finance Letter" heading on the homepage',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
