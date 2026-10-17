import { dbAll } from '@/lib/db';
import CalendarView from './CalendarView';
import Reveal from './Reveal';

// Liest dieselbe Tabelle wie /api/calendar der alten Seite – nur lesend.
export default async function Calendar() {
  let events: Record<string, string> = {};
  try {
    const rows = await dbAll<{ date: string; title: string }>(`SELECT date, title FROM calendar_events ORDER BY date ASC`);
    events = Object.fromEntries(rows.map((r) => [r.date, r.title]));
  } catch { /* leer anzeigen */ }
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return (
    <section id="kalender" className="v2-sec v2-sec-cal" aria-labelledby="h-kalender" tabIndex={-1}>
      <div className="v2-wrap v2-cal-wrap">
        <Reveal variant="left" className="v2-sec-head">
          <span className="v2-num" aria-hidden="true" />
          <h2 id="h-kalender">Ist dein Tag noch frei?</h2>
          <p>Ausgebuchte Tage sind markiert. Bestätigt ist ein Termin erst mit meiner Rückmeldung.</p>
        </Reveal>
        <Reveal variant="up">
          <CalendarView events={events} year={now.getFullYear()} month={now.getMonth()} today={today} />
        </Reveal>
      </div>
    </section>
  );
}
