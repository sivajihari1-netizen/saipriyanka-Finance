import type { Metadata }    from 'next';
import { notFound }         from 'next/navigation';
import Link                 from 'next/link';
import { PortableText }     from '@portabletext/react';
import { client }           from '@/sanity/client';
import { REGULATORY_BY_SLUG_QUERY, REGULATORY_LIST_QUERY } from '@/sanity/queries';
import type { RegulatoryInsight } from '@/lib/types';
import { formatDateFull }   from '@/lib/utils';
import Nav                  from '@/components/Nav';
import Footer               from '@/components/Footer';
import ScrollReveal         from '@/components/ScrollReveal';

export const revalidate = 60;

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item: RegulatoryInsight | null = await client
    .fetch(REGULATORY_BY_SLUG_QUERY, { slug: params.slug })
    .catch(() => null);
  if (!item) return { title: 'Regulatory Insight Not Found' };
  const title       = item.seo?.metaTitle       || item.circularTitle;
  const description = item.seo?.metaDescription || item.summary;
  return { title, description, openGraph: { title, description } };
}

const AUTHORITY_COLOR: Record<string, { bg: string; color: string }> = {
  SEBI:              { bg: '#E3F2FD', color: '#0D47A1' },
  RBI:               { bg: '#E8F5E9', color: '#1B5E20' },
  MCA:               { bg: '#FFF8E1', color: '#E65100' },
  IRDAI:             { bg: '#F3E5F5', color: '#4A148C' },
  PFRDA:             { bg: '#FCE4EC', color: '#880E4F' },
  'Finance Ministry':{ bg: '#FBE9E7', color: '#BF360C' },
};

export default async function RegulatoryDetailPage({ params }: Props) {
  const item: RegulatoryInsight | null = await client
    .fetch(REGULATORY_BY_SLUG_QUERY, { slug: params.slug })
    .catch(() => null);

  if (!item) notFound();

  const authStyle = AUTHORITY_COLOR[item.authority] || { bg: 'var(--surface)', color: 'var(--ink)' };

  return (
    <>
      <Nav settings={null} />
      <main style={{ paddingTop: '6rem', background: 'var(--paper)' }}>

        {/* Header */}
        <div style={{ background: 'var(--ink)', padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(184,148,63,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,148,63,.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '860px' }}>
            <Link href="/#regulatory" style={{ fontSize: '.68rem', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(184,148,63,.7)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
              ← Regulatory Insights
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', padding: '.3rem .85rem', borderRadius: '100px', background: authStyle.bg, color: authStyle.color }}>
                {item.authority}
              </span>
              {item.circularReference && (
                <span style={{ fontFamily: 'var(--mono)', fontSize: '.62rem', color: 'rgba(255,255,255,.3)' }}>
                  {item.circularReference}
                </span>
              )}
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', fontWeight: 400, lineHeight: 1.15, color: '#fff', marginBottom: '1rem' }}>
              {item.circularTitle}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.4)' }}>{formatDateFull(item.publishDate)}</span>
              {item.affectedEntities?.map((e) => (
                <span key={e} style={{ fontSize: '.62rem', fontWeight: 500, color: 'rgba(255,255,255,.3)', border: '1px solid rgba(255,255,255,.1)', padding: '.2rem .65rem', borderRadius: '100px', letterSpacing: '.06em' }}>{e}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="container" style={{ maxWidth: '860px', padding: '3.5rem 3.5rem 6rem' }}>

          {/* Summary */}
          <blockquote style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1.5rem', marginBottom: '3rem', fontFamily: 'var(--serif)', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.75, color: 'var(--ink-soft)' }}>
            {item.summary}
          </blockquote>

          {/* Impact Analysis */}
          {item.impactAnalysis && item.impactAnalysis.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '1.25rem', paddingBottom: '.75rem', borderBottom: '1px solid var(--rule)' }}>
                Impact Analysis
              </h2>
              <PortableText value={item.impactAnalysis} />
            </div>
          )}

          {/* Compliance Notes */}
          {item.complianceNotes && item.complianceNotes.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '1.25rem', paddingBottom: '.75rem', borderBottom: '1px solid var(--rule)' }}>
                Compliance Action Points
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                {item.complianceNotes.map((note, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', padding: '1rem 1.25rem', background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: '2px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, marginTop: '.5rem' }}></span>
                      <span style={{ fontSize: '.88rem', lineHeight: 1.7, color: 'var(--muted-hi)' }}>{note.point}</span>
                    </div>
                    {note.deadline && (
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', color: 'var(--gold)', background: 'var(--gold-pale)', padding: '.2rem .65rem', borderRadius: '100px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {formatDateFull(note.deadline)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PDF Download */}
          {item.pdfUrl && (
            <a
              href={item.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.75rem', padding: '1rem 1.75rem', background: 'var(--ink)', color: '#fff', borderRadius: '2px', textDecoration: 'none', fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14"><path d="M7 1v8M4 6l3 3 3-3M2 11h10"/></svg>
              Download Circular / Analysis PDF
            </a>
          )}
        </div>
      </main>
      <Footer settings={null} />
      <ScrollReveal />
    </>
  );
}
