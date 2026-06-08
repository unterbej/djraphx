import { getCmsContent } from '@/lib/cms';
import DJPage from '@/components/DJPage';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const cms = await getCmsContent();
  return <DJPage cms={cms} />;
}
