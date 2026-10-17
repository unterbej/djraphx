import Image from 'next/image';
import Link from 'next/link';
import { NAV, href } from '@/lib/v2/site';

// Mobiles Menü über <details> – funktioniert ohne Client-JS.
export default function Header() {
  return (
    <header className="v2-header">
      <div className="v2-wrap v2-header-row">
        <Link href="/v2" className="v2-brand" aria-label="DJ RAPHX – Startseite">
          <Image src="/v2/dj-raphx-logo.png" alt="DJ RAPHX Logo" width={160} height={51} priority />
        </Link>
        <nav aria-label="Hauptnavigation" className="v2-nav-desktop">
          <ul>
            {NAV.map((n) => <li key={n.slug}><Link href={href(n.slug)}>{n.label}</Link></li>)}
          </ul>
        </nav>
        <details className="v2-menu">
          <summary aria-label="Menü öffnen">Menü</summary>
          <nav aria-label="Mobile Navigation">
            <ul>
              <li><Link href="/v2">Startseite</Link></li>
              {NAV.map((n) => <li key={n.slug}><Link href={href(n.slug)}>{n.label}</Link></li>)}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
