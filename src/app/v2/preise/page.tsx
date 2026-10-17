import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { preise } from '@/lib/v2/pages/preise';

export const metadata = buildMetadata(preise);

export default function Page() {
  return <PageTemplate page={preise} />;
}
