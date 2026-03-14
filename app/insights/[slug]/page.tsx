import type { Metadata }      from 'next';
import { notFound }           from 'next/navigation';
import Link                   from 'next/link';
import { PortableText }       from '@portabletext/react';
import { client }             from '@/sanity/client';
import {
  ARTICLE_BY_SLUG_QUERY,
  RECENT_ARTICLES_QUERY,
} from '@/sanity/queries';
import type { Article }       from '@/lib/types';
import { formatDateFull }     from '@/lib/utils';
import Nav                    from '@/components/Nav';
import Footer                 from '@/components/Footer';
import ScrollReveal           from '@/components/ScrollReveal';

export const revalidate = 60;

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article: Article | null = await client
    .fetch(ARTICLE_BY_SLUG_QUERY, { slug: params.slug })
    .catch(() => null);
  if (!article) return { title: 'Article Not Found' };

  const title       = article.seo?.metaTitle       || article.title;
  const description = article.seo?.metaDescription || article.excerpt;
  const imageUrl    = article.coverImageUrl;

  return {
    title,
    description,
    openGraph: {
      title, description,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

const ptComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.65rem', fontWeight: 400, color: 'var(--ink)', margin: '2.5rem 0 1rem', lineHeight: 1.25 }}>{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)', margin: '2rem 0 .75rem' }}>{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1.5rem', margin: '2rem 0', fontFamily: 'var(--serif)', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--ink-soft)', lineHeight: 1.7 }}>{children}</blockquote>
    ),
    normal: ({ children }: any) => (
      <p style={{ fontSize: '.95rem', lineHeight: 1.9, color: 'var(--muted-hi)', margin: '1.1rem 0' }}>{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong style={{ fontWeight: 600, color: 'var(--ink)' }}>{children}</strong>,
    em:     ({ children }: any) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
    code:   ({ children }: any) => (
      <code style={{ fontFamily: 'var(--mono)', fontSize: '.85rem', background: 'var(--surface)', padding: '.15rem .45rem', borderRadius: '3px', color: 'var(--ink-soft)' }}>{children}</code>
    ),
  },
};

export default async function ArticlePage({ params }: Props) {
  const [article, related] = await Promise.all([
    client.fetch(ARTICLE_BY_SLUG_QUERY, { slug: params.slug }).catch(() => null),
    client.fetch(RECENT_ARTICLES_QUERY).catch(() => []),
  ]);

  if (!article) notFound();

  const relatedArticles = (related as Article[])
    .filter((a) => a._id !== article._id && a.category === article.category)
    .slice(0, 3);

  return (
    <>
      <Nav settings={null} />
      <main style={{ paddingTop: '6rem', background: 'var(--paper)' }}>

        {/* Article Header */}
        <div style={{ background: 'var(--ink)', padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(184,148,63,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,148,63,.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '780px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.5rem' }}>
              <Link href="/insights" style={{ fontSize: '.68rem', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(184,148,63,.7)', textDecoration: 'none' }}>← Insights</Link>
              <span style={{ color: 'rgba(255,255,255,.15)' }}>·</span>
              <span style={{ fontSize: '.62rem', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)' }}>{article.category}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 400, lineHeight: 1.15, color: '#fff', marginBottom: '1.5rem' }}>
              {article.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.4)' }}>{formatDateFull(article.publishDate)}</span>
              <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(184,148,63,.1)', padding: '.2rem .7rem', borderRadius: '100px' }}>{article.readingTime} min read</span>
              {article.tags?.map((tag) => (
                <span key={tag} style={{ fontSize: '.62rem', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', border: '1px solid rgba(255,255,255,.1)', padding: '.2rem .65rem', borderRadius: '100px' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {article.coverImageUrl && (
          <div style={{ height: '380px', backgroundImage: `url(${article.coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        )}

        {/* Article Body */}
        <div className="container" style={{ maxWidth: '780px', padding: '4rem 3.5rem 6rem' }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', fontStyle: 'italic', lineHeight: 1.75, color: 'var(--ink-soft)', borderLeft: '2px solid var(--gold)', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
            {article.excerpt}
          </p>
          {article.body && <PortableText value={article.body} components={ptComponents} />}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div style={{ borderTop: '1px solid var(--rule)', background: 'var(--surface)', padding: '5rem 0' }}>
            <div className="container">
              <div style={{ fontSize: '.62rem', fontWeight: 600, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2rem' }}>Related Articles</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
                {relatedArticles.map((a) => (
                  <Link href={`/insights/${a.slug.current}`} key={a._id} className="art-card">
                    <div className="art-img art-img-sm">
                      <span style={{ fontSize: '1.5rem', position: 'relative', zIndex: 1 }}>📊</span>
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
            </div>
          </div>
        )}
      </main>
      <Footer settings={null} />
      <ScrollReveal />
    </>
  );
}

function formatDate(dateStr: string): string {
  try {
    const { format, parseISO } = require('date-fns');
    return format(parseISO(dateStr), 'MMM yyyy');
  } catch { return dateStr; }
}
