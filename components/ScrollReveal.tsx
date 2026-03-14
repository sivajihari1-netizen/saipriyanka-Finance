'use client';
import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    // Immediately reveal hero elements
    document.querySelectorAll('#hero .r').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), 150 + i * 90);
    });

    // IntersectionObserver for all other sections
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.r').forEach((el) => {
      if (!el.classList.contains('in')) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
