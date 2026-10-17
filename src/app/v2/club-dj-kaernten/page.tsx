import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { club } from '@/lib/v2/pages/club';

export const metadata = buildMetadata(club);

export default function Page() {
  return <PageTemplate page={club} />;
}
