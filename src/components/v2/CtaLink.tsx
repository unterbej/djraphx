'use client';

import Link from 'next/link';
import Magnetic from './Magnetic';

export const CTX_KEY = 'v2-inquiry';

// Link zum Formular. Merkt sich Eventtyp/Ort/Paket per sessionStorage, damit die URL sauber bleibt.
// Ohne JS funktioniert der Link trotzdem (/v2/kontakt#anfrage, optional ?paket=slug).
export default function CtaLink({
  eventType = '', ort = '', paket = '', href, children, variant = 'primary', magnetic = true, className = '',
}: {
  eventType?: string; ort?: string; paket?: string; href?: string; children: React.ReactNode;
  variant?: 'primary' | 'ghost'; magnetic?: boolean; className?: string;
}) {
  const target = href ?? `/v2/kontakt${paket ? `?paket=${paket}` : ''}#anfrage`;
  const store = () => {
    try { sessionStorage.setItem(CTX_KEY, JSON.stringify({ eventType, ort, paket })); } catch { /* ignorieren */ }
  };
  const link = (
    <Link href={target} className={`v2-btn v2-btn-${variant} ${className}`} onClick={store}>
      <span>{children}</span>
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </Link>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
