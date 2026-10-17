import Image from 'next/image';
import Link from 'next/link';
import type { Faq, PageContent } from '@/lib/v2/types';
import { href, url } from '@/lib/v2/site';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/v2/seo';
import { getPage } from '@/lib/v2/pages';
import Breadcrumbs from './Breadcrumbs';
import CtaBlock from './CtaBlock';
import JsonLd from './JsonLd';
import PackageGrid from './PackageGrid';
import RichText from './RichText';

const strip = (s: string) => s.replace(/\[([^\]]+)\]\(\/[^)]*\)/g, '$1').replace(/\s*\[TODO:[^\]]*\]/g, '');

export function crumbs(page: PageContent) {
  return page.slug === ''
    ? [{ name: page.breadcrumbLabel, href: '/v2' }]
    : [{ name: 'Startseite', href: '/v2' }, { name: page.breadcrumbLabel, href: href(page.slug) }];
}

// Für das FAQPage-Schema: auf /faq zählen auch die H3-Fragen der Abschnitte.
function schemaFaq(page: PageContent): Faq[] {
  const out: Faq[] = [];
  if (page.slug === 'faq') {
    for (const s of page.sections) {
      if (s.kind !== 'text') continue;
      for (const b of s.blocks) if ('h3' in b) out.push({ q: b.h3, a: strip(b.p) });
    }
  }
  return [...out, ...page.faq.map((f) => ({ q: f.q, a: strip(f.a) }))];
}

function Sections({ page }: { page: PageContent }) {
  return (
    <>
      {page.sections.map((s) =>
        s.kind === 'packages' ? (
          <section key={s.id} id={s.id} className="v2-section" aria-labelledby={`h-${s.id}`}>
            <div className="v2-wrap">
              <h2 id={`h-${s.id}`}>{s.h2}</h2>
              <p className="v2-lead"><RichText text={s.lead} /></p>
              <PackageGrid only={s.only} eventType={page.eventType} />
            </div>
          </section>
        ) : (
          <section key={s.id} id={s.id} className="v2-section" aria-labelledby={`h-${s.id}`}>
            <div className="v2-wrap v2-prose">
              <h2 id={`h-${s.id}`}>{s.h2}</h2>
              {s.blocks.map((b, i) =>
                'ul' in b ? (
                  <ul key={i}>{b.ul.map((li) => <li key={li}><RichText text={li} /></li>)}</ul>
                ) : 'h3' in b ? (
                  <div key={i}>
                    <h3>{b.h3}</h3>
                    <p><RichText text={b.p} /></p>
                  </div>
                ) : (
                  <p key={i}><RichText text={b.p} /></p>
                ),
              )}
            </div>
          </section>
        ),
      )}
    </>
  );
}

export default function PageTemplate({ page }: { page: PageContent }) {
  const items = crumbs(page);
  const isHome = page.template === 'home';
  const cta = (
    <CtaBlock
      eventType={page.eventType}
      ort={page.ort}
      heading={page.ort ? `DJ in ${page.ort} anfragen` : page.eventType ? `${page.breadcrumbLabel} anfragen` : 'Jetzt unverbindlich anfragen'}
    />
  );
  const faqs = schemaFaq(page);
  const q = [page.eventType && `eventtyp=${encodeURIComponent(page.eventType)}`, page.ort && `ort=${encodeURIComponent(page.ort)}`].filter(Boolean).join('&');

  return (
    <>
      <JsonLd data={breadcrumbSchema(items.map((i) => ({ name: i.name, url: i.href === '/v2' ? url('') : url(i.href.replace('/v2/', '')) })))} />
      <JsonLd data={serviceSchema(page)} />
      <JsonLd data={faqSchema(faqs)} />

      <div className="v2-wrap"><Breadcrumbs items={items} /></div>

      <section className="v2-section v2-hero" aria-labelledby="h-hero">
        <div className={`v2-wrap${page.image ? ' v2-hero-grid' : ''}`}>
          <div>
            <p className="v2-kicker">{page.kicker}</p>
            <h1 id="h-hero">{page.h1}</h1>
            {page.intro.map((p, i) => <p key={i} className={i === 0 ? 'v2-lead' : undefined}><RichText text={p} /></p>)}
            <p className="v2-hero-btns">
              <Link className="btn btn-primary" href={`/v2/kontakt${q ? `?${q}` : ''}#anfrage`}>Jetzt anfragen</Link>
              <Link className="btn btn-ghost" href="/v2/preise">Pakete & Preise</Link>
            </p>
          </div>
          {page.image && (
            <Image
              className="v2-hero-img"
              src={page.image.src}
              alt={page.image.alt}
              width={page.image.width}
              height={page.image.height}
              sizes="(max-width: 860px) 80vw, 420px"
              priority
            />
          )}
        </div>
      </section>

      {page.template === 'contact' && cta}

      <Sections page={page} />

      {isHome && (
        <section className="v2-section" aria-labelledby="h-stimme">
          <div className="v2-wrap v2-prose">
            <h2 id="h-stimme">Kundenstimme aus Feffernitz</h2>
            <figure className="v2-quote">
              <blockquote>
                <p>„Wir sind sehr zufrieden mit DJ Raphael Taxer (RAPHX)! Er ist unser DJ im Tanzlokal Senita&apos;s Treff in Feffernitz und sorgt jedes Mal für eine großartige Stimmung. Die Musikauswahl ist immer hervorragend und perfekt auf unsere Gäste abgestimmt. Wir empfehlen ihn sehr gerne weiter.“</p>
              </blockquote>
              <figcaption>Senita Vejzovic, Inhaberin des Lokals Senita&apos;s Treff in Feffernitz</figcaption>
            </figure>
            <p>{/* TODO: weitere echte Kundenstimmen (Hochzeit, Firma) einfügen, sobald vorhanden */}</p>
          </div>
        </section>
      )}

      <section className="v2-section" aria-labelledby="h-faq">
        <div className="v2-wrap v2-prose">
          <h2 id="h-faq">{page.slug === 'faq' ? 'Weitere kurze Antworten' : 'Häufige Fragen'}</h2>
          {page.faq.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p><RichText text={f.a} /></p>
            </div>
          ))}
        </div>
      </section>

      <section className="v2-section" aria-labelledby="h-weiter">
        <div className="v2-wrap v2-prose">
          <h2 id="h-weiter">Weiterlesen</h2>
          <ul className="v2-related">
            {page.related.map((r) => {
              const target = getPage(r.slug);
              return <li key={r.slug}><Link href={href(r.slug)}>{r.label}</Link> <span>– {target.description.split(/[.:?]/)[0]}</span></li>;
            })}
          </ul>
          <p className="v2-small">
            Direkt zu: <Link href="/v2">DJ Kärnten Startseite</Link> · <Link href="/v2/preise">DJ Preise in Kärnten</Link> · <Link href="/v2/kontakt">DJ anfragen</Link>
          </p>
        </div>
      </section>

      {page.template !== 'contact' && cta}
    </>
  );
}
