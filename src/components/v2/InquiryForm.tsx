'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useSyncExternalStore } from 'react';
import { PACKAGES } from '@/lib/v2/site';
import { CTX_KEY } from './CtaLink';

const EVENT_TYPES = ['Hochzeit', 'Geburtstag', 'Firmenevent', 'Club-Auftritt', 'Öffentliches Event', 'Sonstiges'];

const subscribe = () => () => {};
const readCtx = () => { try { return sessionStorage.getItem(CTX_KEY) ?? ''; } catch { return ''; } };

// Nutzt die bestehende Route /api/booking (unverändert). Die Route kennt kein Feld "Ort":
// Ort und Paket werden der Nachricht vorangestellt.
export default function InquiryForm({ eventType = '', ort = '' }: { eventType?: string; ort?: string }) {
  const stored = useSyncExternalStore(subscribe, readCtx, () => '');
  const q = useSearchParams();
  let ctx: { eventType?: string; ort?: string; paket?: string } = {};
  try { ctx = stored ? JSON.parse(stored) : {}; } catch { /* ignorieren */ }
  const slug = q.get('paket') ?? ctx.paket ?? '';
  const pkg = PACKAGES.find((p) => p.slug === slug)?.name ?? '';
  const t = eventType || ctx.eventType || '';
  return <Form key={`${t}|${ort || ctx.ort || ''}|${pkg}`} eventType={EVENT_TYPES.includes(t) ? t : ''} ort={ort || ctx.ort || ''} paket={pkg} />;
}

function Form({ eventType, ort, paket: initialPaket }: { eventType: string; ort: string; paket: string }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', eventDate: '', eventType, ort, message: '', consent: false });
  const [paket, setPaket] = useState(initialPaket);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const set = (k: string, v: string | boolean) => { setF((c) => ({ ...c, [k]: v })); setErrors((e) => ({ ...e, [k]: '' })); };

  const validate = () => {
    const today = new Date().toISOString().slice(0, 10);
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = 'Wie heißt du?';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Bitte gib eine gültige E-Mail an.';
    if (f.phone && !/^[\d+\s().\-/]{5,}$/.test(f.phone)) e.phone = 'Diese Telefonnummer sieht nicht richtig aus.';
    if (!f.eventDate) e.eventDate = 'Bitte wähle einen Wunschtermin.';
    else if (f.eventDate < today) e.eventDate = 'Der Termin muss in der Zukunft liegen.';
    if (!f.eventType) e.eventType = 'Was feierst du?';
    if (!f.consent) e.consent = 'Bitte bestätige den Datenschutzhinweis.';
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`v2-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setLoading(true);
    setServerError('');
    const prefix = [f.ort && `Ort: ${f.ort}`, paket && `Paket: ${paket}`].filter(Boolean).join(' | ');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: f.name, email: f.email, phone: f.phone, eventDate: f.eventDate, eventType: f.eventType, message: [prefix, f.message].filter(Boolean).join('\n') }),
      });
      if (res.ok) { setSuccess(true); try { sessionStorage.removeItem(CTX_KEY); } catch { /* ignorieren */ } }
      else if (res.status === 409) setErrors({ eventDate: 'Dieser Tag ist leider schon vergeben. Probier einen anderen?' });
      else setServerError((await res.json().catch(() => ({}))).error || 'Das hat nicht geklappt.');
    } catch {
      setServerError('Keine Verbindung. Versuch es nochmal oder schreib mir per WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="v2-form v2-form-ok" role="status">
        <svg aria-hidden="true" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path className="v2-tick" d="M4 12.5l5 5L20 6.5" /></svg>
        <h3>Angekommen.</h3>
        <p>Danke! Ich melde mich innerhalb von 24 Stunden persönlich bei dir.</p>
      </div>
    );
  }

  const err = (id: string) => errors[id] && <span className="v2-err" id={`v2-${id}-err`} role="alert">{errors[id]}</span>;
  const aria = (id: string) => ({ id: `v2-${id}`, 'aria-invalid': !!errors[id] || undefined, 'aria-describedby': errors[id] ? `v2-${id}-err` : undefined });

  return (
    <form className="v2-form" onSubmit={submit} noValidate>
      {paket && (
        <p className="v2-chip">
          <span>Paket: {paket}</span>
          <button type="button" onClick={() => setPaket('')} aria-label={`Paket ${paket} entfernen`}>×</button>
        </p>
      )}
      <div className="v2-form-grid">
        <div className={`v2-field${errors.name ? ' error' : ''}`}>
          <label htmlFor="v2-name">Name *</label>
          <input type="text" autoComplete="name" required {...aria('name')} value={f.name} onChange={(e) => set('name', e.target.value)} />
          {err('name')}
        </div>
        <div className={`v2-field${errors.email ? ' error' : ''}`}>
          <label htmlFor="v2-email">E-Mail *</label>
          <input type="email" autoComplete="email" required {...aria('email')} value={f.email} onChange={(e) => set('email', e.target.value)} />
          {err('email')}
        </div>
        <div className={`v2-field${errors.phone ? ' error' : ''}`}>
          <label htmlFor="v2-phone">Telefon</label>
          <input type="tel" autoComplete="tel" {...aria('phone')} value={f.phone} onChange={(e) => set('phone', e.target.value)} />
          {err('phone')}
        </div>
        <div className={`v2-field${errors.eventDate ? ' error' : ''}`}>
          <label htmlFor="v2-eventDate">Wunschtermin *</label>
          <input type="date" required {...aria('eventDate')} value={f.eventDate} onChange={(e) => set('eventDate', e.target.value)} />
          {err('eventDate')}
        </div>
        <div className={`v2-field${errors.eventType ? ' error' : ''}`}>
          <label htmlFor="v2-eventType">Eventtyp *</label>
          <select required {...aria('eventType')} value={f.eventType} onChange={(e) => set('eventType', e.target.value)}>
            <option value="">Bitte wählen …</option>
            {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
          {err('eventType')}
        </div>
        <div className="v2-field">
          <label htmlFor="v2-ort">Ort</label>
          <input type="text" autoComplete="address-level2" {...aria('ort')} value={f.ort} onChange={(e) => set('ort', e.target.value)} />
        </div>
        <div className="v2-field full">
          <label htmlFor="v2-message">Nachricht</label>
          <textarea id="v2-message" rows={4} placeholder="Gästezahl, Location, Musikwünsche …" value={f.message} onChange={(e) => set('message', e.target.value)} />
        </div>
        <div className={`v2-check full${errors.consent ? ' error' : ''}`}>
          <input type="checkbox" id="v2-consent" checked={f.consent} aria-invalid={!!errors.consent || undefined} onChange={(e) => set('consent', e.target.checked)} />
          <label htmlFor="v2-consent">
            Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verarbeitet werden. Mehr dazu in der <a href="https://www.djraphx.at/#kontakt" target="_blank" rel="noopener">Datenschutzrichtlinie</a> der Hauptseite. *
          </label>
          {errors.consent && <span className="v2-err" role="alert">{errors.consent}</span>}
        </div>
      </div>
      {serverError && <p className="v2-err" role="alert">{serverError}</p>}
      <button type="submit" className="v2-btn v2-btn-primary v2-submit" disabled={loading} aria-busy={loading}>
        <span>{loading ? 'Wird gesendet …' : 'Anfrage senden'}</span>
      </button>
    </form>
  );
}
