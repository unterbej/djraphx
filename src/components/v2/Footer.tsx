import Link from 'next/link';
import { CONTACT, SOCIAL, href } from '@/lib/v2/site';
import { PAGES } from '@/lib/v2/pages';

const orte = ['dj-villach', 'dj-klagenfurt', 'dj-spittal-an-der-drau'];
const anlaesse = ['hochzeits-dj-kaernten', 'firmenfeier-dj-kaernten', 'geburtstag-dj-kaernten', 'oeffentliche-veranstaltungen-dj-kaernten', 'club-dj-kaernten'];
const info = ['preise', 'faq', 'ueber-mich', 'kontakt'];
const label = (slug: string) => PAGES.find((p) => p.slug === slug)?.breadcrumbLabel ?? slug;

function Col({ title, slugs }: { title: string; slugs: string[] }) {
  return (
    <div>
      <h2 className="v2-foot-h">{title}</h2>
      <ul>
        {slugs.map((s) => <li key={s}><Link href={href(s)}>{label(s)}</Link></li>)}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-wrap v2-foot-grid">
        <div>
          <h2 className="v2-foot-h">DJ RAPHX</h2>
          <address>
            Raphael Taxer<br />
            {CONTACT.street}<br />
            {CONTACT.zip} {CONTACT.city}<br />
            <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a><br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </address>
          <ul className="v2-social">
            {SOCIAL.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener me">{s.label}</a></li>)}
          </ul>
        </div>
        <Col title="Anlässe" slugs={anlaesse} />
        <Col title="Orte" slugs={orte} />
        <Col title="Infos" slugs={info} />
      </div>
      <div className="v2-wrap v2-foot-bottom">
        <p>© {new Date().getFullYear()} DJ RAPHX · Raphael Taxer · Feffernitz, Kärnten</p>
        <ul>
          <li><Link href="/v2/impressum">Impressum</Link></li>
          <li><Link href="/v2/agb">AGB</Link></li>
          <li><Link href="/v2/datenschutz">Datenschutz</Link></li>
          <li><Link href="/">Zur bisherigen Website</Link></li>
        </ul>
      </div>
    </footer>
  );
}
