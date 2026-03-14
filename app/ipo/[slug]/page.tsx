import type { Metadata }  from 'next';
import { notFound }       from 'next/navigation';
import Link               from 'next/link';
import { PortableText }   from '@portabletext/react';
import { client }         from '@/sanity/client';
import { IPO_BY_SLUG_QUERY } from '@/sanity/queries';
import type { IpoAnalysis }  from '@/lib/types';
import { formatDateFull, RECOMMENDATION_STYLE } from '@/lib/utils';
import Nav                from '@/components/Nav';
import Footer             from '@/components/Footer';
import ScrollReveal       from '@/components/ScrollReveal';

export const revalidate = 60;

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ipo: IpoAnalysis | null = await client
    .fetch(IPO_BY_SLUG_QUERY, { slug: params.slug })
    .catch(() => null);
  if (!ipo) return { title: 'IPO Not Found' };
  const title = ipo.seo?.metaTitle || `${ipo.companyName} IPO Analysis`;
  const description = ipo.seo?.metaDescription || ipo.analystSummary || '';
  return { title, description, openGraph: { title, description } };
}

export default async function IpoDetailPage({ params }: Props) {
  const ipo: IpoAnalysis | null = await client
    .fetch(IPO_BY_SLUG_QUERY, { slug: params.slug })
    .catch(() => null);

  if (!ipo) notFound();

  const recStyle = ipo.recommendation ? RECOMMENDATION_STYLE[ipo.recommendation] : null;

  return (
    <>
      <Nav settings={null} />
      <main style={{ paddingTop: '6rem', background: 'var(--paper)' }}>

        {/* Header */}
        <div style={{ background: 'var(--ink)', padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(184,148,63,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,148,63,.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
            <Link href="/ipo" style={{ fontSize: '.68rem', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(184,148,63,.7)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
              ← IPO Intelligence
            </Link>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '.62rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.75rem' }}>
                  {ipo.sector} · {ipo.listingExchange}
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, lineHeight: 1.1, color: '#fff', marginBottom: '.75rem' }}>
                  {ipo.companyName} IPO
                </h1>
                <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.4)' }}>Analysis dated {formatDateFull(ipo.publishDate)}</span>
              </div>
              {recStyle && ipo.recommendation && (
                <div style={{ background: recStyle.bg, padding: '1.25rem 1.75rem', borderRadius: '2px', textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: '.58rem', fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', color: recStyle.color, marginBottom: '.3rem' }}>Recommendation</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: recStyle.color }}>{ipo.recommendation}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container" style={{ maxWidth: '900px', padding: '3.5rem 3.5rem 6rem' }}>

          {/* IPO Summary Table */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: '2px', padding: '2rem', marginBottom: '3rem' }}>
            <div style={{ fontSize: '.62rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem' }}>IPO Summary</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
              {[
                { label: 'IPO Size',       value: ipo.ipoSize || '—' },
                { label: 'Price Band',     value: ipo.issuePriceBand || '—' },
                { label: 'Exchange',       value: ipo.listingExchange || '—' },
                { label: 'Sector',         value: ipo.sector || '—' },
                { label: 'Open Date',      value: ipo.openDate ? formatDateFull(ipo.openDate) : '—' },
                { label: 'Close Date',     value: ipo.closeDate ? formatDateFull(ipo.closeDate) : '—' },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: '1rem', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: '2px' }}>
                  <div style={{ fontSize: '.6rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.4rem' }}>{label}</div>
                  <div style={{ fontSize: '.95rem', fontWeight: 600, color: 'var(--ink)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Analyst Summary */}
          {ipo.analystSummary && (
            <blockquote style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '1.5rem', margin: '0 0 3rem', fontFamily: 'var(--serif)', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 1.75, color: 'var(--ink-soft)' }}>
              {ipo.analystSummary}
            </blockquote>
          )}

          {/* Valuation Discussion */}
          {ipo.valuationDiscussion && ipo.valuationDiscussion.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '1.25rem', paddingBottom: '.75rem', borderBottom: '1px solid var(--rule)' }}>
                Valuation Analysis
              </h2>
              <PortableText value={ipo.valuationDiscussion} />
            </div>
          )}

          {/* Risk Factors */}
          {ipo.riskFactors && ipo.riskFactors.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '1.25rem', paddingBottom: '.75rem', borderBottom: '1px solid var(--rule)' }}>
                Key Risk Factors
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                {ipo.riskFactors.map((risk, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.25rem', background: 'rgba(192,57,43,.04)', border: '1px solid rgba(192,57,43,.1)', borderRadius: '2px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C0392B', flexShrink: 0, marginTop: '.45rem' }}></span>
                    <span style={{ fontSize: '.88rem', lineHeight: 1.7, color: 'var(--muted-hi)' }}>{risk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendation */}
          {(ipo.recommendation || ipo.recommendationNotes) && (
            <div style={{ marginBottom: '3rem', background: recStyle?.bg || 'var(--surface)', border: `1px solid ${recStyle ? 'rgba(0,0,0,.08)' : 'var(--rule)'}`, borderRadius: '2px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', fontWeight: 400, color: recStyle ? recStyle.color : 'var(--ink)', marginBottom: '.75rem' }}>
                Analyst Recommendation: {ipo.recommendation}
              </h2>
              {ipo.recommendationNotes && (
                <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--muted-hi)' }}>{ipo.recommendationNotes}</p>
              )}
            </div>
          )}

          {/* PDF Download */}
          {ipo.pdfUrl && (
            <a
              href={ipo.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.75rem', padding: '1rem 1.75rem', background: 'var(--ink)', color: '#fff', borderRadius: '2px', textDecoration: 'none', fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', transition: 'background .2s' }}
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14"><path d="M7 1v8M4 6l3 3 3-3M2 11h10"/></svg>
              Download Full PDF Report
            </a>
          )}
        </div>
      </main>
      <Footer settings={null} />
      <ScrollReveal />
    </>
  );
}
