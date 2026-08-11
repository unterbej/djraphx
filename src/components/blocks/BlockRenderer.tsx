import { BLOCK_REGISTRY } from '@/lib/blocks/registry';
import type { BlockRow } from '@/lib/blocks/data';

export default function BlockRenderer({ blocks }: { blocks: BlockRow[] }) {
  return (
    <>
      {blocks.filter(b => b.visible).map(b => {
        const def = BLOCK_REGISTRY[b.type];
        if (!def) return null; // unknown type — fail soft, never crash the live page
        const Component = def.Component;
        return <Component key={b.id} config={JSON.parse(b.config)} />;
      })}
    </>
  );
}
