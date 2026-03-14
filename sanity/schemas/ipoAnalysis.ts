import { defineField, defineType } from 'sanity';

export const ipoAnalysisSchema = defineType({
  name: 'ipoAnalysis',
  title: 'IPO Analysis',
  type: 'document',
  icon: () => '📈',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'companyName', maxLength: 96 },
      validation: (R) => R.required(),
      description: 'Auto-generates the URL: /ipo/company-name',
    }),
    defineField({
      name: 'ipoSize',
      title: 'IPO Size (₹ Crore)',
      type: 'string',
      description: 'e.g. ₹2,000 Cr',
    }),
    defineField({
      name: 'issuePriceBand',
      title: 'Issue Price Band',
      type: 'string',
      description: 'e.g. ₹400–₹425 per share',
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'string',
      options: {
        list: [
          'Banking & Finance', 'Technology', 'Healthcare', 'Consumer',
          'Infrastructure', 'Energy', 'Manufacturing', 'Real Estate',
          'Telecom', 'Media', 'Agriculture', 'Other',
        ],
      },
    }),
    defineField({
      name: 'listingExchange',
      title: 'Listing Exchange',
      type: 'string',
      options: {
        list: [
          { title: 'NSE + BSE', value: 'NSE + BSE' },
          { title: 'NSE Only',  value: 'NSE' },
          { title: 'BSE Only',  value: 'BSE' },
          { title: 'SME NSE',   value: 'SME NSE' },
          { title: 'SME BSE',   value: 'SME BSE' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'openDate',
      title: 'IPO Open Date',
      type: 'date',
    }),
    defineField({
      name: 'closeDate',
      title: 'IPO Close Date',
      type: 'date',
    }),
    defineField({
      name: 'analystSummary',
      title: 'Analyst Summary',
      type: 'text',
      rows: 4,
      description: 'Top-level analyst commentary shown in the card preview',
    }),
    defineField({
      name: 'valuationDiscussion',
      title: 'Valuation Discussion',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'riskFactors',
      title: 'Key Risk Factors',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add one risk factor per entry',
    }),
    defineField({
      name: 'recommendation',
      title: 'Recommendation',
      type: 'string',
      options: {
        list: [
          { title: '✅ Subscribe',         value: 'Subscribe' },
          { title: '⚠️ Subscribe (Long-term)', value: 'Subscribe — Long-term' },
          { title: '❌ Avoid',             value: 'Avoid' },
          { title: '🔍 Neutral',           value: 'Neutral' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'recommendationNotes',
      title: 'Recommendation Notes',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'pdfReport',
      title: 'Full PDF Report',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Upload the full IPO analysis PDF — auto-generates a download button',
    }),
    defineField({
      name: 'publishDate',
      title: 'Analysis Date',
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
        defineField({ name: 'ogImage',         type: 'image',  title: 'OG Image' }),
      ],
    }),
  ],
  preview: {
    select: {
      title:    'companyName',
      subtitle: 'recommendation',
      date:     'publishDate',
    },
    prepare({ title, subtitle, date }) {
      return { title, subtitle: `${subtitle || 'No recommendation'} · ${date || ''}` };
    },
  },
  orderings: [
    { title: 'Newest First', name: 'dateDesc', by: [{ field: 'publishDate', direction: 'desc' }] },
  ],
});
