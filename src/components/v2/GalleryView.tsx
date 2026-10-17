'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface GalleryImg { src: string; alt: string; width: number; height: number; caption?: string }

export default function GalleryView({ items }: { items: GalleryImg[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touch = useRef<number | null>(null);

  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);
  const close = useCallback(() => { setIdx(null); opener.current?.focus(); }, []);

  useEffect(() => {
    if (idx === null) return;
    document.documentElement.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'Tab') { e.preventDefault(); closeBtn.current?.focus(); }
    };
    addEventListener('keydown', key);
    return () => { document.documentElement.style.overflow = ''; removeEventListener('keydown', key); };
  }, [idx, close, go]);

  const cur = idx !== null ? items[idx] : null;
  return (
    <>
      <ul className="v2-film" aria-label="Fotos von DJ RAPHX">
        {items.map((it, i) => (
          <li key={it.src} className={`v2-film-item r${i % 4}`}>
            <button type="button" aria-label={`Foto vergrößern: ${it.alt}`} onClick={(e) => { opener.current = e.currentTarget; setIdx(i); }}>
              <Image src={it.src} alt={it.alt} width={it.width} height={it.height} sizes="(max-width: 700px) 70vw, 320px" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
      {cur && (
        <div className="v2-lb" role="dialog" aria-modal="true" aria-label="Fotogalerie" onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => { if (touch.current === null) return; const dx = e.changedTouches[0].clientX - touch.current; touch.current = null; if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1); }}>
          <button ref={closeBtn} type="button" className="v2-lb-close" onClick={close}>Schließen</button>
          <button type="button" className="v2-lb-prev" onClick={() => go(-1)} aria-label="Voriges Foto">←</button>
          <figure>
            <Image src={cur.src} alt={cur.alt} width={cur.width} height={cur.height} sizes="90vw" />
            <figcaption>{cur.caption || cur.alt} <span>{(idx ?? 0) + 1} / {items.length}</span></figcaption>
          </figure>
          <button type="button" className="v2-lb-next" onClick={() => go(1)} aria-label="Nächstes Foto">→</button>
        </div>
      )}
    </>
  );
}
