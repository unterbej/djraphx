'use client';

import { useEffect, useRef } from 'react';

// Zurückhaltender Parallax: nur transform, nur solange im Sichtfeld, nicht bei reduzierter Bewegung.
export default function Parallax({ children, amount = 40, className = '' }: { children: React.ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, visible = false;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -1..1
      el.style.transform = `translate3d(0,${(-p * amount).toFixed(1)}px,0)`;
    };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(update); };
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) onScroll(); });
    io.observe(el);
    addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [amount]);
  return <div ref={ref} className={className} style={{ willChange: 'transform' }}>{children}</div>;
}
