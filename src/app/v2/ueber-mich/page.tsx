import PageTemplate from '@/components/v2/PageTemplate';
import { buildMetadata } from '@/lib/v2/seo';
import { ueberMich } from '@/lib/v2/pages/ueber-mich';

export const metadata = buildMetadata(ueberMich);

export default function Page() {
  return <PageTemplate page={ueberMich} />;
}
