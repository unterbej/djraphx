import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { kontakt } from '@/lib/v2/pages/kontakt';

export const metadata = buildMetadata(kontakt);

export default function Page() {
  return <PageTemplate page={kontakt} />;
}
