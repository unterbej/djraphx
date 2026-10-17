import Breadcrumbs from './Breadcrumbs';
import JsonLd from './JsonLd';
import { breadcrumbSchema } from '@/lib/v2/seo';
import { url } from '@/lib/v2/site';

export default function LegalPage({ slug, title, children }: { slug: string; title: string; children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Startseite', url: url('') }, { name: title, url: url(slug) }])} />
      <div className="v2-wrap"><Breadcrumbs items={[{ name: 'Startseite', href: '/v2' }, { name: title, href: `/v2/${slug}` }]} /></div>
      <section className="v2-section">
        <div className="v2-wrap v2-prose">
          <h1>{title}</h1>
          {children}
        </div>
      </section>
    </>
  );
}
