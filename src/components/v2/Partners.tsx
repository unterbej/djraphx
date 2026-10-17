import Image from 'next/image';
import { PARTNERS } from '@/lib/v2/site';
import Reveal from './Reveal';

export default function Partners() {
  return (
    <section id="partner" className="v2-sec v2-sec-partners" aria-labelledby="h-partner" tabIndex={-1}>
      <div className="v2-wrap">
        <Reveal variant="left" className="v2-sec-head">
          <span className="v2-num" aria-hidden="true" />
          <h2 id="h-partner">Mit diesen Leuten arbeite ich</h2>
          <p>Wenn ein Event mehr braucht als Musik, hole ich Profis dazu.</p>
        </Reveal>
        <Reveal as="ul" stagger variant="up" className="v2-partners">
          {PARTNERS.map((p) => (
            <li key={p.name}>
              <a href={p.href} target="_blank" rel="noopener">
                <span className="v2-partner-logo">
                  <Image src={p.logo} alt={`Logo ${p.name}`} fill sizes="160px" style={{ objectFit: 'contain' }} />
                </span>
                <strong>{p.name}</strong>
                <small>{p.role}</small>
              </a>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
