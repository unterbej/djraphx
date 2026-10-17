import './v2.css';
import type { Metadata } from 'next';
import Footer from '@/components/v2/Footer';
import Header from '@/components/v2/Header';
import Cursor from '@/components/v2/Cursor';
import JsonLd from '@/components/v2/JsonLd';
import StickyCta from '@/components/v2/StickyCta';
import { businessSchema, buildMetadata } from '@/lib/v2/seo';
import { ORIGIN } from '@/lib/v2/site';
import { home } from '@/lib/v2/pages/home';
import { display, text } from './fonts';

// Das Root-Layout liest bei jedem Render die DB (Bewertungen für das Schema). Würden alle v2-Seiten
// parallel beim Build vorgerendert, kollidieren die DB-Initialisierungen (SQLITE_BUSY).
// Darum werden v2-Seiten bei Anfrage gerendert. Siehe Bericht: db.ts race-safe machen, dann kann das entfallen.
export const dynamic = 'force-dynamic';

// Hinweis: <html lang> kommt aus dem Root-Layout (de) und wird hier bewusst nicht verändert.
export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  ...buildMetadata(home),
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`v2 ${display.variable} ${text.variable}`} id="v2-root">
      {/* Markiert, dass JS läuft: erst dann werden Reveal-Elemente vorab versteckt. Ohne JS bleibt alles sichtbar. */}
      <script dangerouslySetInnerHTML={{ __html: "document.getElementById('v2-root').classList.add('js')" }} />
      <a className="v2-skip" href="#v2-main">Zum Inhalt springen</a>
      <JsonLd data={businessSchema()} />
      <Header />
      <main id="v2-main" tabIndex={-1}>{children}</main>
      <Footer />
      <StickyCta />
      <Cursor />
    </div>
  );
}
