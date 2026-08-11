import type { ServiceCardsConfig } from '@/lib/blocks/types';
import HighlightedTitle from './HighlightedTitle';

export default function ServiceCardsBlock({ config }: { config: ServiceCardsConfig }) {
  return (
    <section id="services">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{config.eyebrow}</span>
          <h2 className="sec-title"><HighlightedTitle title={config.title} /></h2>
          <p className="sec-lead">{config.lead}</p>
        </div>
        <div className="services-grid">
          {config.items.map((item, i) => (
            <article key={i} className="svc-card reveal">
              <div className={`svc-art svc-art-${item.artVariant}`}>
                <span className="svc-cat-label">{item.categoryLabel}</span>
                <div className="eq-bars" aria-hidden="true"><span/><span/><span/><span/><span/></div>
              </div>
              <div className="svc-body">
                <div className="svc-label">{String(i + 1).padStart(2, '0')} — Service</div>
                <h3 className="svc-title">{item.title}</h3>
                <p className="svc-text">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
