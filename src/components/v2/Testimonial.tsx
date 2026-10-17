import { dbAll } from '@/lib/db';
import Reveal from './Reveal';

// Quelle: Tabelle "reviews" der alten Seite (Admin → Bewertungen), nur lesend.
// Freigabe der Aussage ist im Repo nicht dokumentiert – siehe Bericht.
export default async function Testimonial() {
  let rows: { text: string; author: string; role: string }[] = [];
  try {
    rows = await dbAll<{ text: string; author: string; role: string }>(`SELECT text, author, role FROM reviews ORDER BY sort_order ASC, id ASC LIMIT 3`);
  } catch { /* nichts anzeigen */ }
  if (rows.length === 0) return null;
  return (
    <section id="stimmen" className="v2-sec v2-sec-voice" aria-labelledby="h-stimmen" tabIndex={-1}>
      <div className="v2-wrap">
        <Reveal variant="left" className="v2-sec-head">
          <span className="v2-num" aria-hidden="true" />
          <h2 id="h-stimmen">Was andere sagen</h2>
        </Reveal>
        {rows.map((r, i) => (
          <Reveal key={i} variant="mask" as="figure" className="v2-voice">
            <blockquote><p>{r.text}</p></blockquote>
            <figcaption><strong>{r.author}</strong>{r.role ? `, ${r.role}` : ''}</figcaption>
          </Reveal>
        ))}
        {/* TODO: weitere echte Kundenstimmen (Hochzeit, Firmenfeier) einfügen, sobald vorhanden */}
      </div>
    </section>
  );
}
