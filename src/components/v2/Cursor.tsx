'use client';

import { useEffect, useRef } from 'react';

// Dezenter Cursor-Ring, nur mit Maus (pointer: fine) und ohne reduzierte Bewegung. Der echte Cursor bleibt sichtbar.
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ring.current;
    if (!el) return;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      el.dataset.on = '1';
      el.dataset.hot = (e.target as Element | null)?.closest('a,button,summary,[role=button],input,select,textarea,label') ? '1' : '';
    };
    const out = () => { el.dataset.on = ''; };
    addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', out);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); document.removeEventListener('pointerleave', out); };
  }, []);
  return <div ref={ring} className="v2-cursor" aria-hidden="true" />;
}
