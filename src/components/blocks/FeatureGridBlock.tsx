import type { FeatureGridConfig } from '@/lib/blocks/types';
import HighlightedTitle from './HighlightedTitle';

export default function FeatureGridBlock({ config }: { config: FeatureGridConfig }) {
  return (
    <section id="features" className="why-dj">
      <div className="wrap">
        <div className="sec-head reveal" style={{textAlign:'center'}}>
          <span className="eyebrow" style={{justifyContent:'center',display:'inline-flex'}}>{config.eyebrow}</span>
          <h2 className="sec-title"><HighlightedTitle title={config.title} /></h2>
          <p className="sec-lead" style={{margin:'0 auto'}}>{config.lead}</p>
        </div>
        <div className="features-grid">
          {config.items.map((item, i) => (
            <div key={i} className="feat-card reveal">
              <div className="feat-num">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="feat-title">{item.title}</h3>
              <p className="feat-body">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="why-text reveal" style={{textAlign:'center',margin:'36px auto 0'}}>{config.closingText}</p>
        <div className="feat-ctas reveal">
          <a href="#kontakt" className="btn btn-primary">Jetzt Termin vereinbaren <span className="arrow">→</span></a>
          <a href="https://wa.me/436605459207" className="btn btn-wa" target="_blank" rel="noopener">Über WhatsApp anfragen</a>
        </div>
      </div>
    </section>
  );
}
