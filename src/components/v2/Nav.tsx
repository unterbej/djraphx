'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MENU_MORE, NAV, SOCIAL, href } from '@/lib/v2/site';
import CtaLink from './CtaLink';

export default function Nav() {
  const path = usePathname().replace(/\/$/, '') || '/v2';
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(path);
  const first = useRef<HTMLAnchorElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  if (lastPath !== path) { setLastPath(path); setOpen(false); }

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = 'hidden';
    first.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    addEventListener('keydown', key);
    return () => { document.documentElement.style.overflow = ''; removeEventListener('keydown', key); };
  }, [open]);

  const cur = (slug: string) => (path === href(slug) ? 'page' : undefined);

  return (
    <>
      <nav aria-label="Hauptnavigation" className="v2-nav">
        <ul>
          {NAV.map((n) => (
            <li key={n.slug}><Link href={href(n.slug)} aria-current={cur(n.slug)}>{n.label}</Link></li>
          ))}
        </ul>
      </nav>
      <div className="v2-header-cta"><CtaLink>Anfragen</CtaLink></div>
      <button ref={btn} type="button" className="v2-burger" aria-expanded={open} aria-controls="v2-menu" onClick={() => setOpen((o) => !o)}>
        <span className="sr-only">{open ? 'Menü schließen' : 'Menü öffnen'}</span>
        <i aria-hidden="true" /><i aria-hidden="true" />
      </button>
      <div id="v2-menu" className="v2-menu" data-open={open ? '' : undefined} inert={!open}>
        <nav aria-label="Mobile Navigation" className="v2-menu-inner">
          <ul className="v2-menu-main">
            <li style={{ ['--i' as string]: 0 }}><Link ref={first} href="/v2" aria-current={path === '/v2' ? 'page' : undefined} tabIndex={open ? 0 : -1}>Start</Link></li>
            {NAV.map((n, i) => (
              <li key={n.slug} style={{ ['--i' as string]: i + 1 }}><Link href={href(n.slug)} aria-current={cur(n.slug)} tabIndex={open ? 0 : -1}>{n.label}</Link></li>
            ))}
            <li style={{ ['--i' as string]: NAV.length + 1 }}><Link href="/v2/kontakt" aria-current={cur('kontakt')} tabIndex={open ? 0 : -1}>Kontakt</Link></li>
          </ul>
          <ul className="v2-menu-more">
            {MENU_MORE.map((n) => (
              <li key={n.slug}><Link href={href(n.slug)} aria-current={cur(n.slug)} tabIndex={open ? 0 : -1}>{n.label}</Link></li>
            ))}
          </ul>
          <ul className="v2-menu-social">
            {SOCIAL.map((s) => (
              <li key={s.url}><a href={s.url} target="_blank" rel="noopener me" tabIndex={open ? 0 : -1}>{s.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
