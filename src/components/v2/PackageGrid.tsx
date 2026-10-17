import Link from 'next/link';
import { PACKAGES } from '@/lib/v2/site';

export default function PackageGrid({ only, eventType }: { only?: string[]; eventType: string }) {
  const list = only ? PACKAGES.filter((p) => only.includes(p.name)) : PACKAGES;
  const q = eventType ? `?eventtyp=${encodeURIComponent(eventType)}` : '';
  return (
    <div className="v2-pkgs">
      {list.map((p) => (
        <article key={p.name} className={`v2-pkg${p.popular ? ' popular' : ''}`}>
          <h3>{p.name}</h3>
          <p className="v2-pkg-sub">{p.subtitle}</p>
          <ul>
            {p.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
          {p.note && <p className="v2-pkg-note">{p.note}</p>}
          <Link className="btn btn-ghost btn-sm" href={`/v2/kontakt${q}${q ? '&' : '?'}paket=${encodeURIComponent(p.name)}#anfrage`}>
            {p.name} anfragen
          </Link>
        </article>
      ))}
    </div>
  );
}
