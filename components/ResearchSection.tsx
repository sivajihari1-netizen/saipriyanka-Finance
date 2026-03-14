import type { ResearchItem } from '@/lib/types';
import { formatDate, RESEARCH_TYPE_LABEL, RESEARCH_TYPE_COLOR } from '@/lib/utils';

interface Props { items: ResearchItem[] }

export default function ResearchSection({ items }: Props) {
  return (
    <section id="research">
      <div className="container">
        <div className="section-label r">
          <span className="sl-rule"></span>
          <span className="sl-text">Research &amp; Downloads</span>
        </div>
        <h2 className="section-heading r d1">
          Analysis Notes,<br /><em>Frameworks &amp; Research</em>
        </h2>
        <p className="section-sub r d2">
          A working library of regulatory explainers, investment frameworks, and analytical notes — available for direct download.
        </p>

        <div className="research-grid">
          {items.length === 0 ? (
            <div style={{ gridColumn: '1/-1', padding: '4rem', textAlign: 'center', color: 'var(--muted)', border: '1px dashed var(--rule)', borderRadius: '2px' }}>
              Research papers and PDFs will appear here once uploaded in the CMS.
            </div>
          ) : (
            items.map((item, i) => (
              <div key={item._id} className={`res-card r d${(i % 3) + 1}`}>
                <div
                  className="res-type"
                  style={{ color: RESEARCH_TYPE_COLOR[item.category] || 'var(--muted)' }}
                >
                  <span className="type-dot"></span>
                  {RESEARCH_TYPE_LABEL[item.category] || item.category}
                </div>
                <div className="res-title">{item.title}</div>
                <div className="res-desc">{item.description}</div>
                <div className="res-meta">
                  {item.pageCount && <span>{item.pageCount} pages</span>}
                  <span>{formatDate(item.publishDate)}</span>
                </div>
                <div className="res-footer">
                  <span className="res-date">
                    {item.tags?.[0] || RESEARCH_TYPE_LABEL[item.category]}
                  </span>
                  {item.pdfUrl ? (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dl-btn"
                    >
                      <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11">
                        <path d="M7 1v8M4 6l3 3 3-3M2 11h10" />
                      </svg>
                      Download
                    </a>
                  ) : (
                    <span className="dl-btn" style={{ opacity: .4, cursor: 'default' }}>Coming Soon</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
