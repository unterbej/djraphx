import type { HighlightedTitle as HighlightedTitleType } from '@/lib/blocks/types';

export default function HighlightedTitle({ title }: { title: HighlightedTitleType }) {
  return (
    <>
      {title.prefix}{title.prefix && ' '}
      {title.highlight && <span className="grad-text">{title.highlight}</span>}
      {title.suffix && ' '}{title.suffix}
    </>
  );
}
