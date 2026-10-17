import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { oeffentlich } from '@/lib/v2/pages/oeffentlich';

export const metadata = buildMetadata(oeffentlich);

export default function Page() {
  return <PageTemplate page={oeffentlich} />;
}
