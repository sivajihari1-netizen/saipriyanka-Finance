'use client';
import { useState } from 'react';
import Link          from 'next/link';
import type { Article } from '@/lib/types';
import { formatDate }   from '@/lib/utils';

const CATEGORIES = ['All', 'Market Analysis', 'Finance Simplified', 'Capital Markets', 'Regulatory Analysis'];

interface Props {
  featured: Article | null;
  articles: Article[];
}

export default function InsightsSection({ featured, articles }: Props) {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? articles
    : articles.filter((a) => a.category === active);

  const hero  = featured || filtered[0] || null;
  const rest  = hero ? filtered.filter((a) => a._id !== hero._id).slice(0, 4) : filtered.slice(0, 4);
  const row2  = rest.slice(1, 4);

  return (
    <section id="insights">
      <div className="container">
        <div className="insights-top">
          <div>
            <div className="section-label r">
              <span className="sl-rule"></span>
              <span className="sl-text">Finance Intelligence Blog</span>
            </div>
            <h2 className="section-heading r d1">
              Insights That<br /><em>Cut Through the Noise</em>
            </h2>
          </div>
          <Link href="/insights" className="all-link r d2">
            All Articles
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <div className="tabs r">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`tab${active === cat ? ' on' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {articles.length === 0 ? (
          <EmptyState message="Articles will appear here once published in the CMS." />
        ) : (
          <div className="articles">
            {/* Hero / featured article */}
            {hero && (
              <Link href={`/insights/${hero.slug.current}`} className="article-hero r d1">
                <div
                  className="art-img"
                  style={
                    hero.coverImageUrl
                      ? { backgroundImage: `url(${hero.coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '220px' }
                      : { height: '220px' }
                  }
                >
                  {!hero.coverImageUrl && <span style={{ fontSize: '2.5rem', position: 'relative', zIndex: 1 }}>📊</span>}
                </div>
                <div className="art-body">
                  <div className="art-cat">{hero.category}</div>
                  <div className="art-title">{hero.title}</div>
                  <div className="art-excerpt">{hero.excerpt}</div>
                  <div className="art-footer">
                    <span className="art-date">{formatDate(hero.publishDate)}</span>
                    <span className="art-read">{hero.readingTime} min read</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Side card */}
            {rest[0] && (
              <Link href={`/insights/${rest[0].slug.current}`} className="article-small r d2">
                <div
                  className="art-img art-img-sm"
                  style={
                    rest[0].coverImageUrl
                      ? { backgroundImage: `url(${rest[0].coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                      : {}
                  }
                >
                  {!rest[0].coverImageUrl && <span style={{ fontSize: '1.6rem', position: 'relative', zIndex: 1 }}>⚖️</span>}
                </div>
                <div className="art-body">
                  <div className="art-cat">{rest[0].category}</div>
                  <div className="art-title">{rest[0].title}</div>
                  <div className="art-excerpt">{rest[0].excerpt}</div>
                  <div className="art-footer">
                    <span className="art-date">{formatDate(rest[0].publishDate)}</span>
                    <span className="art-read">{rest[0].readingTime} min read</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Row 2 — three cards */}
            {row2.length > 0 && (
              <div className="articles-row2">
                {row2.map((a, i) => (
                  <Link
                    key={a._id}
                    href={`/insights/${a.slug.current}`}
                    className={`art-card r d${i + 1}`}
                  >
                    <div
                      className="art-img art-img-sm"
                      style={
                        a.coverImageUrl
                          ? { backgroundImage: `url(${a.coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                          : {}
                      }
                    >
                      {!a.coverImageUrl && <span style={{ fontSize: '1.5rem', position: 'relative', zIndex: 1 }}>📊</span>}
                    </div>
                    <div className="art-body">
                      <div className="art-cat">{a.category}</div>
                      <div className="art-title">{a.title}</div>
                      <div className="art-footer">
                        <span className="art-date">{formatDate(a.publishDate)}</span>
                        <span className="art-read">{a.readingTime} min read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--muted)', border: '1px dashed var(--rule)', borderRadius: '2px' }}>
      {message}
    </div>
  );
}
