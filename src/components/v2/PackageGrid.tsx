import { PACKAGES } from '@/lib/v2/site';
import CtaLink from './CtaLink';
import Reveal from './Reveal';
import TiltCard from './TiltCard';

export default function PackageGrid({ only, eventType, ort }: { only?: string[]; eventType: string; ort: string }) {
  const list = only ? PACKAGES.filter((p) => only.includes(p.name)) : PACKAGES;
  return (
    <Reveal as="div" stagger variant="up" className={`v2-pkgs n${list.length}`}>
      {list.map((p) => (
        <TiltCard key={p.slug} className={`v2-pkg${p.popular ? ' hot' : ''}`}>
          <article>
            {p.popular && <p className="v2-pkg-flag">Für den großen Tag</p>}
            <h3>{p.name}</h3>
            <p className="v2-pkg-sub">{p.subtitle}</p>
            <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            {p.note && <p className="v2-pkg-note">{p.note}</p>}
            <CtaLink paket={p.slug} eventType={eventType} ort={ort} variant={p.popular ? 'primary' : 'ghost'} magnetic={false}>{p.name} anfragen</CtaLink>
          </article>
        </TiltCard>
      ))}
    </Reveal>
  );
}
