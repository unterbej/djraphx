import { dbAll } from '@/lib/db';
import { GALLERY_KEYS, PHOTOS } from '@/lib/v2/photos';
import GalleryView, { type GalleryImg } from './GalleryView';
import Reveal from './Reveal';

// Eigene Fotos aus dem Shooting + Bilder aus der Admin-Galerie der alten Seite (gleiche Tabelle, nur lesend).
export default async function Gallery() {
  const own: GalleryImg[] = GALLERY_KEYS.map((k) => ({ src: PHOTOS[k].src, alt: PHOTOS[k].alt, width: PHOTOS[k].width, height: PHOTOS[k].height }));
  let admin: GalleryImg[] = [];
  try {
    const rows = await dbAll<{ filename: string; caption: string }>(`SELECT filename, caption FROM gallery ORDER BY sort_order ASC, id ASC`);
    // Größe unbekannt: 4:3 als Platzhalter-Seitenverhältnis, object-fit sorgt für sauberen Beschnitt.
    admin = rows.map((r) => ({ src: `/api/uploads/${r.filename}`, alt: r.caption || 'Foto von einer Veranstaltung mit DJ RAPHX', width: 1200, height: 900, caption: r.caption }));
  } catch { /* nur eigene Fotos */ }
  return (
    <section id="galerie" className="v2-sec v2-sec-gallery" aria-labelledby="h-galerie" tabIndex={-1}>
      <div className="v2-wrap">
        <Reveal variant="left" className="v2-sec-head">
          <span className="v2-num" aria-hidden="true" />
          <h2 id="h-galerie">Backstage und Pult</h2>
          <p>Fotos von mir und meiner Arbeit. Tippen oder klicken zum Vergrößern, mit Pfeiltasten oder Wischen blätterst du weiter.</p>
        </Reveal>
      </div>
      <GalleryView items={[...admin, ...own]} />
      <div className="v2-wrap">
        <p className="v2-small v2-todo-note">{/* TODO: echte Eventfotos (Hochzeit, Club, Firmenfeier) ergänzen – aktuell nur Shooting-Fotos und Admin-Galerie */}</p>
      </div>
    </section>
  );
}
