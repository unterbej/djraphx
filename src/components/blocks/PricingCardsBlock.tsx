import type { PricingCardsConfig } from '@/lib/blocks/types';

export default function PricingCardsBlock({ config }: { config: PricingCardsConfig }) {
  return (
    <section id="pakete">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{config.eyebrow}</span>
          <h2 className="sec-title">{config.title}</h2>
          <p className="sec-lead">{config.lead}</p>
        </div>
        <div className="pkg-grid">
          {config.packages.map((pkg, i) => (
            <div key={i} className={`pkg-card${pkg.popular ? ' popular' : ''} reveal`}>
              {pkg.badge && <div className="pkg-badge">{pkg.badge}</div>}
              <h3 className="pkg-name">{pkg.name}</h3>
              <p className="pkg-sub">{pkg.subtitle}</p>
              <div className="pkg-divider" />
              <ul className="pkg-features">
                {pkg.features.map((f, fi) => <li key={fi}>{f}</li>)}
              </ul>
              {pkg.note && <p className="pkg-note">{pkg.note}</p>}
              <a href="#kontakt" className={`btn btn-sm ${pkg.popular ? 'btn-primary' : 'btn-ghost'}`}>{pkg.ctaLabel}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
