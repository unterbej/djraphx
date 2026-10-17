import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="v2-header">
      <div className="v2-wrap v2-header-row">
        <Link href="/v2" className="v2-brand" aria-label="DJ RAPHX – zur Startseite">
          <Image src="/v2/dj-raphx-logo.png" alt="DJ RAPHX" width={410} height={131} sizes="140px" priority />
        </Link>
        <Nav />
      </div>
    </header>
  );
}
