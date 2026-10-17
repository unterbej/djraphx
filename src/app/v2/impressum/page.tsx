import LegalPage from '@/components/v2/LegalPage';
import { buildMetadata } from '@/lib/v2/seo';

export const metadata = buildMetadata({ slug: 'impressum', title: 'Impressum | DJ RAPHX', description: 'Impressum von DJ RAPHX (Raphael Taxer), Feffernitz, Kärnten.' });

// Inhalt 1:1 aus dem Impressum-Modal der bestehenden Seite (DJPage.tsx).
export default function Page() {
  return (
    <LegalPage slug="impressum" title="Impressum">
      <h2>Angaben gemäß § 5 ECG</h2>
      <p><strong>DJ RAPHX</strong><br />Raphael Taxer<br />Lina-Domenig Straße 118<br />9710 Feffernitz, Österreich</p>
      <h2>Kontakt</h2>
      <p>E-Mail: dj.raphx@icloud.com<br />Tel: +43 660 5459207</p>
      <h2>Unternehmensgegenstand</h2>
      <p>DJ-Dienstleistungen für Veranstaltungen aller Art.</p>
    </LegalPage>
  );
}
