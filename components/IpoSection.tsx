import Link from 'next/link';
import type { IpoAnalysis } from '@/lib/types';
import { formatDate, RECOMMENDATION_STYLE } from '@/lib/utils';

interface Props { ipos: IpoAnalysis[] }

export default function IpoSection({ ipos }: Props) {
  if (!ipos || ipos.length === 0) return null;

  return (
    <section id="ipo" style={{ padding: '7rem 0', background: 'var(--paper)' }}>
      <div className="container">
        <div className="insights-top">
          <div>
            <div className="section-label r">
              <span className="sl-rule"></span>
              <span className="sl-text">IPO Intelligence</span>
            </div>
            <h2 className="section-heading r d1">
              Latest <em>IPO Analysis</em>
            </h2>
          </div>
          <Link href="/ipo" className="all-link r d2">
            All IPO Reports
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }}>
          {ipos.map((ipo, i) => {
            const style = ipo.recommendation ? RECOMMENDATION_STYLE[ipo.recommendation] : null;
            return (
              <Link
                key={ipo._id}
                href={`/ipo/${ipo.slug.current}`}
                className={`r d${(i % 2) + 1}`}
                style={{
                  display: 'block', textDecoration: 'none',
                  border: '1px solid var(--rule)', borderRadius: '2px',
                  background: 'var(--paper)', padding: '2rem',
                  transition: 'border-color .3s, box-shadow .3s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '.6rem', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.35rem' }}>
                      {ipo.sector || 'IPO Analysis'} · {ipo.listingExchange}
                    </div>
                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.25 }}>
                      {ipo.companyName}
                    </h3>
                  </div>
                  {style && ipo.recommendation && (
                    <span style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '.28rem .75rem', borderRadius: '100px', background: style.bg, color: style.color, flexShrink: 0, marginLeft: '1rem' }}>
                      {ipo.recommendation}
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '.6rem', marginBottom: '1rem', background: 'var(--surface)', borderRadius: '2px', padding: '.9rem' }}>
                  {[
                    ['IPO Size',   ipo.ipoSize || '—'],
                    ['Price Band', ipo.issuePriceBand || '—'],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <div style={{ fontSize: '.56rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.2rem' }}>{l}</div>
                      <div style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--ink)' }}>{v}</div>
                    </div>
                  ))}
                </div>

                {ipo.analystSummary && (
                  <p style={{ fontSize: '.8rem', lineHeight: 1.7, color: 'var(--muted-hi)', marginBottom: '.9rem' }}>
                    {ipo.analystSummary.length > 140 ? ipo.analystSummary.slice(0, 140) + '…' : ipo.analystSummary}
                  </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '.9rem', borderTop: '1px solid var(--rule)' }}>
                  <span style={{ fontSize: '.68rem', color: 'var(--muted)' }}>{formatDate(ipo.publishDate)}</span>
                  <span style={{ fontSize: '.65rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '.35rem' }}>
                    Full Analysis →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
