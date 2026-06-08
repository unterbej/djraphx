'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface Review {
  id: number;
  text: string;
  author: string;
  role: string;
  image_url: string;
}

export default function ReviewSlider() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState<'left' | 'right'>('right');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch('/api/reviews').then(r => r.json()).then(setReviews).catch(() => {});
  }, []);

  const go = useCallback((next: number, direction: 'left' | 'right') => {
    if (animating || reviews.length <= 1) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 380);
  }, [animating, reviews.length]);

  const prev = () => go((current - 1 + reviews.length) % reviews.length, 'left');
  const next = useCallback(() => go((current + 1) % reviews.length, 'right'), [current, go, reviews.length]);

  // Auto-advance
  useEffect(() => {
    if (reviews.length <= 1) return;
    timerRef.current = setTimeout(next, 6000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, reviews.length, next]);

  if (reviews.length === 0) return null;

  const r = reviews[current];

  return (
    <div className="review-slider-wrap">
      <div className={`review-slider-inner${animating ? ` slide-out-${dir}` : ''}`}>
        <div className="stars">★★★★★</div>

        {r.image_url && (
          <div className="review-avatar">
            <Image
              src={r.image_url}
              alt={r.author}
              width={72}
              height={72}
              style={{ objectFit: 'cover', borderRadius: '50%', width: '72px', height: '72px' }}
            />
          </div>
        )}

        {!r.image_url && (
          <div className="review-avatar-placeholder">
            <span>{r.author.charAt(0).toUpperCase()}</span>
          </div>
        )}

        <p className="review-text">{r.text}</p>
        <div className="review-author">{r.author}</div>
        {r.role && <div className="review-role">{r.role}</div>}
      </div>

      {reviews.length > 1 && (
        <div className="review-controls">
          <button className="review-nav-btn" onClick={prev} aria-label="Vorherige Bewertung">←</button>
          <div className="review-dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`review-dot${i === current ? ' active' : ''}`}
                onClick={() => go(i, i > current ? 'right' : 'left')}
                aria-label={`Bewertung ${i + 1}`}
              />
            ))}
          </div>
          <button className="review-nav-btn" onClick={next} aria-label="Nächste Bewertung">→</button>
        </div>
      )}

      <style>{`
        .review-slider-wrap { position: relative; overflow: hidden; }
        .review-slider-inner {
          transition: opacity .38s ease, transform .38s ease;
          opacity: 1;
          transform: translateX(0);
        }
        .review-slider-inner.slide-out-right {
          opacity: 0;
          transform: translateX(-40px);
        }
        .review-slider-inner.slide-out-left {
          opacity: 0;
          transform: translateX(40px);
        }
        .review-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 20px;
          border: 2px solid var(--border2);
          box-shadow: 0 0 18px rgba(14,165,255,.3);
        }
        .review-avatar-placeholder {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          margin: 0 auto 20px;
          background: var(--grad);
          display: grid;
          place-items: center;
          font-family: var(--font-d);
          font-size: 32px;
          color: #fff;
          box-shadow: var(--glow-b);
        }
        .review-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 32px;
        }
        .review-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: rgba(255,255,255,.03);
          color: var(--dim);
          font-size: 16px;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: border-color .2s, background .2s, color .2s;
          font-family: inherit;
        }
        .review-nav-btn:hover {
          border-color: var(--border2);
          background: rgba(14,165,255,.08);
          color: var(--cyan);
        }
        .review-dots {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .review-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border);
          border: none;
          cursor: pointer;
          transition: background .25s, transform .25s;
          padding: 0;
        }
        .review-dot.active {
          background: var(--cyan);
          transform: scale(1.35);
          box-shadow: 0 0 8px var(--cyan);
        }
      `}</style>
    </div>
  );
}
