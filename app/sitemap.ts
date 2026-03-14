import type { MetadataRoute } from 'next';
import { client } from '@/sanity/client';
import { ARTICLES_QUERY, IPO_LIST_QUERY, REGULATORY_LIST_QUERY } from '@/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saipriyankacheerla.com';

  const [articles, ipos, regulatory] = await Promise.all([
    client.fetch(ARTICLES_QUERY).catch(() => []),
    client.fetch(IPO_LIST_QUERY).catch(() => []),
    client.fetch(REGULATORY_LIST_QUERY).catch(() => []),
  ]);

  const articleUrls = (articles as any[]).map((a) => ({
    url: `${baseUrl}/insights/${a.slug.current}`,
    lastModified: a.publishDate ? new Date(a.publishDate) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const ipoUrls = (ipos as any[]).map((i) => ({
    url: `${baseUrl}/ipo/${i.slug.current}`,
    lastModified: i.publishDate ? new Date(i.publishDate) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const regUrls = (regulatory as any[]).map((r) => ({
    url: `${baseUrl}/regulatory/${r.slug.current}`,
    lastModified: r.publishDate ? new Date(r.publishDate) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: baseUrl,            lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/ipo`,   lastModified: new Date(), priority: 0.8 },
    ...articleUrls,
    ...ipoUrls,
    ...regUrls,
  ];
}
