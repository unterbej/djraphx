import LegalPage from '@/components/v2/LegalPage';
import { buildMetadata } from '@/lib/v2/seo';

export const metadata = buildMetadata({ slug: 'datenschutz', title: 'Datenschutz | DJ RAPHX', description: 'Datenschutzerklärung von DJ RAPHX (Raphael Taxer): erfasste Daten, Ihre Rechte nach DSGVO und Kontakt.' });

// Inhalt 1:1 aus dem Datenschutz-Modal der bestehenden Seite (DJPage.tsx).
export default function Page() {
  return (
    <LegalPage slug="datenschutz" title="Datenschutzrichtlinie">
      <p>Raphael Taxer ist der Betreiber dieser Webseite und verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten.</p>
      <h2>Erfasste Daten</h2>
      <p>Beim Besuch werden automatisch erfasst: Browsertyp, IP-Adresse, Zeitzone sowie Informationen über besuchte Seiten.</p>
      <h2>Ihre Rechte (DSGVO)</h2>
      <ul><li>Recht auf Auskunft</li><li>Recht auf Berichtigung</li><li>Recht auf Löschung</li><li>Recht auf Einschränkung der Verarbeitung</li><li>Recht auf Datenübertragbarkeit</li></ul>
      <h2>Kontakt</h2>
      <p>Mail: dj.raphx@icloud.com · Tel: +43 660 5459207</p>
    </LegalPage>
  );
}
