import './v2.css';
import type { Metadata } from 'next';
import Header from '@/components/v2/Header';
import Footer from '@/components/v2/Footer';
import StickyCta from '@/components/v2/StickyCta';
import JsonLd from '@/components/v2/JsonLd';
import { businessSchema, buildMetadata } from '@/lib/v2/seo';
import { ORIGIN } from '@/lib/v2/site';
import { home } from '@/lib/v2/pages/home';

// Das Root-Layout liest bei jedem Render die DB (Bewertungen für das Schema). Würden alle v2-Seiten
// parallel beim Build vorgerendert, kollidieren die DB-Initialisierungen (SQLITE_BUSY).
// Darum werden v2-Seiten bei Anfrage gerendert. Siehe Bericht: db.ts race-safe machen, dann kann das entfallen.
export const dynamic = 'force-dynamic';

// Hinweis: <html lang> kommt aus dem Root-Layout (de) und wird hier bewusst nicht verändert.
// Standard-Metadaten für alle /v2/-Seiten; jede Seite überschreibt sie mit eigenem buildMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  ...buildMetadata(home),
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2" id="v2-root">
      <a className="v2-skip" href="#v2-main">Zum Inhalt springen</a>
      <JsonLd data={businessSchema()} />
      <Header />
      <main id="v2-main">{children}</main>
      <Footer />
      <StickyCta />
    </div>
  );
}
