import Link from 'next/link';
import { Fragment } from 'react';
import { V2_INDEXABLE } from '@/lib/v2/site';

const TODO = /\s*\[TODO:[^\]]*\]/g;
const LINK_SRC = '\\[([^\\]]+)\\]\\(((?:\\/|https://)[^)]*)\\)';

// Inline-Markup: [Linktext](/pfad). [TODO: …] wird im Live-Betrieb (indexierbar) entfernt, in der Vorschau markiert.
export default function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  const source = V2_INDEXABLE ? text.replace(TODO, '') : text;
  for (const m of source.matchAll(new RegExp(LINK_SRC, 'g'))) {
    if (m.index > last) parts.push(<Todos key={`t${last}`} text={source.slice(last, m.index)} />);
    parts.push(m[2].startsWith('http')
      ? <a key={`l${m.index}`} href={m[2]}>{m[1]}</a>
      : <Link key={`l${m.index}`} href={m[2]}>{m[1]}</Link>);
    last = m.index + m[0].length;
  }
  if (last < source.length) parts.push(<Todos key={`t${last}`} text={source.slice(last)} />);
  return <>{parts}</>;
}

function Todos({ text }: { text: string }) {
  const bits = text.split(/(\[TODO:[^\]]*\])/g);
  return (
    <>
      {bits.map((b, i) =>
        b.startsWith('[TODO:') ? <mark key={i} className="v2-todo">{b}</mark> : <Fragment key={i}>{b}</Fragment>,
      )}
    </>
  );
}
