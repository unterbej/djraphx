import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { villach } from '@/lib/v2/pages/villach';

export const metadata = buildMetadata(villach);

export default function Page() {
  return <PageTemplate page={villach} />;
}
