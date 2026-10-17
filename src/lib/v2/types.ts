import type { PhotoKey } from './photos';

export type Block =
  | { p: string }
  | { h3: string; p: string }
  | { ul: string[] };

// split = Überschrift links (sticky), Text rechts · steps = nummerierte Schritte · list = große Linkzeilen
export type Variant = 'split' | 'steps' | 'list' | 'wide';

export type SectionItem =
  | { kind: 'text'; id: string; h2: string; blocks: Block[]; variant?: Variant }
  | { kind: 'packages'; id: string; h2: string; lead: string; only?: string[] };

export interface Faq {
  q: string;
  a: string;
}

export interface PageContent {
  slug: string; // '' = Startseite
  title: string; // max. 60 Zeichen
  description: string; // max. 155 Zeichen
  h1: string;
  kicker: string;
  heroLine: string; // Hero-Text, max. ~25 Wörter
  intro: string[]; // SEO-Einleitung unter dem Hero, erster Absatz mit Haupt-Keyword
  sections: SectionItem[];
  faq: Faq[];
  related: { slug: string; label: string }[];
  eventType: string; // Vorbelegung Formular
  ort: string;
  service?: { name: string; description: string };
  breadcrumbLabel: string;
  lastmod: string;
  template?: 'default' | 'home' | 'contact';
  image: PhotoKey; // Hero-Foto
  band?: { image: PhotoKey; quote: string }; // breites Bildband mit einer Zeile
  noSitemap?: boolean;
}
