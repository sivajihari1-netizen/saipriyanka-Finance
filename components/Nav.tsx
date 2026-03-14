'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { SiteSettings } from '@/lib/types';

export default function Nav({ settings }: { settings: SiteSettings | null }) {
  const [stuck, setStuck]   = useState(false);
  const [open,  setOpen]    = useState(false);

  useEffect(() => {
    const handler = () => setStuck(window.scrollY > 70);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav id="nav" className={stuck ? 'stuck' : ''}>
        <Link href="/" className="nav-wordmark">
          Saipriyanka <em>Cheerla</em>
        </Link>

        <ul className="nav-links">
          <li><Link href="/insights">Insights</Link></li>
          <li><Link href="/#regulatory">Regulatory</Link></li>
          <li><Link href="/#research">Research</Link></li>
          <li><Link href="/ipo">IPO Intelligence</Link></li>
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
          <li><Link href="/#newsletter" className="nav-pill">The Finance Letter</Link></li>
        </ul>

        <button
          className="nav-hamburger"
          aria-label="Open menu"
          onClick={() => setOpen(!open)}
        >
          <span style={{ transform: open ? 'rotate(45deg) translate(5px,5px)' : '' }}></span>
          <span style={{ opacity: open ? 0 : 1 }}></span>
          <span style={{ transform: open ? 'rotate(-45deg) translate(5px,-5px)' : '' }}></span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" className={open ? 'open' : ''}>
        <Link href="/insights"    className="mm-link" onClick={close}>Insights</Link>
        <Link href="/#regulatory" className="mm-link" onClick={close}>Regulatory</Link>
        <Link href="/#research"   className="mm-link" onClick={close}>Research</Link>
        <Link href="/ipo"         className="mm-link" onClick={close}>IPO Intelligence</Link>
        <Link href="/#about"      className="mm-link" onClick={close}>About</Link>
        <Link href="/#newsletter" className="mm-link" onClick={close}>The Finance Letter</Link>
        <Link href="/#contact"    className="mm-link" onClick={close}>Contact</Link>
      </div>
    </>
  );
}
