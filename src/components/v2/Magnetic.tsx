'use client';

import { useRef } from 'react';

// Magnetischer Effekt für Buttons – nur Desktop mit Maus.
export default function Magnetic({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const ok = () => matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !ok()) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate3d(${(dx * 0.22).toFixed(1)}px,${(dy * 0.3).toFixed(1)}px,0)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <span ref={ref} className={`v2-magnetic ${className}`} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </span>
  );
}
