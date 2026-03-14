export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-noise"></div>
      <div className="hero-grid-lines"></div>
      <div className="hero-glow"></div>

      <div className="hero-text">
        <div className="hero-kicker r">
          <span className="kicker-rule"></span>
          <span className="kicker-text">Finance Intelligence · Hyderabad, India</span>
        </div>
        <h1 className="hero-headline r d1">
          Finance is a<br />
          <em>Language.</em><br />
          Learn to Speak it<br />Fluently.
        </h1>
        <p className="hero-sub r d2">
          Insights on capital markets, financial regulation, and analytical
          frameworks — for professionals, investors, and informed decision-makers.
        </p>
        <div className="hero-actions r d3">
          <a href="#insights" className="btn btn-gold">
            Read Insights
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a href="#newsletter" className="btn btn-ghost">
            Join The Finance Letter
          </a>
        </div>
        <div className="hero-chips r d4">
          <span className="chip">CA</span>
          <span className="chip">LLB</span>
          <span className="chip">CFA Aspirant</span>
          <span className="chip">NISM Certified</span>
          <span className="chip">PwC</span>
        </div>
      </div>

      <div className="hero-portrait">
        <div className="portrait-wrap">
          <div className="portrait-box r right d2">
            <span className="p-mono">Hyderabad · India</span>
            <div className="p-initials">SC</div>
            <p className="p-name">Saipriyanka Cheerla</p>
            <p className="p-title">Finance Intelligence</p>
            <div className="p-scan">
              <span className="scan-line"></span>
              CA · LLB · CFA Aspirant
              <span className="scan-line"></span>
            </div>
          </div>
          <div className="portrait-tick tl"></div>
          <div className="portrait-tick tr"></div>
          <div className="portrait-tick bl"></div>
          <div className="portrait-tick br"></div>
          <div className="stat-float left r d4">
            <div className="sf-label">Focus</div>
            <div className="sf-val">Capital Markets</div>
          </div>
          <div className="stat-float right r d5">
            <div className="sf-label">Domain</div>
            <div className="sf-val">Regulation</div>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <div className="scroll-stem"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
}
