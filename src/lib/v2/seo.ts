import type { Metadata } from 'next';
import type { PageContent } from './types';
import { AREAS, CONTACT, ORIGIN, SOCIAL, V2_INDEXABLE, url } from './site';

export function buildMetadata(page: Pick<PageContent, 'slug' | 'title' | 'description'>): Metadata {
  const canonical = url(page.slug);
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical },
    robots: V2_INDEXABLE
      ? { index: true, follow: true }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
    openGraph: {
      type: 'website',
      locale: 'de_AT',
      url: canonical,
      siteName: 'DJ RAPHX',
      title: page.title,
      description: page.description,
      images: [{ url: `${ORIGIN}/og-image.jpg`, width: 1200, height: 630, alt: 'DJ RAPHX – Professioneller DJ aus Kärnten' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [`${ORIGIN}/og-image.jpg`],
    },
  };
}

const BUSINESS_ID = `${ORIGIN}/v2#business`;

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EntertainmentBusiness'],
    '@id': BUSINESS_ID,
    name: CONTACT.name,
    url: `${ORIGIN}/v2`,
    image: `${ORIGIN}/og-image.jpg`,
    description: 'Professioneller DJ aus Kärnten für Hochzeiten, Firmenfeiern, Geburtstage, öffentliche Veranstaltungen und Club-Auftritte.',
    founder: { '@type': 'Person', name: CONTACT.owner },
    telephone: CONTACT.phoneTel,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.street,
      postalCode: CONTACT.zip,
      addressLocality: CONTACT.city,
      addressCountry: 'AT',
    },
    areaServed: AREAS.map((name) => ({ '@type': name === 'Kärnten' ? 'State' : 'City', name })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:30',
      closes: '18:30',
    },
    sameAs: SOCIAL.map((s) => s.url),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export function serviceSchema(page: PageContent) {
  if (!page.service) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.service.name,
    description: page.service.description,
    url: url(page.slug),
    serviceType: 'DJ-Service',
    provider: { '@id': BUSINESS_ID },
    areaServed: page.ort
      ? { '@type': 'City', name: page.ort }
      : { '@type': 'State', name: 'Kärnten' },
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  if (faq.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
