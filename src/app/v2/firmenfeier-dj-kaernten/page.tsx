import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { firmenfeier } from '@/lib/v2/pages/firmenfeier';

export const metadata = buildMetadata(firmenfeier);

export default function Page() {
  return <PageTemplate page={firmenfeier} />;
}
