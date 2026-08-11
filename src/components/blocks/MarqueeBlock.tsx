import type { MarqueeConfig } from '@/lib/blocks/types';

export default function MarqueeBlock({ config }: { config: MarqueeConfig }) {
  return (
    <div className="quote-strip" aria-hidden="true">
      <div className="quote-track">
        {[0, 1].map(i => (
          <span key={i} className="quote-copy" aria-hidden={i > 0 ? 'true' : undefined}>
            {config.text}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
