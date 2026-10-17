import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { home } from '@/lib/v2/pages/home';

export const metadata = buildMetadata(home);

export default function Page() {
  return <PageTemplate page={home} />;
}
