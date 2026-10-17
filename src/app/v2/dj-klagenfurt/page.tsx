import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { klagenfurt } from '@/lib/v2/pages/klagenfurt';

export const metadata = buildMetadata(klagenfurt);

export default function Page() {
  return <PageTemplate page={klagenfurt} />;
}
