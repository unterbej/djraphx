import type { QualityGridConfig } from '@/lib/blocks/types';
import { QUALITY_ICONS, type QualityIconKey } from './icons';
import HighlightedTitle from './HighlightedTitle';

export default function QualityGridBlock({ config }: { config: QualityGridConfig }) {
  return (
    <section id="qualitaeten" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">{config.eyebrow}</span>
          <h2 className="sec-title"><HighlightedTitle title={config.title} /></h2>
        </div>
        <div className="qual-grid">
          {config.items.map((item, i) => (
            <div key={i} className="qual-card reveal">
              <div className="qual-ico">{QUALITY_ICONS[item.icon as QualityIconKey] ?? null}</div>
              <h4 className="qual-title">{item.title}</h4>
              <p className="qual-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
