import Link from 'next/link';
import { CONTACT, LEGAL_URL, OLD_SITE, href } from '@/lib/v2/site';
import { PAGES } from '@/lib/v2/pages';
import Socials from './Socials';

const orte = ['dj-villach', 'dj-klagenfurt', 'dj-spittal-an-der-drau'];
const anlaesse = ['hochzeits-dj-kaernten', 'firmenfeier-dj-kaernten', 'geburtstag-dj-kaernten', 'oeffentliche-veranstaltungen-dj-kaernten', 'club-dj-kaernten'];
const info = ['preise', 'faq', 'ueber-mich', 'kontakt'];
const label = (slug: string) => PAGES.find((p) => p.slug === slug)?.breadcrumbLabel ?? slug;

function Col({ title, slugs }: { title: string; slugs: string[] }) {
  return (
    <div>
      <h2 className="v2-foot-h">{title}</h2>
      <ul>{slugs.map((s) => <li key={s}><Link href={href(s)}>{label(s)}</Link></li>)}</ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-wrap">
        <p className="v2-foot-big" aria-hidden="true">RAPHX</p>
        <div className="v2-foot-grid">
          <div>
            <h2 className="v2-foot-h">DJ RAPHX</h2>
            <address>
              Raphael Taxer<br />{CONTACT.street}<br />{CONTACT.zip} {CONTACT.city}<br />
              <a href={`tel:${CONTACT.phoneTel}`}>{CONTACT.phoneDisplay}</a><br />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </address>
            <Socials />
          </div>
          <Col title="Anlässe" slugs={anlaesse} />
          <Col title="Orte" slugs={orte} />
          <Col title="Infos" slugs={info} />
        </div>
        <div className="v2-foot-bottom">
          <p>© {new Date().getFullYear()} DJ RAPHX · Raphael Taxer · Feffernitz, Kärnten</p>
          <ul>
            {/* Auf der alten Seite sind Impressum, AGB und Datenschutz Modals im Footer – es gibt keine eigenen URLs. */}
            <li><a href={LEGAL_URL}>Impressum</a></li>
            <li><a href={LEGAL_URL}>AGB</a></li>
            <li><a href={LEGAL_URL}>Datenschutz</a></li>
            <li><a href={OLD_SITE}>Zur bisherigen Website</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
