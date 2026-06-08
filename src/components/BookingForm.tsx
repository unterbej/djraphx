'use client';

import { useState } from 'react';

export default function BookingForm() {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', eventDate: '', eventType: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const today = new Date().toISOString().slice(0, 10);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fields.name.trim()) errs.name = 'Bitte gib deinen Namen an.';
    if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Bitte gib eine gültige E-Mail an.';
    if (!fields.eventDate) errs.eventDate = 'Bitte wähle einen Termin.';
    else if (fields.eventDate < today) errs.eventDate = 'Datum muss in der Zukunft liegen.';
    if (!fields.eventType) errs.eventType = 'Bitte wähle einen Eventtyp.';
    if (fields.phone && !/^[\d+\s().\-\/]{5,}$/.test(fields.phone)) errs.phone = 'Ungültige Telefonnummer.';
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setServerError('');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        if (res.status === 409) {
          setErrors({ eventDate: 'Dieser Termin ist bereits ausgebucht.' });
        } else {
          setServerError(data.error || 'Ein Fehler ist aufgetreten.');
        }
      }
    } catch {
      setServerError('Verbindungsfehler. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="form-card">
        <div className="form-success show">
          <div className="check-ico">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4L19 6"/></svg>
          </div>
          <h3 style={{fontFamily:'var(--font-d)',fontSize:'32px',letterSpacing:'.04em',textTransform:'uppercase',marginBottom:'8px'}}>Anfrage gesendet!</h3>
          <p style={{color:'var(--dim)',fontSize:'15px'}}>Danke! DJ RaphX meldet sich innerhalb von 24 Stunden persönlich zurück.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <div className="form-grid">
        <div className={`field${errors.name ? ' error' : ''}`}>
          <label htmlFor="f-name">Name <span className="req">*</span></label>
          <input type="text" id="f-name" placeholder="Vor- und Nachname" value={fields.name} onChange={e => { setFields(f => ({...f, name: e.target.value})); setErrors(e2 => ({...e2, name: ''})); }} />
          <span className="err">{errors.name}</span>
        </div>
        <div className={`field${errors.email ? ' error' : ''}`}>
          <label htmlFor="f-email">E-Mail <span className="req">*</span></label>
          <input type="email" id="f-email" placeholder="name@beispiel.at" value={fields.email} onChange={e => { setFields(f => ({...f, email: e.target.value})); setErrors(e2 => ({...e2, email: ''})); }} />
          <span className="err">{errors.email}</span>
        </div>
        <div className={`field${errors.phone ? ' error' : ''}`}>
          <label htmlFor="f-phone">Telefon</label>
          <input type="tel" id="f-phone" placeholder="+43 …" value={fields.phone} onChange={e => { setFields(f => ({...f, phone: e.target.value})); setErrors(e2 => ({...e2, phone: ''})); }} />
          <span className="err">{errors.phone}</span>
        </div>
        <div className={`field${errors.eventDate ? ' error' : ''}`}>
          <label htmlFor="f-date">Wunschtermin <span className="req">*</span></label>
          <input type="date" id="f-date" min={today} value={fields.eventDate} onChange={e => { setFields(f => ({...f, eventDate: e.target.value})); setErrors(e2 => ({...e2, eventDate: ''})); }} />
          <span className="err">{errors.eventDate}</span>
        </div>
        <div className={`field full${errors.eventType ? ' error' : ''}`}>
          <label htmlFor="f-type">Eventtyp <span className="req">*</span></label>
          <select id="f-type" value={fields.eventType} onChange={e => { setFields(f => ({...f, eventType: e.target.value})); setErrors(e2 => ({...e2, eventType: ''})); }}>
            <option value="">Bitte wählen …</option>
            <option>Geburtstag</option>
            <option>Firmenevent</option>
            <option>Club-Auftritt</option>
            <option>Öffentliches Event</option>
            <option>Sonstiges</option>
          </select>
          <span className="err">{errors.eventType}</span>
        </div>
        <div className="field full">
          <label htmlFor="f-msg">Nachricht</label>
          <textarea id="f-msg" placeholder="Erzähl mir kurz von deinem Event — Datum, Gästeanzahl, Location, Musikwünsche …" value={fields.message} onChange={e => setFields(f => ({...f, message: e.target.value}))} />
        </div>
      </div>
      {serverError && <p style={{color:'#ff7a93',fontSize:'13px',marginBottom:'12px'}}>{serverError}</p>}
      <p className="form-note">Mit dem Absenden erklärst du dich mit der Verarbeitung deiner Daten zur Bearbeitung der Anfrage einverstanden.</p>
      <button type="button" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}} onClick={handleSubmit} disabled={loading}>
        {loading ? 'Wird gesendet …' : <><span>Anfrage senden</span> <span className="arrow">→</span></>}
      </button>
    </div>
  );
}
