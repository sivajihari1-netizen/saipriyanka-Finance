import type { Metadata } from 'next';
import Link              from 'next/link';
import { client }        from '@/sanity/client';
import { IPO_LIST_QUERY } from '@/sanity/queries';
import type { IpoAnalysis } from '@/lib/types';
import { formatDate, RECOMMENDATION_STYLE } from '@/lib/utils';
import Nav               from '@/components/Nav';
import Footer            from '@/components/Footer';
import ScrollReveal      from '@/components/ScrollReveal';

export const revalidate = 60;
export const metadata: Metadata = { title: 'IPO Intelligence' };

export default async function IpoListPage() {
  const ipos: IpoAnalysis[] = await client.fetch(IPO_LIST_QUERY).catch(() => []);

  return (
    <>
      <Nav settings={null} />
      <main style={{ paddingTop: '6rem', background: 'var(--paper)', minHeight: '100vh' }}>
        <div className="container" style={{ padding: '4rem 3.5rem 6rem' }}>
          <div className="section-label r">
            <span className="sl-rule"></span>
            <span className="sl-text">IPO Intelligence</span>
          </div>
          <h1 className="section-heading r d1">IPO <em>Analysis Reports</em></h1>
          <p className="section-sub r d2" style={{ marginBottom: '3.5rem' }}>
            Independent analysis of upcoming and recent IPOs — covering valuation, risks, and investment perspective.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }}>
            {ipos.map((ipo, i) => {
              const style = ipo.recommendation ? RECOMMENDATION_STYLE[ipo.recommendation] : null;
              return (
                <Link
                  href={`/ipo/${ipo.slug.current}`}
                  key={ipo._id}
                  className={`r d${(i % 2) + 1}`}
                  style={{
                    display: 'block', textDecoration: 'none',
                    border: '1px solid var(--rule)', borderRadius: '2px',
                    background: 'var(--paper)', padding: '2rem',
                    transition: 'border-color .3s, box-shadow .3s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,148,63,.35)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(13,17,23,.07)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--rule)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '.6rem', fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '.4rem' }}>
                        {ipo.sector || 'IPO Analysis'}
                      </div>
                      <h2 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.25 }}>
                        {ipo.companyName}
                      </h2>
                    </div>
                    {style && ipo.recommendation && (
                      <span style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '.3rem .8rem', borderRadius: '100px', background: style.bg, color: style.color, whiteSpace: 'nowrap', marginLeft: '1rem', flexShrink: 0 }}>
                        {ipo.recommendation}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '.75rem', marginBottom: '1.25rem', background: 'var(--surface)', borderRadius: '2px', padding: '1rem' }}>
                    {[
                      { label: 'IPO Size',     value: ipo.ipoSize || '—' },
                      { label: 'Price Band',   value: ipo.issuePriceBand || '—' },
                      { label: 'Exchange',     value: ipo.listingExchange || '—' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div style={{ fontSize: '.58rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '.25rem' }}>{label}</div>
                        <div style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--ink)' }}>{value}</div>
                      </div>
                    ))}
                  </div>

                  {ipo.analystSummary && (
                    <p style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'var(--muted-hi)', marginBottom: '1rem' }}>
                      {ipo.analystSummary.length > 180 ? ipo.analystSummary.slice(0, 180) + '…' : ipo.analystSummary}
                    </p>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '.9rem', borderTop: '1px solid var(--rule)' }}>
                    <span style={{ fontSize: '.68rem', color: 'var(--muted)' }}>{formatDate(ipo.publishDate)}</span>
                    <span style={{ fontSize: '.68rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                      Read Analysis
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                    </span>
                  </div>
                </Link>
              );
            })}

            {ipos.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: 'var(--muted)' }}>
                IPO analyses will appear here once published in the CMS.
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
