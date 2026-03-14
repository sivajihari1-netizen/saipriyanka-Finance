'use client';
import { useEffect, useRef } from 'react';

const ITEMS = [
  'Capital Markets', 'SEBI Regulation', 'Financial Analysis',
  'Equity Research', 'Compliance Frameworks', 'RBI Policy',
  'Investment Intelligence', 'Finance Education',
];

export default function Ticker() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.innerHTML += ref.current.innerHTML;
  }, []);

  return (
    <div className="ticker">
      <div className="ticker-track" ref={ref}>
        {ITEMS.map((item, i) => (
          <span className="ticker-item" key={i}>
            {item}
            <span className="ticker-dot"></span>
          </span>
        ))}
      </div>
    </div>
  );
}
