import LegalPage from '@/components/v2/LegalPage';
import { buildMetadata } from '@/lib/v2/seo';

export const metadata = buildMetadata({ slug: 'agb', title: 'AGB | DJ RAPHX', description: 'Allgemeine Geschäftsbedingungen für DJ-Dienstleistungen von Raphael Taxer (DJ RAPHX).' });

// Inhalt 1:1 aus dem AGB-Modal der bestehenden Seite (DJPage.tsx).
export default function Page() {
  return (
    <LegalPage slug="agb" title="AGB">
      <p>Allgemeine Geschäftsbedingungen für DJ-Dienstleistungen von Raphael Taxer (DJ RAPHX).</p>
      <h2>1. Geltungsbereich</h2>
      <p>Diese allgemeinen Geschäftsbedingungen gelten für alle Vereinbarungen zwischen Dienstleister DJ RAPHX und Auftraggebern im Bereich musikalischer Gestaltung.</p>
      <h2>2. Vertragsabschluss</h2>
      <p>Ein Vertrag kommt durch die schriftliche Bestätigung zwischen den Auftraggebern und dem Dienstleister zustande.</p>
      <h2>3. Preise und Zahlung</h2>
      <p>Die Vergütung wird wie folgt geregelt:</p>
      <ul><li>50% Anzahlung bei Vertragsabschluss</li><li>50% Restbetrag spätestens 10 Tage nach der Veranstaltung</li></ul>
      <h2>4. Stornierung / Kündigung</h2>
      <p>Eine Stornierung ist bis spätestens 2 Wochen vor dem Veranstaltungstermin möglich.</p>
      <ul><li>Bei fristgerechter Stornierung kann die Anzahlung einbehalten werden.</li><li>Bei späterer Stornierung wird 50% des Betrags fällig.</li></ul>
      <h2>5. Leistungen des DJs</h2>
      <p>Der DJ verpflichtet sich, die vereinbarte Leistung professionell und zuverlässig durchzuführen.</p>
      <h2>6. Kosten der Leistungen</h2>
      <p>Im vereinbarten Preis sind folgende Leistungen enthalten:</p>
      <ul><li>Vorbereitung der Veranstaltung</li><li>Gesetzliche Abgaben</li><li>Steuerliche Abgaben</li><li>DJ-Dienstleistung (Auflegen)</li></ul>
      <h2>7. Ausfall / Höhere Gewalt</h2>
      <p>Bei Ausfall durch unvorhersehbare Ereignisse bemüht sich der Dienstleister um einen Ersatz.</p>
      <h2>8. Schlussbestimmungen</h2>
      <p>Es gilt österreichisches Recht. Gerichtsstand ist der Sitz des Dienstleisters.</p>
    </LegalPage>
  );
}
