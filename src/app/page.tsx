import { getCmsContent } from '@/lib/cms';
import { getBlocks } from '@/lib/blocks/data';
import DJPage from '@/components/DJPage';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [cms, blocks] = await Promise.all([getCmsContent(), getBlocks('home')]);
  return <DJPage cms={cms} blocks={blocks} />;
}
