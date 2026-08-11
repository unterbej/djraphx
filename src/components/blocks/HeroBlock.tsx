'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import type { HeroConfig } from '@/lib/blocks/types';

export default function HeroBlock({ config }: { config: HeroConfig }) {
  // Hero canvas: pure particle/wave animation, no content — intentionally not configurable.
  useEffect(() => {
    const canvas = document.getElementById('heroCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let w: number, h: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    interface Pt { x: number; y: number; r: number; vx: number; vy: number; h: number; a: number; }
    let pts: Pt[] = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(60 * Math.min(1.4, Math.max(0.5, w / 1200)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        h: Math.random() < 0.5 ? 205 : 270, a: Math.random() * 0.5 + 0.2
      }));
    }

    let t = 0, rAF: number;
    function frame() {
      t += 0.005;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.2;
      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        const g = ctx.createLinearGradient(0, 0, w, 0);
        g.addColorStop(0, 'rgba(14,165,255,0)');
        g.addColorStop(0.35, `rgba(14,165,255,${0.28 - k * 0.07})`);
        g.addColorStop(0.7, `rgba(124,58,255,${0.28 - k * 0.07})`);
        g.addColorStop(1, 'rgba(124,58,255,0)');
        ctx.strokeStyle = g;
        for (let x = 0; x <= w; x += 5) {
          const y = h * 0.5 + Math.sin(x * 0.008 + t * 1.5 + k * 1.1) * (20 + k * 10) + Math.cos(x * 0.013 - t * 1.1 + k * 0.7) * (9 + k * 5) + k * (h / 10) - 50;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -8) p.x = w + 8; if (p.x > w + 8) p.x = -8;
        if (p.y < -8) p.y = h + 8; if (p.y > h + 8) p.y = -8;
        ctx.fillStyle = `hsla(${p.h},90%,60%,${p.a})`;
        ctx.shadowColor = `hsla(${p.h},90%,60%,.8)`;
        ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowBlur = 0;
      rAF = requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener('resize', resize);
    if (!window.matchMedia('(prefers-reduced-motion:reduce)').matches) rAF = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(rAF); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <header className="hero" id="hero">
      <canvas id="heroCanvas" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-ring" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-layout">
          <div className="hero-inner">
            <div className="hero-label reveal"><span className="eyebrow">{config.eyebrow}</span></div>
            <h1 className="disp hero-title reveal">
              {config.title.split(/(&|stilvolle)/i).length > 1
                ? <>Dein DJ für<br/><span className="grad-text">stilvolle &amp;</span><br/>unvergessliche<br/>Events</>
                : config.title}
            </h1>
            <p className="hero-sub reveal">{config.subtitle}</p>
            <p className="hero-quote reveal">{config.quote}</p>
            <div className="hero-ctas reveal">
              <a href="#kontakt" className="btn btn-primary">Jetzt Termin vereinbaren <span className="arrow">→</span></a>
              <a href="https://wa.me/436605459207" className="btn btn-wa" target="_blank" rel="noopener">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
            <div className="hero-stats reveal">
              <div><div className="stat-num">{config.statEvents}</div><div className="stat-lbl">Veranstaltungen</div></div>
              <div><div className="stat-num">{config.statSatisfaction}</div><div className="stat-lbl">Kundenzufriedenheit</div></div>
              <div><div className="stat-num">{config.statResponse}</div><div className="stat-lbl">Rückmeldezeit</div></div>
            </div>
          </div>
          <div className="hero-frame">
            <div className="hero-frame-glow" />
            <div className="hero-frame-img">
              <Image src={config.image} alt={config.imageAlt} fill style={{objectFit:'cover',objectPosition:'center top'}} priority />
            </div>
            <div className="hero-frame-badge">{config.imageBadge}</div>
          </div>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">Scroll</div>
    </header>
  );
}
