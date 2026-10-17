import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { faq } from '@/lib/v2/pages/faq';

export const metadata = buildMetadata(faq);

export default function Page() {
  return <PageTemplate page={faq} />;
}
