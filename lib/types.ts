// ─── ARTICLE ──────────────────────────────────────────────────────────────────
export interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  excerpt: string;
  body?: any[];
  readingTime: number;
  publishDate: string;
  tags?: string[];
  featured?: boolean;
  seo?: SEO;
}

// ─── IPO ANALYSIS ─────────────────────────────────────────────────────────────
export interface IpoAnalysis {
  _id: string;
  companyName: string;
  slug: { current: string };
  ipoSize?: string;
  issuePriceBand?: string;
  sector?: string;
  listingExchange?: string;
  openDate?: string;
  closeDate?: string;
  analystSummary?: string;
  valuationDiscussion?: any[];
  riskFactors?: string[];
  recommendation?: string;
  recommendationNotes?: string;
  publishDate: string;
  pdfUrl?: string;
  seo?: SEO;
}

// ─── REGULATORY INSIGHT ───────────────────────────────────────────────────────
export interface RegulatoryInsight {
  _id: string;
  circularTitle: string;
  slug: { current: string };
  authority: string;
  circularReference?: string;
  summary: string;
  impactAnalysis?: any[];
  complianceNotes?: { point: string; deadline?: string }[];
  affectedEntities?: string[];
  publishDate: string;
  pdfUrl?: string;
  seo?: SEO;
}

// ─── RESEARCH ITEM ────────────────────────────────────────────────────────────
export interface ResearchItem {
  _id: string;
  title: string;
  description: string;
  category: 'framework' | 'research' | 'guide' | 'analysis';
  pdfUrl?: string;
  pageCount?: number;
  publishDate: string;
  tags?: string[];
  featured?: boolean;
}

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────
export interface SiteSettings {
  siteTitle?: string;
  siteDescription?: string;
  ogImageUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  substackUrl?: string;
  contactEmail?: string;
  newsletterSubtext?: string;
}

// ─── SEO ──────────────────────────────────────────────────────────────────────
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: { asset: { url: string } };
}
