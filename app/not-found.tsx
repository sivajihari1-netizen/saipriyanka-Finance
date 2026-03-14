import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>404 · Not Found</div>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 400, color: '#fff', lineHeight: 1.1 }}>
        This page doesn't<br /><em style={{ fontStyle: 'italic', color: 'var(--gold-hi)' }}>exist.</em>
      </h1>
      <p style={{ fontSize: '.95rem', color: 'rgba(255,255,255,.4)', maxWidth: '360px', lineHeight: 1.75 }}>
        The content you're looking for may have moved or been removed.
      </p>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '.6rem', padding: '.75rem 1.75rem', background: 'var(--gold)', color: 'var(--ink)', borderRadius: '2px', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
        ← Back to Homepage
      </Link>
    </div>
  );
}
