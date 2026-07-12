'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface GalleryItem {
  id: number;
  url: string;
  caption: string;
}

export default function GallerySlider() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch('/api/gallery').then(r => r.json()).then(setItems).catch(() => {});
  }, []);

  const go = useCallback((i: number) => {
    if (items.length === 0) return;
    setCurrent(((i % items.length) + items.length) % items.length);
  }, [items.length]);

  const prev = useCallback(() => go(current - 1), [current, go]);
  const next = useCallback(() => go(current + 1), [current, go]);

  // Auto-advance, paused while the lightbox is open
  useEffect(() => {
    if (items.length <= 1 || lightbox) return;
    timerRef.current = setTimeout(next, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, items.length, lightbox, next]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightbox, prev, next]);

  if (items.length === 0) return null;

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (dx > 48) prev();
    else if (dx < -48) next();
  };

  return (
    <section id="galerie">
      <div className="wrap">
        <div className="sec-head" style={{ textAlign: 'center' }}>
          <span className="eyebrow">Galerie</span>
          <h2 className="sec-title">Eindrücke von <span className="grad-text">meinen Events</span></h2>
          <p className="sec-lead" style={{ margin: '0 auto' }}>Momente, die für sich sprechen — von der Clubnacht bis zur privaten Feier.</p>
        </div>

    <div className="gal-slider">
      <div className="gal-frame" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="gal-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {items.map((item, i) => (
            <figure className="gal-slide" key={item.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.caption || `Event-Foto ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                onClick={() => setLightbox(true)}
              />
              {item.caption && <figcaption className="gal-caption">{item.caption}</figcaption>}
            </figure>
          ))}
        </div>

        {items.length > 1 && (
          <>
            <button className="gal-arrow gal-arrow-l" onClick={prev} aria-label="Vorheriges Foto">←</button>
            <button className="gal-arrow gal-arrow-r" onClick={next} aria-label="Nächstes Foto">→</button>
            <div className="gal-count">{current + 1} / {items.length}</div>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="gal-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`gal-dot${i === current ? ' active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="gal-lightbox" onClick={e => { if (e.target === e.currentTarget) setLightbox(false); }}>
          <button className="gal-lb-close" onClick={() => setLightbox(false)} aria-label="Schließen">✕</button>
          {items.length > 1 && <button className="gal-arrow gal-arrow-l" onClick={prev} aria-label="Vorheriges Foto">←</button>}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={items[current].url} alt={items[current].caption || 'Event-Foto'} />
          {items.length > 1 && <button className="gal-arrow gal-arrow-r" onClick={next} aria-label="Nächstes Foto">→</button>}
          {items[current].caption && <div className="gal-lb-caption">{items[current].caption}</div>}
        </div>
      )}

      <style>{`
        .gal-slider { max-width: 920px; margin: 0 auto; }
        .gal-frame {
          position: relative;
          overflow: hidden;
          border-radius: var(--rl, 18px);
          border: 1px solid var(--border);
          background: rgba(255,255,255,.02);
          aspect-ratio: 16 / 10;
          box-shadow: 0 20px 60px rgba(0,0,0,.35);
        }
        .gal-track {
          display: flex;
          height: 100%;
          transition: transform .55s cubic-bezier(.22,.61,.36,1);
        }
        .gal-slide {
          flex: 0 0 100%;
          position: relative;
          margin: 0;
          height: 100%;
        }
        .gal-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          cursor: zoom-in;
        }
        .gal-caption {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 40px 24px 18px;
          background: linear-gradient(180deg, rgba(5,6,13,0), rgba(5,6,13,.85));
          color: #fff;
          font-size: 14px;
          letter-spacing: .02em;
          pointer-events: none;
        }
        .gal-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.18);
          background: rgba(5,6,13,.55);
          backdrop-filter: blur(6px);
          color: #fff;
          font-size: 16px;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: background .2s, border-color .2s, color .2s;
          z-index: 2;
          font-family: inherit;
        }
        .gal-arrow:hover { background: rgba(14,165,255,.25); border-color: var(--cyan); color: var(--cyan); }
        .gal-arrow-l { left: 14px; }
        .gal-arrow-r { right: 14px; }
        .gal-count {
          position: absolute;
          top: 14px; right: 14px;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(5,6,13,.6);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.85);
          font-size: 11px;
          letter-spacing: .12em;
          z-index: 2;
        }
        .gal-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
        }
        .gal-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--border);
          border: none;
          cursor: pointer;
          transition: background .25s, transform .25s;
          padding: 0;
        }
        .gal-dot.active {
          background: var(--cyan);
          transform: scale(1.35);
          box-shadow: 0 0 8px var(--cyan);
        }
        .gal-lightbox {
          position: fixed;
          inset: 0;
          z-index: 300;
          background: rgba(5,6,13,.96);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 16px;
        }
        .gal-lightbox img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }
        .gal-lightbox .gal-arrow-l { left: 20px; position: fixed; }
        .gal-lightbox .gal-arrow-r { right: 20px; position: fixed; }
        .gal-lb-close {
          position: fixed;
          top: 18px; right: 18px;
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.15);
          background: rgba(255,255,255,.05);
          color: #fff;
          font-size: 16px;
          display: grid;
          place-items: center;
          cursor: pointer;
          z-index: 2;
          font-family: inherit;
        }
        .gal-lb-caption {
          position: fixed;
          left: 50%;
          bottom: 18px;
          transform: translateX(-50%);
          max-width: min(90vw, 700px);
          padding: 8px 18px;
          border-radius: 999px;
          background: rgba(5,6,13,.75);
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.9);
          font-size: 13px;
          text-align: center;
        }
        @media (max-width: 640px) {
          .gal-frame { aspect-ratio: 4 / 3; }
          .gal-arrow { width: 36px; height: 36px; font-size: 14px; }
        }
      `}</style>
    </div>
      </div>
    </section>
  );
}
