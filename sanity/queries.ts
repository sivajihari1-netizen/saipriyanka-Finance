// ─── ARTICLES ────────────────────────────────────────────────────────────────

export const ARTICLES_QUERY = `
  *[_type == "article"] | order(publishDate desc) {
    _id, title, slug, category, excerpt,
    readingTime, publishDate, tags, featured,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt
  }
`;

export const FEATURED_ARTICLE_QUERY = `
  *[_type == "article" && featured == true] | order(publishDate desc)[0] {
    _id, title, slug, category, excerpt,
    readingTime, publishDate,
    "coverImageUrl": coverImage.asset->url
  }
`;

export const RECENT_ARTICLES_QUERY = `
  *[_type == "article"] | order(publishDate desc)[0..4] {
    _id, title, slug, category, excerpt,
    readingTime, publishDate,
    "coverImageUrl": coverImage.asset->url
  }
`;

export const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id, title, slug, category, body, excerpt,
    readingTime, publishDate, tags, featured,
    "coverImageUrl": coverImage.asset->url,
    "coverImageAlt": coverImage.alt,
    seo
  }
`;

export const ARTICLES_BY_CATEGORY_QUERY = `
  *[_type == "article" && category == $category] | order(publishDate desc) {
    _id, title, slug, category, excerpt,
    readingTime, publishDate,
    "coverImageUrl": coverImage.asset->url
  }
`;

// ─── IPO ANALYSIS ─────────────────────────────────────────────────────────────

export const IPO_LIST_QUERY = `
  *[_type == "ipoAnalysis"] | order(publishDate desc) {
    _id, companyName, slug, ipoSize, issuePriceBand,
    sector, listingExchange, recommendation,
    analystSummary, publishDate, openDate, closeDate
  }
`;

export const RECENT_IPO_QUERY = `
  *[_type == "ipoAnalysis"] | order(publishDate desc)[0..3] {
    _id, companyName, slug, ipoSize, issuePriceBand,
    sector, listingExchange, recommendation,
    analystSummary, publishDate
  }
`;

export const IPO_BY_SLUG_QUERY = `
  *[_type == "ipoAnalysis" && slug.current == $slug][0] {
    _id, companyName, slug, ipoSize, issuePriceBand,
    sector, listingExchange, recommendation, recommendationNotes,
    analystSummary, valuationDiscussion, riskFactors,
    publishDate, openDate, closeDate,
    "pdfUrl": pdfReport.asset->url,
    seo
  }
`;

// ─── REGULATORY INSIGHTS ──────────────────────────────────────────────────────

export const REGULATORY_LIST_QUERY = `
  *[_type == "regulatoryInsight"] | order(publishDate desc) {
    _id, circularTitle, slug, authority, circularReference,
    summary, affectedEntities, publishDate,
    "pdfUrl": pdfCircular.asset->url
  }
`;

export const REGULATORY_BY_SLUG_QUERY = `
  *[_type == "regulatoryInsight" && slug.current == $slug][0] {
    _id, circularTitle, slug, authority, circularReference,
    summary, impactAnalysis, complianceNotes, affectedEntities,
    publishDate,
    "pdfUrl": pdfCircular.asset->url,
    seo
  }
`;

// ─── RESEARCH LIBRARY ─────────────────────────────────────────────────────────

export const RESEARCH_QUERY = `
  *[_type == "researchItem"] | order(featured desc, publishDate desc) {
    _id, title, description, category, pageCount, publishDate, tags, featured,
    "pdfUrl": pdfFile.asset->url
  }
`;

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteTitle, siteDescription, linkedinUrl, twitterUrl,
    substackUrl, contactEmail, newsletterSubtext,
    "ogImageUrl": ogImage.asset->url
  }
`;
