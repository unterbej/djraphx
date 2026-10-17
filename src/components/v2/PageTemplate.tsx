import Image from 'next/image';
import Link from 'next/link';
import type { Block, Faq, PageContent, SectionItem } from '@/lib/v2/types';
import { PHOTOS } from '@/lib/v2/photos';
import { href, url } from '@/lib/v2/site';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/v2/seo';
import { getPage } from '@/lib/v2/pages';
import Breadcrumbs from './Breadcrumbs';
import Calendar from './Calendar';
import CountUp from './CountUp';
import CtaBlock from './CtaBlock';
import CtaLink from './CtaLink';
import Gallery from './Gallery';
import JsonLd from './JsonLd';
import Marquee from './Marquee';
import PackageGrid from './PackageGrid';
import Parallax from './Parallax';
import Partners from './Partners';
import Reveal from './Reveal';
import RichText from './RichText';
import Socials from './Socials';
import Testimonial from './Testimonial';

const strip = (s: string) => s.replace(/\[([^\]]+)\]\((?:\/|https:\/\/)[^)]*\)/g, '$1').replace(/\s*\[TODO:[^\]]*\]/g, '');

const SLOGANS = [
  'Feiern beginnt mit der richtigen Musik',
  'Erinnerungen fürs Leben statt gewöhnlicher Abende',
  'Emotionen, die bleiben. Musik, die verbindet',
  'Mehr Stimmung. Mehr Emotion. Mehr Party',
  'Nicht einfach feiern – erleben',
];

export function crumbs(page: PageContent) {
  return page.slug === ''
    ? []
    : [{ name: 'Startseite', href: '/v2' }, { name: page.breadcrumbLabel, href: href(page.slug) }];
}

// FAQPage-Schema: auf /faq zählen auch die H3-Fragen der Abschnitte.
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

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i}>
          <span className="v2-w"><span style={{ ['--i' as string]: i }}>{w}</span></span>{' '}
        </span>
      ))}
    </>
  );
}

function Equalizer() {
  return (
    <div className="v2-eq" aria-hidden="true">
      {Array.from({ length: 28 }, (_, i) => <i key={i} style={{ ['--i' as string]: i }} />)}
    </div>
  );
}

function Figure({ image, priority, className = '' }: { image: keyof typeof PHOTOS; priority?: boolean; className?: string }) {
  const p = PHOTOS[image];
  const flat = image === 'portrait' || image === 'about';
  return (
    <figure className={`v2-fig${flat ? '' : ' v2-duo'} ${className}`}>
      <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 860px) 88vw, 480px" priority={priority} />
    </figure>
  );
}

function Band({ image, quote }: { image: keyof typeof PHOTOS; quote: string }) {
  const p = PHOTOS[image];
  return (
    <section className="v2-band" aria-label="Bildband">
      <Parallax amount={70} className="v2-band-img">
        <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="100vw" loading="lazy" />
      </Parallax>
      <Reveal variant="mask" as="p" className="v2-band-quote">{quote}</Reveal>
    </section>
  );
}

function Row({ text }: { text: string }) {
  const m = text.match(/^\[([^\]]+)\]\(([^)]+)\):?\s*(.*)$/);
  if (!m) return <li><RichText text={text} /></li>;
  return (
    <li>
      <Link href={m[2]}>
        <strong>{m[1]}</strong>
        <span>{m[3]}</span>
        <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </Link>
    </li>
  );
}

function Blocks({ blocks, variant }: { blocks: Block[]; variant?: string }) {
  if (variant === 'steps') {
    const steps = blocks.filter((b): b is Extract<Block, { h3: string }> => 'h3' in b);
    return (
      <Reveal as="ol" stagger variant="up" className="v2-steps">
        {steps.map((b) => <li key={b.h3}><h3>{b.h3}</h3><p><RichText text={b.p} /></p></li>)}
      </Reveal>
    );
  }
  return (
    <>
      {blocks.map((b, i) =>
        'ul' in b ? (
          variant === 'list'
            ? <Reveal key={i} as="ul" stagger variant="up" className="v2-rows">{b.ul.map((t) => <Row key={t} text={t} />)}</Reveal>
            : <ul key={i} className="v2-bul">{b.ul.map((t) => <li key={t}><RichText text={t} /></li>)}</ul>
        ) : 'h3' in b ? (
          <div key={i} className="v2-item"><h3>{b.h3}</h3><p><RichText text={b.p} /></p></div>
        ) : (
          <p key={i}><RichText text={b.p} /></p>
        ),
      )}
    </>
  );
}

function Section({ s, page, idx }: { s: SectionItem; page: PageContent; idx: number }) {
  if (s.kind === 'packages') {
    return (
      <section id={s.id} className="v2-sec v2-sec-pkgs" aria-labelledby={`h-${s.id}`} tabIndex={-1}>
        <div className="v2-wrap">
          <Reveal variant="left" className="v2-sec-head">
            <span className="v2-num" aria-hidden="true" />
            <h2 id={`h-${s.id}`}>{s.h2}</h2>
            <p><RichText text={s.lead} /></p>
          </Reveal>
          <PackageGrid only={s.only} eventType={page.eventType} ort={page.ort} />
        </div>
      </section>
    );
  }
  const variant = s.variant ?? (idx % 2 ? 'wide' : 'split');
  const reveal = (['up', 'left', 'right', 'mask'] as const)[idx % 4];
  return (
    <section id={s.id} className={`v2-sec v2-sec-${variant}`} aria-labelledby={`h-${s.id}`} tabIndex={-1}>
      <div className="v2-wrap v2-sec-grid">
        <Reveal variant={reveal === 'right' ? 'left' : 'left'} className="v2-sec-head">
          <span className="v2-num" aria-hidden="true" />
          <h2 id={`h-${s.id}`}>{s.h2}</h2>
        </Reveal>
        <div className="v2-sec-body">
          <Reveal variant={reveal} className="v2-prose">
            <Blocks blocks={s.blocks} variant={variant === 'steps' || variant === 'list' ? variant : undefined} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function PageTemplate({ page }: { page: PageContent }) {
  const items = crumbs(page);
  const isHome = page.template === 'home';
  const isContact = page.template === 'contact';
  const cta = (
    <CtaBlock
      eventType={page.eventType}
      ort={page.ort}
      heading={page.ort ? `DJ in ${page.ort} anfragen` : page.eventType ? `${page.breadcrumbLabel} anfragen` : 'Dein Termin?'}
    />
  );
  const faqs = schemaFaq(page);
  const bandAfter = page.band ? (isHome ? 'warum' : page.sections.filter((s) => s.kind === 'text')[1]?.id) : undefined;

  const extras: Record<string, React.ReactNode> = {};
  if (page.band && bandAfter) extras[bandAfter] = <Band image={page.band.image} quote={page.band.quote} />;
  if (isHome) {
    extras.ablauf = (<><Calendar /><Gallery /><Testimonial /><Partners /></>);
  }
  if (page.slug === 'ueber-mich') {
    extras.region = (
      <section className="v2-sec v2-sec-social" aria-labelledby="h-social">
        <div className="v2-wrap">
          <Reveal variant="up" className="v2-sec-head">
            <span className="v2-num" aria-hidden="true" />
            <h2 id="h-social">Mehr von mir</h2>
            <p>Hinter den Kulissen, Sets und Eindrücke von Veranstaltungen.</p>
          </Reveal>
          <Socials className="v2-socials-big" />
        </div>
      </section>
    );
  }
  const ablaufHead = page.template === 'contact' ? cta : null;

  return (
    <>
      {items.length > 0 && <JsonLd data={breadcrumbSchema(items.map((i) => ({ name: i.name, url: i.href === '/v2' ? url('') : url(i.href.replace('/v2/', '')) })))} />}
      <JsonLd data={serviceSchema(page)} />
      <JsonLd data={faqSchema(faqs)} />

      {items.length > 0 && <div className="v2-wrap"><Breadcrumbs items={items} /></div>}

      <section className={`v2-hero${isHome ? ' v2-hero-home' : ''}`} aria-labelledby="h-hero">
        <div className="v2-wrap v2-hero-grid">
          <div className="v2-hero-copy">
            <p className="v2-kicker">{page.kicker}</p>
            <h1 id="h-hero"><Words text={page.h1} /></h1>
            <p className="v2-heroline">{page.heroLine}</p>
            <div className="v2-hero-cta">
              <CtaLink eventType={page.eventType} ort={page.ort}>{isContact ? 'Zum Formular' : 'Jetzt anfragen'}</CtaLink>
              <Link className="v2-textlink" href="/v2/preise">Pakete &amp; Preise</Link>
            </div>
            {isHome && (
              <dl className="v2-stats">
                <div><dt>Veranstaltungen</dt><dd><CountUp value={120} suffix="+" /></dd></div>
                <div><dt>Kundenzufriedenheit</dt><dd><CountUp value={100} suffix=" %" /></dd></div>
                <div><dt>Rückmeldezeit</dt><dd><CountUp value={24} prefix="<" suffix="h" /></dd></div>
              </dl>
            )}
          </div>
          <div className="v2-hero-visual">
            <Figure image={page.image} priority className="v2-hero-fig" />
            <span className="v2-sticker" aria-hidden="true">Feffernitz<br />Kärnten</span>
            <Equalizer />
          </div>
        </div>
      </section>

      {isHome && <Marquee items={SLOGANS} />}

      <section className="v2-intro" aria-label="Einleitung">
        <div className="v2-wrap v2-intro-grid">
          <Reveal variant="mask" as="p" className="v2-intro-lead"><RichText text={page.intro[0]} /></Reveal>
          {page.intro[1] && <Reveal variant="up" as="p" className="v2-intro-sub"><RichText text={page.intro[1]} /></Reveal>}
        </div>
      </section>

      {ablaufHead}

      {page.sections.map((s, i) => (
        <div key={s.id} style={{ display: 'contents' }}>
          <Section s={s} page={page} idx={i} />
          {extras[s.id]}
        </div>
      ))}

      <section className="v2-sec v2-sec-faq" aria-labelledby="h-faq">
        <div className="v2-wrap v2-sec-grid">
          <Reveal variant="left" className="v2-sec-head">
            <span className="v2-num" aria-hidden="true" />
            <h2 id="h-faq">{page.slug === 'faq' ? 'Kurz beantwortet' : 'Häufige Fragen'}</h2>
          </Reveal>
          <div className="v2-sec-body">
            <Reveal variant="up" className="v2-faq">
              {page.faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}<i aria-hidden="true" /></summary>
                  <p><RichText text={f.a} /></p>
                </details>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="v2-sec v2-sec-more" aria-labelledby="h-weiter">
        <div className="v2-wrap v2-sec-grid">
          <Reveal variant="left" className="v2-sec-head">
            <span className="v2-num" aria-hidden="true" />
            <h2 id="h-weiter">Weiterlesen</h2>
          </Reveal>
          <div className="v2-sec-body">
            <Reveal as="ul" stagger variant="up" className="v2-rows v2-rows-sm">
              {page.related.map((r) => (
                <li key={r.slug}>
                  <Link href={href(r.slug)}>
                    <strong>{r.label}</strong>
                    <span>{getPage(r.slug).heroLine}</span>
                    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                </li>
              ))}
            </Reveal>
            <p className="v2-small v2-direct">
              Direkt zu: <Link href="/v2">DJ Kärnten Startseite</Link> · <Link href="/v2/preise">DJ Preise in Kärnten</Link> · <Link href="/v2/kontakt">DJ anfragen</Link>
            </p>
          </div>
        </div>
      </section>

      {!isContact && cta}
    </>
  );
}
