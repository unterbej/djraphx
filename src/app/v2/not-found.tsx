import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="v2-section v2-hero">
      <div className="v2-wrap v2-prose">
        <p className="v2-kicker">Fehler 404</p>
        <h1>Diese Seite gibt es nicht</h1>
        <p>Die gesuchte Seite wurde verschoben oder existiert nicht. Hier geht es weiter:</p>
        <ul>
          <li><Link href="/v2">Zur Startseite von DJ RAPHX</Link></li>
          <li><Link href="/v2/preise">DJ Kosten und Pakete in Kärnten</Link></li>
          <li><Link href="/v2/kontakt">DJ anfragen</Link></li>
        </ul>
      </div>
    </section>
  );
}
