import type { ProcessStepsConfig } from '@/lib/blocks/types';
import HighlightedTitle from './HighlightedTitle';

export default function ProcessStepsBlock({ config }: { config: ProcessStepsConfig }) {
  return (
    <section id="buchung" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head reveal" style={{ textAlign: 'center' }}>
          <span className="eyebrow">{config.eyebrow}</span>
          <h2 className="sec-title"><HighlightedTitle title={config.title} /></h2>
        </div>
        <div className="process-steps">
          {config.steps.map((step, i) => (
            <div key={i} className="step reveal">
              <div className="step-num">{i + 1}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-body">{step.body}</p>
            </div>
          ))}
        </div>
        <div className="process-ctas reveal">
          <a href="#kontakt" className="btn btn-primary">Buche mich als DJ! <span className="arrow">→</span></a>
          <a href="https://wa.me/436605459207" className="btn btn-wa" target="_blank" rel="noopener">Über WhatsApp anfragen</a>
        </div>
      </div>
    </section>
  );
}
