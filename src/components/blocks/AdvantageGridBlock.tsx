import type { AdvantageGridConfig } from '@/lib/blocks/types';
import HighlightedTitle from './HighlightedTitle';

export default function AdvantageGridBlock({ config }: { config: AdvantageGridConfig }) {
  return (
    <section id="vorteile" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{config.eyebrow}</span>
          <h2 className="sec-title"><HighlightedTitle title={config.title} /></h2>
        </div>
        <div className="adv-grid">
          {config.items.map((item, i) => (
            <div key={i} className="adv-card reveal">
              <div className="adv-num">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="adv-title">{item.title}</h3>
              <p className="adv-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
