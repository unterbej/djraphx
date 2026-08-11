'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import BookingForm from './BookingForm';
import CalendarSection from './CalendarSection';
import ReviewSlider from './ReviewSlider';
import GallerySlider from './GallerySlider';

interface CmsContent {
  [key: string]: string;
}

export default function DJPage({ cms }: { cms: CmsContent }) {
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const c = (key: string, fallback = '') => cms[key] || fallback;

  useEffect(() => {
    const handleScroll = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 14);
      const hint = document.querySelector('.scroll-hint') as HTMLElement | null;
      if (hint) hint.style.opacity = window.scrollY > 60 ? '0' : '1';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    // Fallback: show all remaining hidden elements after 1.5s
    const t = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => el.classList.add('in'));
    }, 1500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  useEffect(() => {
    if (activeModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [activeModal]);


  // Hero canvas
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

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  const closeNav = () => setNavOpen(false);

  return (
    <>
      {/* NAV */}
      <nav className={`nav${navOpen ? ' open' : ''}`} ref={navRef} id="nav">
        <div className="wrap nav-row">
          <a href="#hero" className="brand" onClick={closeNav}>
            <Image
              src="/logoFarbeTransv2.png"
              alt="DJ RAPHX Logo"
              width={240}
              height={100}
              style={{ objectFit: 'contain', display: 'block' }}
              priority
            />
          </a>
          <ul className="nav-links" id="navLinks">
            <li><a href="#about" onClick={closeNav}>Über mich</a></li>
            <li><a href="#services" onClick={closeNav}>Services</a></li>
            <li><a href="#kalender" onClick={closeNav}>Events</a></li>
            <li><a href="#galerie" onClick={closeNav}>Galerie</a></li>
            <li><a href="#pakete" onClick={closeNav}>Pakete</a></li>
            <li><a href="#kontakt" onClick={closeNav}>Kontakt</a></li>
          </ul>
          <button className={`burger${navOpen ? ' open' : ''}`} ref={burgerRef} onClick={toggleNav} aria-label="Menü" aria-expanded={navOpen}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero" id="hero">
        <canvas id="heroCanvas" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-ring" aria-hidden="true" />
        <div className="wrap">
          <div className="hero-layout">
            <div className="hero-inner">
              <div className="hero-label reveal"><span className="eyebrow">DJ · Kärnten · Österreich</span></div>
              <h1 className="disp hero-title reveal">
                {c('hero_title', 'Dein DJ für stilvolle & unvergessliche Events').split(/(&|stilvolle)/i).length > 1
                  ? <>Dein DJ für<br/><span className="grad-text">stilvolle &amp;</span><br/>unvergessliche<br/>Events</>
                  : c('hero_title')}
              </h1>
              <p className="hero-sub reveal">{c('hero_subtitle')}</p>
              <p className="hero-quote reveal">{c('hero_quote')}</p>
              <div className="hero-ctas reveal">
                <a href="#kontakt" className="btn btn-primary">Jetzt Termin vereinbaren <span className="arrow">→</span></a>
                <a href="https://wa.me/436605459207" className="btn btn-wa" target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
              <div className="hero-stats reveal">
                <div><div className="stat-num">{c('hero_stats_events', '120+')}</div><div className="stat-lbl">Veranstaltungen</div></div>
                <div><div className="stat-num">{c('hero_stats_genres', '100%')}</div><div className="stat-lbl">Kundenzufriedenheit</div></div>
                <div><div className="stat-num">{c('hero_stats_available', '<24h')}</div><div className="stat-lbl">Rückmeldezeit</div></div>
              </div>
            </div>
            <div className="hero-frame">
              <div className="hero-frame-glow" />
              <div className="hero-frame-img">
                <Image src="/portrait-hero.png" alt="DJ RAPHX mit Kopfhörern" fill style={{objectFit:'cover',objectPosition:'center top'}} priority />
              </div>
              <div className="hero-frame-badge">DJ RAPHX · Kärnten</div>
            </div>
          </div>
        </div>
        <div className="scroll-hint" aria-hidden="true">Scroll</div>
      </header>

      {/* MARQUEE */}
      <div className="quote-strip" aria-hidden="true">
        <div className="quote-track">
          {[0, 1].map(i => (
            <span key={i} className="quote-copy" aria-hidden={i > 0 ? 'true' : undefined}>
              {c('marquee_text', 'Feiern beginnt mit der richtigen Musik · Erinnerungen fürs Leben · Emotionen, die bleiben ·')}&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Das zeichnet DJ RAPHX aus</span>
            <h2 className="sec-title">Warum <span className="grad-text">RAPHX</span>?</h2>
            <p className="sec-lead">Drei Punkte, die DJ RAPHX von einer einfachen Playlist unterscheiden.</p>
          </div>
          <div className="features-grid">
            <div className="feat-card reveal">
              <div className="feat-num">01</div>
              <h3 className="feat-title">{c('feat1_title', 'Angepasste Musikgestaltung')}</h3>
              <p className="feat-body">{c('feat1_body')}</p>
            </div>
            <div className="feat-card reveal">
              <div className="feat-num">02</div>
              <h3 className="feat-title">{c('feat2_title', 'Professionelle Planung & Ausführung')}</h3>
              <p className="feat-body">{c('feat2_body')}</p>
            </div>
            <div className="feat-card reveal">
              <div className="feat-num">03</div>
              <h3 className="feat-title">{c('feat3_title', 'Unvergessliche Abende & echte Emotionen')}</h3>
              <p className="feat-body">{c('feat3_body')}</p>
            </div>
          </div>
          <div className="feat-ctas reveal">
            <a href="#kontakt" className="btn btn-primary">Jetzt Termin vereinbaren <span className="arrow">→</span></a>
            <a href="https://wa.me/436605459207" className="btn btn-wa" target="_blank" rel="noopener">Über WhatsApp anfragen</a>
          </div>
        </div>
      </section>

      {/* WHY DJ */}
      <section className="why-dj" id="warum">
        <div className="wrap">
          <div className="why-inner">
            <span className="eyebrow reveal" style={{justifyContent:'center',display:'inline-flex',marginBottom:'16px'}}>Warum du einen DJ brauchst</span>
            <h2 className="disp big-quote reveal">{c('why_quote', '„Ohne die richtige Musik ist eine Veranstaltung einfach nicht das Wahre."')}</h2>
            <p className="why-text reveal">{c('why_text1')}</p>
            <p className="why-text reveal">{c('why_text2')}</p>
            <div className="reveal">
              <a href="#kontakt" className="btn btn-primary">Ja, das ist das Richtige für mich! <span className="arrow">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Ich bin dein DJ für</span>
            <h2 className="sec-title">Dein Event. <span className="grad-text">Meine Musik.</span></h2>
            <p className="sec-lead">Vom Hochzeitstanz bis zur Clubnacht — maßgeschneiderte Sets für jeden Anlass.</p>
          </div>
          <div className="services-grid">
            <article className="svc-card reveal">
              <div className="svc-art svc-art-wedding">
                <span className="svc-cat-label">Hochzeiten</span>
                <div className="eq-bars" aria-hidden="true"><span/><span/><span/><span/><span/></div>
              </div>
              <div className="svc-body">
                <div className="svc-label">01 — Service</div>
                <h3 className="svc-title">Hochzeiten</h3>
                <p className="svc-text">Eure Hochzeit verdient den richtigen Sound für jeden Moment. Vom stilvollen Empfang über den Hochzeitstanz bis zur ausgelassenen Party begleite ich euren besonderen Tag musikalisch mit viel Gespür für Stimmung, Gäste und den perfekten Zeitpunkt für den nächsten Song.</p>
              </div>
            </article>
            <article className="svc-card reveal">
              <div className="svc-art svc-art-event">
                <span className="svc-cat-label">Firmenevents</span>
                <div className="eq-bars" aria-hidden="true"><span/><span/><span/><span/><span/></div>
              </div>
              <div className="svc-body">
                <div className="svc-label">02 — Service</div>
                <h3 className="svc-title">Firmenevents</h3>
                <p className="svc-text">Die richtige Musik macht den Unterschied. Mit Gefühl für Rhythmus, einem Gespür für Menschen und der Fähigkeit, die Stimmung zu lesen, entsteht eine Atmosphäre, die zu eurem Event passt. Professionell, flexibel und immer abgestimmt auf Anlass und Publikum.</p>
              </div>
            </article>
            <article className="svc-card reveal">
              <div className="svc-art svc-art-bday">
                <span className="svc-cat-label">Geburtstage</span>
                <div className="eq-bars" aria-hidden="true"><span/><span/><span/><span/><span/></div>
              </div>
              <div className="svc-body">
                <div className="svc-label">03 — Service</div>
                <h3 className="svc-title">Geburtstage &amp; private Feiern</h3>
                <p className="svc-text">Bei Geburtstagen und privaten Feiern sorge ich als DJ für die passende Stimmung. Vom entspannten Start bis zur vollen Tanzfläche. Mit aktuellen Charts, zeitlosen Klassikern und mitreißenden Partyhits entsteht ein Musikmix, der zu deinen Gästen und deinem Anlass passt.</p>
              </div>
            </article>
            <article className="svc-card reveal">
              <div className="svc-art svc-art-public">
                <span className="svc-cat-label">Öffentliche Events</span>
                <div className="eq-bars" aria-hidden="true"><span/><span/><span/><span/><span/></div>
              </div>
              <div className="svc-body">
                <div className="svc-label">04 — Service</div>
                <h3 className="svc-title">Öffentliche Veranstaltungen</h3>
                <p className="svc-text">Ob Stadtfest, Vereinsfeier, Ball oder öffentliche Veranstaltung — die Musik entscheidet mit über die Stimmung. Mit einem vielseitigen Mix, sicherem Gespür für das Publikum und der passenden Energie begleite ich Veranstaltungen jeder Größe und bringe Menschen auf die Tanzfläche.</p>
              </div>
            </article>
            <article className="svc-card reveal">
              <div className="svc-art svc-art-club">
                <span className="svc-cat-label">Club Auftritte</span>
                <div className="eq-bars" aria-hidden="true"><span/><span/><span/><span/><span/></div>
              </div>
              <div className="svc-body">
                <div className="svc-label">05 — Service</div>
                <h3 className="svc-title">Club-Auftritte</h3>
                <p className="svc-text">Wenn der erste Beat einsetzt, beginnt die Nacht erst richtig. Mit energiegeladenen Sets, treibenden Sounds und dem richtigen Gespür für den Dancefloor sorge ich für volle Tanzflächen und Nächte, die in Erinnerung bleiben.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* QUALITIES */}
      <section id="qualitaeten" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Was macht Raphael besonders?</span>
            <h2 className="sec-title">Der erste Eindruck ist <span className="grad-text">das Wichtigste.</span></h2>
          </div>
          <div className="qual-grid">
            {[
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>, title: 'Professionelle Vorbereitung', body: 'Jedes Event wird individuell geplant, damit Musik, Ablauf und Stimmung perfekt zusammenpassen.' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h3l2-6 4 12 2-6 2 3h5"/></svg>, title: 'Gespür für Stimmung', body: 'Die richtige Musik läuft genau im passenden Moment und sorgt für eine volle Tanzfläche.' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>, title: 'Individuelle Musikauswahl', body: 'Die Musik wird passend zu Gästen, Altersgruppe und Art des Events ausgewählt.' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>, title: 'Zuverlässigkeit', body: 'Pünktlichkeit, Organisation und professionelles Arbeiten sorgen für einen entspannten Abend.' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>, title: 'Hochwertige Technik', body: 'Professionelle Technik sorgt für sauberen Klang, starke Stimmung und reibungslosen Ablauf.' },
              { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, title: 'Leidenschaft für Musik', body: 'Musik ist für mich mehr als Arbeit — meine Leidenschaft steckt dahinter und macht jedes Event einzigartig.' },
            ].map((q, i) => (
              <div key={i} className="qual-card reveal">
                <div className="qual-ico">{q.icon}</div>
                <h4 className="qual-title">{q.title}</h4>
                <p className="qual-body">{q.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-img reveal">
              <Image src="/portrait-about.png" alt="DJ Raphael Taxer – RAPHX" fill style={{objectFit:'cover',objectPosition:'center top'}} />
              <span className="about-tag">RAPHX · 2026</span>
            </div>
            <div className="about-body reveal">
              <span className="eyebrow">Über mich</span>
              <h2 className="sec-title">Wer ist <span className="grad-text">DJ Raphael Taxer</span> (RAPHX)?</h2>
              <p style={{fontSize:'14px',letterSpacing:'.12em',textTransform:'uppercase',color:'var(--cyan)',marginBottom:'20px',fontWeight:500}}>Professioneller DJ, Elektrotechniker &amp; Veranstaltungstechniker</p>
              <p>{c('about_text1')}</p>
              <p>{c('about_text2')}</p>
              <a href="#kontakt" className="btn btn-primary" style={{marginTop:'24px',marginBottom:'8px'}}>Buche mich als DJ! <span className="arrow">→</span></a>
              <p style={{fontSize:'13px',color:'var(--muted)',marginTop:'16px',marginBottom:'8px'}}>Du möchtest mehr über mich erfahren? Schau auf meinen Social-Media Accounts vorbei!</p>
              <div className="social-row">
                <a href="https://www.instagram.com/dj_raphx/" className="soc-btn" target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                  Instagram
                </a>
                <a href="https://www.facebook.com/raphael.taxer.7/" className="soc-btn" target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
                <a href="https://www.tiktok.com/@dj_raphx?is_from_webapp=1&sender_device=pc" className="soc-btn" target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4v9a4 4 0 1 1-4-4"/><path d="M14 4c.5 2.5 2.5 4.5 5 5"/></svg>
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="vorteile" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Wenn Du mich buchst</span>
            <h2 className="sec-title">3 Vorteile auf <span className="grad-text">einen Blick</span></h2>
          </div>
          <div className="adv-grid">
            <div className="adv-card reveal">
              <div className="adv-num">01</div>
              <h3 className="adv-title">Organisation &amp; Ablauf</h3>
              <p className="adv-body">Von der ersten Besprechung bis zum letzten Song begleite ich euch professionell und zuverlässig.</p>
            </div>
            <div className="adv-card reveal">
              <div className="adv-num">02</div>
              <h3 className="adv-title">Flexibilität</h3>
              <p className="adv-body">Jede Feier ist einzigartig. Deshalb passe ich mich flexibel euren Wünschen und der Stimmung an.</p>
            </div>
            <div className="adv-card reveal">
              <div className="adv-num">03</div>
              <h3 className="adv-title">Persönlicher Touch</h3>
              <p className="adv-body">Mit einem persönlichen Touch, euren Musikwünschen und dem Gespür für Stimmung entsteht eine einzigartige Atmosphäre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="pakete">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Meine DJ-Angebote</span>
            <h2 className="sec-title">Das passende <span className="grad-text">Paket</span> für dich</h2>
            <p className="sec-lead">Von der Hochzeit bis zur großen öffentlichen Veranstaltung — transparent und fair.</p>
          </div>
          <div className="pkg-grid">
            <div className="pkg-card popular reveal">
              <div className="pkg-badge">💍 Für euren großen Tag</div>
              <h3 className="pkg-name">Hochzeitspaket</h3>
              <p className="pkg-sub">Perfekt für Hochzeiten — von der Trauung bis zur Partynacht</p>
              <div className="pkg-divider" />
              <ul className="pkg-features">
                <li>Bis zu 8 Stunden DJ Service</li>
                <li>Professionelle Soundanlage</li>
                <li>Stimmungsvolle Lichttechnik</li>
                <li>Persönliches Vorgespräch &amp; Musikwunschliste</li>
                <li>Musikalische Begleitung von Empfang bis Hochzeitstanz</li>
                <li>Mikrofon für Reden und Ansagen</li>
                <li>Aufbau und Abbau inklusive</li>
              </ul>
              <p className="pkg-note">Verlängerungsstunden sind nicht im Paketpreis enthalten.</p>
              <a href="#kontakt" className="btn btn-primary btn-sm">Jetzt anfragen</a>
            </div>
            <div className="pkg-card reveal">
              <h3 className="pkg-name">Basic Paket</h3>
              <p className="pkg-sub">Perfekt für Geburtstage und kleinere Events bis 100 Personen</p>
              <div className="pkg-divider" />
              <ul className="pkg-features">
                <li>4–6 Stunden DJ Service</li>
                <li>Professionelle Soundanlage</li>
                <li>Basic Lichttechnik</li>
                <li>Vorgespräch &amp; Musikwünsche</li>
                <li>Aufbau und Abbau inklusive</li>
              </ul>
              <p className="pkg-note">Verlängerungsstunden sind nicht im Paketpreis enthalten.</p>
              <a href="#kontakt" className="btn btn-ghost btn-sm">Jetzt anfragen</a>
            </div>
            <div className="pkg-card reveal">
              <h3 className="pkg-name">Standardpaket</h3>
              <p className="pkg-sub">Perfekt für Geburtstage, Firmenfeiern und Events bis 200 Personen</p>
              <div className="pkg-divider" />
              <ul className="pkg-features">
                <li>6–8 Stunden DJ Service</li>
                <li>Professionelle Soundanlage</li>
                <li>Moderne Lichttechnik</li>
                <li>Vorgespräch &amp; Musikwünsche</li>
                <li>Aufbau und Abbau inklusive</li>
                <li>Mikrofon für Reden und Ansagen</li>
                <li>Persönliche Musikplanung</li>
              </ul>
              <p className="pkg-note">Verlängerungsstunden sind nicht im Paketpreis enthalten.</p>
              <a href="#kontakt" className="btn btn-ghost btn-sm">Jetzt anfragen</a>
            </div>
            <div className="pkg-card reveal">
              <h3 className="pkg-name">Premium Paket</h3>
              <p className="pkg-sub">Perfekt für große Veranstaltungen ab 200 Personen</p>
              <div className="pkg-divider" />
              <ul className="pkg-features">
                <li>Große professionelle Soundanlage</li>
                <li>Professionelle Lichttechnik</li>
                <li>Zusammenarbeit mit Showtechnik-Partnern</li>
                <li>Vorgespräch &amp; Musikwünsche</li>
                <li>Aufbau und Abbau inklusive</li>
                <li>Funkmikrofone</li>
                <li>Persönliche Musikplanung</li>
                <li>Nebelmaschine &amp; Showeffekte</li>
              </ul>
              <a href="#kontakt" className="btn btn-ghost btn-sm">Jetzt anfragen</a>
            </div>
            <div className="pkg-card reveal">
              <h3 className="pkg-name">Club Paket</h3>
              <p className="pkg-sub">Für Club-Auftritte und Nacht-Events</p>
              <div className="pkg-divider" />
              <ul className="pkg-features">
                <li>DJ-Service nach Anfrage</li>
                <li>Open Format</li>
                <li>Eigene Set Vorbereitung</li>
                <li>Exklusive Übergänge &amp; Mashups</li>
                <li>Energieaufbau während des Abends</li>
                <li>Event Promotion</li>
              </ul>
              <p className="pkg-note">Keine eigene Technik. Nutzung der vorhandenen Clubtechnik.</p>
              <a href="#kontakt" className="btn btn-ghost btn-sm">Jetzt anfragen</a>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="buchung" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="sec-head reveal" style={{textAlign:'center'}}>
            <span className="eyebrow">Wie funktioniert deine Buchung?</span>
            <h2 className="sec-title">In <span className="grad-text">3 Schritten</span> zum Erlebnis</h2>
          </div>
          <div className="process-steps">
            <div className="step reveal">
              <div className="step-num">1</div>
              <h3 className="step-title">Anfrage senden</h3>
              <p className="step-body">Klicke auf den Button und fülle das Anfrageformular aus. Teile mir dein Wunschdatum sowie eine passende Uhrzeit für einen Rückruf mit.</p>
            </div>
            <div className="step reveal">
              <div className="step-num">2</div>
              <h3 className="step-title">Kennenlern-Gespräch</h3>
              <p className="step-body">In einem kurzen Gespräch besprechen wir dein Event, deine Wünsche und Vorstellungen. Gemeinsam finden wir heraus, ob ich der passende DJ bin.</p>
            </div>
            <div className="step reveal">
              <div className="step-num">3</div>
              <h3 className="step-title">Terminvereinbarung</h3>
              <p className="step-body">Sobald alles besprochen ist, fixieren wir deinen Termin. Danach kannst du dich entspannen und dich auf dein Event freuen.</p>
            </div>
          </div>
          <div className="process-ctas reveal">
            <a href="#kontakt" className="btn btn-primary">Buche mich als DJ! <span className="arrow">→</span></a>
            <a href="https://wa.me/436605459207" className="btn btn-wa" target="_blank" rel="noopener">Über WhatsApp anfragen</a>
          </div>
        </div>
      </section>

      {/* CALENDAR */}
      <CalendarSection />

      {/* REVIEW SLIDER */}
      <section id="bewertungen" style={{background:'linear-gradient(135deg,rgba(14,165,255,.04),rgba(124,58,255,.04))',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div className="wrap">
          <div className="sec-head reveal" style={{textAlign:'center'}}>
            <span className="eyebrow">Kundenbewertungen</span>
            <h2 className="sec-title">Was <span className="grad-text">Kunden</span> sagen</h2>
            <p className="sec-lead" style={{margin:'0 auto'}}>"Feiern, über die man noch Jahre spricht."</p>
          </div>
          <div className="review-wrap reveal">
            <ReviewSlider />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <GallerySlider />

      {/* PARTNERS */}
      <section id="partner">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Meine Partner</span>
            <h2 className="sec-title">Starke <span className="grad-text">Netzwerke</span></h2>
            <p className="sec-lead">Zusammen mit meinen Partnern biete ich ein rundum-sorgloses Event-Erlebnis.</p>
          </div>
          <div className="partners-grid">
            {[
              { href:'https://www.melaniemaurerfotografie.at', name:'Melanie Maurer', role:'Business & Familienfotografin', logo:'/logos/MelanieMaurer.jpeg', cover: true },
              { href:'https://www.dobesch.at', name:'Dobesch Showtechnik', role:'Veranstaltungstechniker & Eventplaner', logo:'/logos/logo_dobesch_showtechnik.png', cover: false },
              { href:'https://www.linktr.ee/UnderlinedBrass', name:'Underlined Brass', role:'Blasmusik Band', logo:'/logos/logo_underlinedbrass-removebg-preview.png', cover: false },
              { href:'https://www.dein-finanzcoach.at', name:'Dein Finanzcoach', role:'Versicherungspartner', logo:'/logos/Logo_finanzCouch.png', cover: false },
            ].map((p, i) => (
              <a key={i} className="partner-card reveal" href={p.href} target="_blank" rel="noopener">
                <div className={p.cover ? 'partner-logo-wrap partner-logo-cover' : 'partner-logo-wrap'}>
                  <Image src={p.logo} alt={p.name} fill style={{objectFit: p.cover ? 'cover' : 'contain'}} sizes="300px" />
                </div>
                <div className="partner-info">
                  <div className="partner-name">{p.name}</div>
                  <div className="partner-role">{p.role}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontakt">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Kontakt &amp; Buchung</span>
            <h2 className="sec-title">Lass uns dein Event <span className="grad-text">unvergesslich</span> machen</h2>
            <p className="sec-lead">Melde dich gerne — ich melde mich innerhalb von 24 Stunden zurück.</p>
            <p style={{fontSize:'13px',color:'var(--muted)',maxWidth:'560px',margin:'8px 0 0'}}>Als DJ mit Sitz in Feffernitz bin ich für Hochzeiten, Geburtstage und Firmenevents in ganz Kärnten unterwegs — von Klagenfurt über Villach bis Spittal an der Drau.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="contact-item">
                <div className="contact-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div>
                <div>
                  <div className="contact-label">E-Mail</div>
                  <a href={`mailto:${c('contact_email','dj.raphx@icloud.com')}`} className="contact-val" style={{color:'var(--blue)'}}>{c('contact_email','dj.raphx@icloud.com')}</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                <div>
                  <div className="contact-label">Telefon</div>
                  <a href={`tel:${c('contact_phone','+436605459207').replace(/\s/g,'')}`} className="contact-val">{c('contact_phone','+43 660 5459207')}</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/></svg></div>
                <div>
                  <div className="contact-label">Adresse</div>
                  <div className="contact-val">{c('contact_address','Lina-Domenig Straße 118\n9710 Feffernitz, Österreich').split('\n').map((line,i) => <span key={i}>{line}{i === 0 && <br/>}</span>)}</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div>
                <div>
                  <div className="contact-label">Erreichbarkeit</div>
                  <div className="contact-val">{c('contact_hours','Mo – Fr: 7:30 – 18:30 Uhr')}</div>
                </div>
              </div>
              <a href="https://wa.me/436605459207" className="btn btn-wa" target="_blank" rel="noopener" style={{alignSelf:'flex-start',marginTop:'8px'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Über WhatsApp schreiben
              </a>
            </div>
            <div className="reveal">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap foot-row">
          <div className="foot-copy">© {new Date().getFullYear()} DJ RAPHX · Raphael Taxer · Feffernitz, Kärnten, Österreich</div>
          <ul className="foot-links">
            <li><a onClick={() => setActiveModal('agb')}>AGB</a></li>
            <li><a onClick={() => setActiveModal('dsgvo')}>Datenschutz</a></li>
            <li><a onClick={() => setActiveModal('impressum')}>Impressum</a></li>
          </ul>
        </div>
      </footer>

      {/* MODALS */}
      {activeModal && (
        <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null); }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
            {activeModal === 'agb' && (
              <>
                <h2>AGB</h2>
                <p>Allgemeine Geschäftsbedingungen für DJ-Dienstleistungen von Raphael Taxer (DJ RAPHX).</p>
                <h3>1. Geltungsbereich</h3>
                <p>Diese allgemeinen Geschäftsbedingungen gelten für alle Vereinbarungen zwischen Dienstleister DJ RAPHX und Auftraggebern im Bereich musikalischer Gestaltung.</p>
                <h3>2. Vertragsabschluss</h3>
                <p>Ein Vertrag kommt durch die schriftliche Bestätigung zwischen den Auftraggebern und dem Dienstleister zustande.</p>
                <h3>3. Preise und Zahlung</h3>
                <p>Die Vergütung wird wie folgt geregelt:</p>
                <ul><li>50% Anzahlung bei Vertragsabschluss</li><li>50% Restbetrag spätestens 10 Tage nach der Veranstaltung</li></ul>
                <h3>4. Stornierung / Kündigung</h3>
                <p>Eine Stornierung ist bis spätestens 2 Wochen vor dem Veranstaltungstermin möglich.</p>
                <ul><li>Bei fristgerechter Stornierung kann die Anzahlung einbehalten werden.</li><li>Bei späterer Stornierung wird 50% des Betrags fällig.</li></ul>
                <h3>5. Leistungen des DJs</h3>
                <p>Der DJ verpflichtet sich, die vereinbarte Leistung professionell und zuverlässig durchzuführen.</p>
                <h3>6. Kosten der Leistungen</h3>
                <p>Im vereinbarten Preis sind folgende Leistungen enthalten:</p>
                <ul><li>Vorbereitung der Veranstaltung</li><li>Gesetzliche Abgaben</li><li>Steuerliche Abgaben</li><li>DJ-Dienstleistung (Auflegen)</li></ul>
                <h3>7. Ausfall / Höhere Gewalt</h3>
                <p>Bei Ausfall durch unvorhersehbare Ereignisse bemüht sich der Dienstleister um einen Ersatz.</p>
                <h3>8. Schlussbestimmungen</h3>
                <p>Es gilt österreichisches Recht. Gerichtsstand ist der Sitz des Dienstleisters.</p>
              </>
            )}
            {activeModal === 'dsgvo' && (
              <>
                <h2>Datenschutzrichtlinie</h2>
                <p>Raphael Taxer ist der Betreiber dieser Webseite und verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten.</p>
                <h3>Erfasste Daten</h3>
                <p>Beim Besuch werden automatisch erfasst: Browsertyp, IP-Adresse, Zeitzone sowie Informationen über besuchte Seiten.</p>
                <h3>Ihre Rechte (DSGVO)</h3>
                <ul><li>Recht auf Auskunft</li><li>Recht auf Berichtigung</li><li>Recht auf Löschung</li><li>Recht auf Einschränkung der Verarbeitung</li><li>Recht auf Datenübertragbarkeit</li></ul>
                <h3>Kontakt</h3>
                <p>Mail: dj.raphx@icloud.com · Tel: +43 660 5459207</p>
              </>
            )}
            {activeModal === 'impressum' && (
              <>
                <h2>Impressum</h2>
                <h3>Angaben gemäß § 5 ECG</h3>
                <p><strong>DJ RAPHX</strong><br/>Raphael Taxer<br/>Lina-Domenig Straße 118<br/>9710 Feffernitz, Österreich</p>
                <h3>Kontakt</h3>
                <p>E-Mail: dj.raphx@icloud.com<br/>Tel: +43 660 5459207</p>
                <h3>Unternehmensgegenstand</h3>
                <p>DJ-Dienstleistungen für Veranstaltungen aller Art.</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
