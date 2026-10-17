'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const EVENT_TYPES = ['Hochzeit', 'Geburtstag', 'Firmenevent', 'Club-Auftritt', 'Öffentliches Event', 'Sonstiges'];

// Nutzt die bestehende Route /api/booking (unverändert). Die Route kennt kein Feld "Ort":
// Ort und Paket werden deshalb der Nachricht vorangestellt.
export default function InquiryForm({ eventType = '', ort = '' }: { eventType?: string; ort?: string }) {
  // Query-Parameter (?eventtyp=…&ort=…&paket=…) überschreiben die Vorbelegung der Seite.
  const q = useSearchParams();
  const t = q.get('eventtyp');
  return (
    <Form
      eventType={t && EVENT_TYPES.includes(t) ? t : eventType}
      ort={(q.get('ort') ?? ort).slice(0, 80)}
      paket={(q.get('paket') ?? '').slice(0, 60)}
    />
  );
}

function Form({ eventType, ort, paket }: { eventType: string; ort: string; paket: string }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', eventDate: '', eventType, ort, message: '', consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const set = (k: string, v: string | boolean) => {
    setF((cur) => ({ ...cur, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const today = new Date().toISOString().slice(0, 10);
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = 'Bitte gib deinen Namen an.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Bitte gib eine gültige E-Mail an.';
    if (f.phone && !/^[\d+\s().\-/]{5,}$/.test(f.phone)) e.phone = 'Ungültige Telefonnummer.';
    if (!f.eventDate) e.eventDate = 'Bitte wähle einen Termin.';
    else if (f.eventDate < today) e.eventDate = 'Das Datum muss in der Zukunft liegen.';
    if (!f.eventType) e.eventType = 'Bitte wähle einen Eventtyp.';
    if (!f.consent) e.consent = 'Bitte bestätige den Datenschutzhinweis.';
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setServerError('');
    const prefix = [f.ort && `Ort: ${f.ort}`, paket && `Paket: ${paket}`].filter(Boolean).join(' | ');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          phone: f.phone,
          eventDate: f.eventDate,
          eventType: f.eventType,
          message: [prefix, f.message].filter(Boolean).join('\n'),
        }),
      });
      if (res.ok) setSuccess(true);
      else if (res.status === 409) setErrors({ eventDate: 'Dieser Termin ist bereits ausgebucht.' });
      else setServerError((await res.json().catch(() => ({}))).error || 'Ein Fehler ist aufgetreten.');
    } catch {
      setServerError('Verbindungsfehler. Bitte versuche es erneut oder schreib mir per WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="v2-form" role="status">
        <h3>Anfrage gesendet!</h3>
        <p>Danke! DJ RAPHX meldet sich innerhalb von 24 Stunden persönlich bei dir.</p>
      </div>
    );
  }

  const field = (id: string, label: string, input: React.ReactNode, required = false) => (
    <div className={`v2-field${errors[id] ? ' error' : ''}`}>
      <label htmlFor={`v2-${id}`}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {input}
      {errors[id] && <span className="v2-err" id={`v2-${id}-err`} role="alert">{errors[id]}</span>}
    </div>
  );
  const aria = (id: string) => ({ id: `v2-${id}`, 'aria-invalid': !!errors[id], 'aria-describedby': errors[id] ? `v2-${id}-err` : undefined });

  return (
    <form className="v2-form" onSubmit={submit} noValidate>
      <div className="v2-form-grid">
        {field('name', 'Name', <input type="text" autoComplete="name" required {...aria('name')} value={f.name} onChange={(e) => set('name', e.target.value)} />, true)}
        {field('email', 'E-Mail', <input type="email" autoComplete="email" required {...aria('email')} value={f.email} onChange={(e) => set('email', e.target.value)} />, true)}
        {field('phone', 'Telefon', <input type="tel" autoComplete="tel" {...aria('phone')} value={f.phone} onChange={(e) => set('phone', e.target.value)} />)}
        {field('eventDate', 'Wunschtermin', <input type="date" required {...aria('eventDate')} value={f.eventDate} onChange={(e) => set('eventDate', e.target.value)} />, true)}
        {field('eventType', 'Eventtyp', (
          <select required {...aria('eventType')} value={f.eventType} onChange={(e) => set('eventType', e.target.value)}>
            <option value="">Bitte wählen …</option>
            {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        ), true)}
        {field('ort', 'Ort', <input type="text" autoComplete="address-level2" {...aria('ort')} value={f.ort} onChange={(e) => set('ort', e.target.value)} />)}
        <div className="v2-field full">
          <label htmlFor="v2-message">Nachricht</label>
          <textarea id="v2-message" rows={5} placeholder="Gästezahl, Location, Musikwünsche …" value={f.message} onChange={(e) => set('message', e.target.value)} />
        </div>
        <div className={`v2-check full${errors.consent ? ' error' : ''}`}>
          <input type="checkbox" id="v2-consent" checked={f.consent} aria-invalid={!!errors.consent} onChange={(e) => set('consent', e.target.checked)} />
          <label htmlFor="v2-consent">
            Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verarbeitet werden (siehe <Link href="/v2/datenschutz">Datenschutz</Link>). *
          </label>
          {errors.consent && <span className="v2-err" role="alert">{errors.consent}</span>}
        </div>
      </div>
      {serverError && <p className="v2-err" role="alert">{serverError}</p>}
      <button type="submit" className="btn btn-primary v2-submit" disabled={loading}>
        {loading ? 'Wird gesendet …' : 'Anfrage senden'}
      </button>
    </form>
  );
}
