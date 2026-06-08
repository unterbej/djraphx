'use client';

import { useEffect, useState, type ReactElement } from 'react';

const MONTHS = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
const DAYS = ['Mo','Di','Mi','Do','Fr','Sa','So'];

function pad(n: number) { return String(n).padStart(2, '0'); }

export default function CalendarSection() {
  const [events, setEvents] = useState<Record<string, string>>({});
  const [cur, setCur] = useState(new Date(2026, 2, 1));
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/calendar').then(r => r.json()).then(setEvents).catch(() => {});
  }, []);

  // Close tooltip when tapping outside
  useEffect(() => {
    if (!activeKey) return;
    const close = () => setActiveKey(null);
    document.addEventListener('touchstart', close, { passive: true });
    return () => document.removeEventListener('touchstart', close);
  }, [activeKey]);

  const y = cur.getFullYear();
  const m = cur.getMonth();
  const title = `${MONTHS[m]} ${y}`;
  const first = new Date(y, m, 1);
  let dow = first.getDay();
  dow = dow === 0 ? 6 : dow - 1;
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const today = new Date();

  const cells: ReactElement[] = [];
  const dayNames = DAYS.map(d => <div key={d} className="cal-day-name">{d}</div>);

  for (let i = 0; i < dow; i++) {
    cells.push(<div key={`e${i}`} className="cal-day empty" />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${y}-${pad(m + 1)}-${pad(d)}`;
    const ev = events[key];
    const isToday = today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;
    const isActive = activeKey === key;
    cells.push(
      <div
        key={key}
        className={`cal-day${ev ? ' has-event' : ''}${isToday ? ' today' : ''}`}
        onTouchStart={ev ? e => { e.stopPropagation(); setActiveKey(isActive ? null : key); } : undefined}
      >
        <span className="cal-day-num">{d}</span>
        {ev && (
          <>
            <div className="cal-dot" />
            <div className={`cal-tooltip${isActive ? ' touch-active' : ''}`}>{ev}</div>
          </>
        )}
      </div>
    );
  }

  return (
    <section id="kalender">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Veranstaltungskalender 2026</span>
          <h2 className="sec-title">Wann bin ich <span className="grad-text">verfügbar?</span></h2>
          <p className="sec-lead">Tage mit einem Punkt sind bereits ausgebucht. Sichere dir deinen Wunschtermin rechtzeitig.</p>
        </div>
        <div className="cal-wrap reveal">
          <div className="cal-nav">
            <button className="cal-btn" onClick={() => setCur(new Date(y, m - 1, 1))} aria-label="Vorheriger Monat">←</button>
            <div className="cal-month">{title}</div>
            <button className="cal-btn" onClick={() => setCur(new Date(y, m + 1, 1))} aria-label="Nächster Monat">→</button>
          </div>
          <div className="cal-grid">
            {dayNames}
            {cells}
          </div>
          <div className="cal-legend">
            <div className="cal-legend-dot" />
            <span>Ausgebuchter Termin</span>
          </div>
        </div>
      </div>
    </section>
  );
}
