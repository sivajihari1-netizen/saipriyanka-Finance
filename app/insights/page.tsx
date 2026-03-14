import type { Metadata } from 'next';
import Link              from 'next/link';
import { client }        from '@/sanity/client';
import { ARTICLES_QUERY } from '@/sanity/queries';
import type { Article }  from '@/lib/types';
import { formatDate }    from '@/lib/utils';
import Nav               from '@/components/Nav';
import Footer            from '@/components/Footer';
import ScrollReveal      from '@/components/ScrollReveal';

export const revalidate = 60;
export const metadata: Metadata = { title: 'Insights' };

const CATEGORIES = ['All', 'Market Analysis', 'Finance Simplified', 'Capital Markets', 'Regulatory Analysis'];

export default async function InsightsPage() {
  const articles: Article[] = await client.fetch(ARTICLES_QUERY).catch(() => []);

  return (
    <>
      <Nav settings={null} />
      <main style={{ paddingTop: '6rem' }}>
        <div className="container">
          <div style={{ padding: '4rem 0 1.5rem' }}>
            <div className="section-label r">
              <span className="sl-rule"></span>
              <span className="sl-text">Finance Intelligence Blog</span>
            </div>
            <h1 className="section-heading r d1">
              All <em>Insights</em>
            </h1>
          </div>

          {/* Category Filter (client-side via JS class toggle) */}
          <div className="tabs r" id="insights-tabs">
            {CATEGORIES.map((cat) => (
              <button key={cat} className={`tab${cat === 'All' ? ' on' : ''}`} data-category={cat}>
                {cat}
              </button>
            ))}
          </div>

          <div
            className="articles-grid-full"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.75rem',
              paddingBottom: '6rem',
            }}
          >
            {articles.map((a, i) => (
              <Link
                href={`/insights/${a.slug.current}`}
                key={a._id}
                className={`art-card r d${(i % 3) + 1}`}
                data-category={a.category}
              >
                <div
                  className="art-img art-img-sm"
                  style={a.coverImageUrl ? { backgroundImage: `url(${a.coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                  {!a.coverImageUrl && <span style={{ fontSize: '1.5rem', position: 'relative', zIndex: 1 }}>📊</span>}
                </div>
                <div className="art-body">
                  <div className="art-cat">{a.category}</div>
                  <div className="art-title">{a.title}</div>
                  <div className="art-excerpt">{a.excerpt}</div>
                  <div className="art-footer">
                    <span className="art-date">{formatDate(a.publishDate)}</span>
                    <span className="art-read">{a.readingTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}

            {articles.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
                Articles will appear here once published in the CMS.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer settings={null} />
      <ScrollReveal />
    </>
  );
}
