'use client';
import { useState }           from 'react';
import Link                   from 'next/link';
import type { RegulatoryInsight } from '@/lib/types';

const CATEGORIES = ['All Insights', 'SEBI Circulars', 'RBI Policy', 'Capital Markets Law', 'Compliance Frameworks'];

const AUTHORITY_MAP: Record<string, string> = {
  'SEBI Circulars':       'SEBI',
  'RBI Policy':           'RBI',
  'Capital Markets Law':  'MCA',
  'Compliance Frameworks':'',
};

const ICONS: Record<string, string> = {
  SEBI: '⚖️', RBI: '🏦', MCA: '📋', IRDAI: '🛡️',
  PFRDA: '📊', 'Finance Ministry': '🏛️',
};

interface Props { items: RegulatoryInsight[] }

export default function RegulatorySection({ items }: Props) {
  const [active, setActive] = useState('All Insights');

  const filtered = active === 'All Insights'
    ? items
    : items.filter((i) => {
        const mapped = AUTHORITY_MAP[active];
        return mapped ? i.authority === mapped : true;
      });

  return (
    <section id="regulatory">
      <div className="container">
        <div className="section-label r">
          <span className="sl-rule"></span>
          <span className="sl-text">Regulatory Insights Hub</span>
        </div>
        <h2 className="section-heading light r d1">
          SEBI · RBI · Capital Markets Law<br />
          <em>Decoded for Practitioners</em>
        </h2>

        <div className="reg-layout">
          <div className="reg-nav r left d1">
            <div className="reg-nav-label">Browse by area</div>
            <ul className="reg-nav-list">
              {CATEGORIES.map((cat) => (
                <li
                  key={cat}
                  className={`reg-nav-item${active === cat ? ' on' : ''}`}
                  onClick={() => setActive(cat)}
                >
                  {cat}
                </li>
              ))}
            </ul>

            {/* Free download CTA */}
            <div className="reg-dl r d3">
              <div className="reg-dl-label">Free Resource</div>
              <div className="reg-dl-title">SEBI Compliance Checklist 2025</div>
              <div className="reg-dl-desc">
                A structured framework for listed companies covering the year's most significant regulatory changes.
              </div>
              <a
                href="/#research"
                className="btn-sm-gold"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '.6rem 1.3rem', borderRadius: '2px', background: 'var(--gold)', color: 'var(--ink)', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none', cursor: 'pointer', border: 'none' }}
              >
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
                  <path d="M7 1v8M4 6l3 3 3-3M2 11h10" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>

          <div className="reg-cards r right d2">
            {filtered.length === 0 ? (
              <div style={{ gridColumn: '1/-1', padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,.3)', border: '1px dashed rgba(184,148,63,.15)', borderRadius: '2px' }}>
                Regulatory insights will appear here once published in the CMS.
              </div>
            ) : (
              filtered.slice(0, 4).map((item) => (
                <Link href={`/regulatory/${item.slug.current}`} key={item._id} className="reg-card" style={{ textDecoration: 'none' }}>
                  <div className="reg-icon">{ICONS[item.authority] || '📋'}</div>
                  <div className="reg-title">{item.circularTitle}</div>
                  <div className="reg-desc">{item.summary.length > 140 ? item.summary.slice(0, 140) + '…' : item.summary}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="reg-tag">{item.authority}</span>
                    {item.pdfUrl && <span className="reg-tag">PDF ↓</span>}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
