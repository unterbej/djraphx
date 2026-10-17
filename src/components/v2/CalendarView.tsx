'use client';

import { useState } from 'react';

const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const pad = (n: number) => String(n).padStart(2, '0');
const isBooked = (t: string) => /ausgebucht/i.test(t);

// Monatsansicht. Daten kommen vom Server (gleiche Tabelle wie die alte Seite, nur lesend).
export default function CalendarView({ events, year, month, today }: { events: Record<string, string>; year: number; month: number; today: string }) {
  const [cur, setCur] = useState({ y: year, m: month });
  const first = new Date(cur.y, cur.m, 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(cur.y, cur.m + 1, 0).getDate();
  const prefix = `${cur.y}-${pad(cur.m + 1)}-`;
  const monthEvents = Object.entries(events).filter(([d]) => d.startsWith(prefix)).sort(([a], [b]) => a.localeCompare(b));
  const step = (d: number) => setCur((c) => { const n = new Date(c.y, c.m + d, 1); return { y: n.getFullYear(), m: n.getMonth() }; });

  return (
    <div className="v2-cal">
      <div className="v2-cal-head">
        <h3 aria-live="polite">{MONTHS[cur.m]} <span>{cur.y}</span></h3>
        <div className="v2-cal-nav">
          <button type="button" onClick={() => step(-1)} aria-label="Voriger Monat">←</button>
          <button type="button" onClick={() => step(1)} aria-label="Nächster Monat">→</button>
        </div>
      </div>
      <div className="v2-cal-grid">
        {DAYS.map((d) => <div key={d} className="v2-cal-dn">{d}</div>)}
        {Array.from({ length: lead }, (_, i) => <div key={`e${i}`} className="v2-cal-day empty" aria-hidden="true" />)}
        {Array.from({ length: days }, (_, i) => {
          const d = i + 1;
          const key = `${prefix}${pad(d)}`;
          const ev = events[key];
          return (
            <div key={key} className={`v2-cal-day${ev ? (isBooked(ev) ? ' booked' : ' event') : ''}${key === today ? ' today' : ''}`} title={ev}>
              <span>{d}</span>
              {ev && <i aria-hidden="true" />}
              {ev && <span className="sr-only">{ev}</span>}
            </div>
          );
        })}
      </div>
      <ul className="v2-cal-list">
        {monthEvents.length === 0 && <li>In diesem Monat ist noch nichts eingetragen.</li>}
        {monthEvents.map(([d, t]) => (
          <li key={d} className={isBooked(t) ? 'booked' : ''}>
            <time dateTime={d}>{d.slice(8)}.{d.slice(5, 7)}.</time> {t}
          </li>
        ))}
      </ul>
      <p className="v2-cal-legend"><i className="booked" /> ausgebucht <i className="event" /> öffentliche Veranstaltung</p>
    </div>
  );
}
