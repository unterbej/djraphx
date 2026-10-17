import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { hochzeit } from '@/lib/v2/pages/hochzeit';

export const metadata = buildMetadata(hochzeit);

export default function Page() {
  return <PageTemplate page={hochzeit} />;
}
