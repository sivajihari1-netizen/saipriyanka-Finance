'use client';
import { useState } from 'react';
import Link          from 'next/link';
import type { SiteSettings } from '@/lib/types';

// ─── ABOUT ─────────────────────────────────────────────────────────────────────
export function AboutSection() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="r left">
            <div className="section-label">
              <span className="sl-rule"></span>
              <span className="sl-text">Philosophy &amp; Focus</span>
            </div>
            <h2 className="section-heading" style={{ marginBottom: '.25rem' }}>
              Where Finance,<br /><em>Law &amp; Markets</em> Converge
            </h2>
            <blockquote className="about-quote">
              "Finance is a language. Most people were never taught to speak it.
              I believe that changes when the right person explains it in the right way."
            </blockquote>
            <p className="about-body">
              I work at the intersection of financial markets, legal regulation, and analytical
              thinking. My professional formation spans chartered accountancy, law, capital
              markets, and institutional audit — giving me a vantage point that is simultaneously
              technical, legal, and communicative.
            </p>
            <p className="about-body">
              What I find most valuable — and most underserved — is the translation layer: the
              work of taking complex regulatory and financial intelligence and making it genuinely
              useful to the professionals, investors, and organisations who need to act on it.
            </p>
            <div className="expertise-grid">
              {['Capital Markets', 'Financial Regulation', 'SEBI & RBI Frameworks', 'Equity Research', 'Audit & Assurance', 'Financial Literacy'].map((e) => (
                <div className="exp-item" key={e}>
                  <span className="exp-dot"></span>{e}
                </div>
              ))}
            </div>
          </div>

          <div className="r right d2">
            <div className="domains-panel">
              <div className="dp-heading">Professional Domains</div>
              {[
                {
                  num: '01',
                  name: 'Capital Markets & Equity Research',
                  desc: 'Analysis of listed companies, market structures, IPO frameworks, and investment evaluation methodologies grounded in CFA curriculum and Indian market practice.',
                },
                {
                  num: '02',
                  name: 'Financial Regulation & Compliance',
                  desc: 'SEBI and RBI regulatory intelligence — interpreting circulars, designing compliance frameworks, and advising on the intersection of financial and legal obligations.',
                },
                {
                  num: '03',
                  name: 'Audit & Financial Analysis',
                  desc: 'Institutional-grade financial statement analysis, risk-based audit methodology, and governance assessment — applied at PwC across multiple sectors.',
                },
                {
                  num: '04',
                  name: 'Finance Education & Intelligence',
                  desc: 'Translating financial and regulatory complexity into accessible intelligence for professionals, investors, and organisations who need to understand the systems governing their decisions.',
                },
              ].map(({ num, name, desc }) => (
                <div className="domain-item" key={num}>
                  <span className="domain-num">{num}</span>
                  <div className="domain-info">
                    <div className="domain-name">{name}</div>
                    <div className="domain-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER ────────────────────────────────────────────────────────────────
export function NewsletterSection({ settings }: { settings: SiteSettings | null }) {
  const [email, setEmail]     = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!email.includes('@')) return;
    setSuccess(true);
    setEmail('');
    setTimeout(() => setSuccess(false), 4000);
  };

  const subtext = settings?.newsletterSubtext ||
    'Every week: one regulatory update, one analytical framework, one financial concept made unmistakably clear. Written for professionals who want to understand markets and regulation — not just follow them.';

  return (
    <section id="newsletter">
      <div className="nl-bg-pattern"></div>
      <div className="nl-wrap">
        <div className="nl-badge r">Weekly · Finance Intelligence</div>
        <h2 className="nl-heading r d1">The Finance Letter</h2>
        <p className="nl-sub r d2">{subtext}</p>
        <div className="nl-form r d3">
          <input
            className="nl-input"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button
            className="nl-btn"
            onClick={handleSubmit}
            style={success ? { background: '#1A7A4A' } : {}}
          >
            {success ? 'Subscribed ✓' : 'Subscribe'}
          </button>
        </div>
        <p className="nl-trust r d3">No promotional content. One email per week. Unsubscribe anytime.</p>
        <div className="nl-pillars r d4">
          {['SEBI & RBI updates', 'Investment frameworks', 'Regulatory analysis', 'Free PDF resources'].map((p) => (
            <div className="nl-pillar" key={p}>
              <span className="np-dot"></span> {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────
export function ContactSection({ settings }: { settings: SiteSettings | null }) {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [msg, setMsg]         = useState('');
  const [sent, setSent]       = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !msg) return;
    setSent(true);
    setName(''); setEmail(''); setMsg('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="section-label r">
          <span className="sl-rule"></span>
          <span className="sl-text">Get in Touch</span>
        </div>
        <h2 className="section-heading r d1">
          Start a<br /><em>Conversation</em>
        </h2>

        <div className="contact-grid">
          <div className="contact-side r left d2">
            <p className="contact-note">
              Whether you have a question about a regulatory development, want to discuss a piece
              of analysis, or are interested in working together — I respond to every serious message.
            </p>
            <div className="contact-meta">
              {[
                'Based in Hyderabad, India',
                settings?.linkedinUrl ? 'Active on LinkedIn' : 'Active on LinkedIn',
                'Responds within 48 hours',
                'Open to speaking invitations',
              ].map((item) => (
                <div className="cm-item" key={item}>
                  <span className="cm-dot"></span>{item}
                </div>
              ))}
            </div>
          </div>

          <div className="r right d2">
            <div className="contact-form">
              <div className="fg">
                <label className="fl">Name</label>
                <input className="fi" type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="fg">
                <label className="fl">Email</label>
                <input className="fi" type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="fg">
                <label className="fl">Message</label>
                <textarea className="ft" placeholder="What would you like to discuss?" value={msg} onChange={(e) => setMsg(e.target.value)} />
              </div>
              <button
                className="submit-btn"
                onClick={handleSubmit}
                style={sent ? { background: '#1A7A4A' } : {}}
              >
                {sent ? 'Message Sent ✓' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
export function FooterComponent({ settings }: { settings: SiteSettings | null }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="foot-brand">Saipriyanka <em>Cheerla</em></div>
            <p className="foot-tagline">
              "Finance is a language. I teach you to speak it fluently."<br />
              CA · LLB · CFA Aspirant · NISM Certified
            </p>
            <div className="foot-links-socials">
              {settings?.linkedinUrl && (
                <a className="foot-soc" href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer" title="LinkedIn">in</a>
              )}
              {settings?.twitterUrl && (
                <a className="foot-soc" href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" title="X / Twitter">𝕏</a>
              )}
              {settings?.substackUrl && (
                <a className="foot-soc" href={settings.substackUrl} target="_blank" rel="noopener noreferrer" title="Newsletter">✉</a>
              )}
              {!settings?.linkedinUrl && <a className="foot-soc" href="#" title="LinkedIn">in</a>}
              {!settings?.twitterUrl  && <a className="foot-soc" href="#" title="X / Twitter">𝕏</a>}
              {!settings?.substackUrl && <a className="foot-soc" href="#" title="Newsletter">✉</a>}
            </div>
          </div>
          <div>
            <div className="foot-col-label">Read</div>
            <ul className="foot-col-links">
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/#regulatory">Regulatory Hub</Link></li>
              <li><Link href="/#research">Research Library</Link></li>
              <li><Link href="/#newsletter">The Finance Letter</Link></li>
            </ul>
          </div>
          <div>
            <div className="foot-col-label">Navigate</div>
            <ul className="foot-col-links">
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/ipo">IPO Intelligence</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="foot-col-label">Focus Areas</div>
            <ul className="foot-col-links">
              <li><Link href="#">Capital Markets</Link></li>
              <li><Link href="#">SEBI Regulation</Link></li>
              <li><Link href="#">Financial Analysis</Link></li>
              <li><Link href="#">Finance Education</Link></li>
            </ul>
          </div>
        </div>
        <div className="foot-bar">
          <span className="foot-copy">© {new Date().getFullYear()} Saipriyanka Cheerla. All rights reserved.</span>
          <span className="foot-loc">
            <svg viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.5" width="10" height="11">
              <path d="M6 1C3.79 1 2 2.79 2 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z"/>
              <circle cx="6" cy="5" r="1.5"/>
            </svg>
            Hyderabad, India
          </span>
        </div>
      </div>
    </footer>
  );
}
