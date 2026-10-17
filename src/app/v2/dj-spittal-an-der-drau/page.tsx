import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { spittal } from '@/lib/v2/pages/spittal';

export const metadata = buildMetadata(spittal);

export default function Page() {
  return <PageTemplate page={spittal} />;
}
