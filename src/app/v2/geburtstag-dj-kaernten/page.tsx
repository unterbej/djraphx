import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { geburtstag } from '@/lib/v2/pages/geburtstag';

export const metadata = buildMetadata(geburtstag);

export default function Page() {
  return <PageTemplate page={geburtstag} />;
}
