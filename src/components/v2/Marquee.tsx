'use client';

import { useEffect, useRef } from 'react';

// Endlos-Laufband. Scroll beschleunigt es, Hover/Fokus bremst es weich ab (kein harter Stopp).
export default function Marquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0, speed = 0.6, target = 0.6, lastY = window.scrollY, raf = 0, visible = true, slow = false;
    const half = () => tr.scrollWidth / 2;
    const frame = () => {
      const y = window.scrollY;
      const boost = Math.min(Math.abs(y - lastY) * 0.35, 7);
      lastY = y;
      target = (slow ? 0.12 : 0.6) + boost;
      speed += (target - speed) * 0.08;
      x -= speed;
      const w = half();
      if (-x >= w) x += w;
      tr.style.transform = `translate3d(${x}px,0,0)`;
      if (visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      if (visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    });
    io.observe(el);
    const on = () => { slow = true; };
    const off = () => { slow = false; };
    el.addEventListener('pointerenter', on); el.addEventListener('pointerleave', off);
    el.addEventListener('focusin', on); el.addEventListener('focusout', off);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); el.removeEventListener('pointerenter', on); el.removeEventListener('pointerleave', off); el.removeEventListener('focusin', on); el.removeEventListener('focusout', off); };
  }, []);

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined}>
      {items.map((t) => <li key={t}>{t}<i aria-hidden="true" /></li>)}
    </ul>
  );
  return (
    <div className="v2-marquee" ref={root} role="group" aria-label="Slogans">
      <div className="v2-marquee-track" ref={track}>
        {row(false)}
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
