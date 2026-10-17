'use client';

import { useEffect, useRef } from 'react';

// Der Endwert steht im HTML. Mit JS zählt er beim Sichtbarwerden von 0 hoch (nur Text, kein Layout).
export default function CountUp({ value, prefix = '', suffix = '', duration = 1600 }: { value: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = `${prefix}${Math.round(value * eased)}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { io.disconnect(); run(); }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, prefix, suffix, duration]);
  return <span ref={ref} className="v2-count">{prefix}{value}{suffix}</span>;
}
