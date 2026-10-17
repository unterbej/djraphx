import { PAGES } from '@/lib/v2/pages';
import { url } from '@/lib/v2/site';

const LEGAL = [
  { slug: 'impressum', lastmod: '2026-10-17' },
  { slug: 'agb', lastmod: '2026-10-17' },
  { slug: 'datenschutz', lastmod: '2026-10-17' },
];

export const dynamic = 'force-static';

export function GET() {
  const entries = [...PAGES.filter((p) => !p.noSitemap), ...LEGAL]
    .map((p) => `  <url>\n    <loc>${url(p.slug)}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
