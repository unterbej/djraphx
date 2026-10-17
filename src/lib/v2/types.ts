export type Block =
  | { p: string }
  | { h3: string; p: string }
  | { ul: string[] };

export interface Section {
  id: string;
  h2: string;
  blocks: Block[];
}

export interface Faq {
  q: string;
  a: string;
}

export type SectionItem =
  | ({ kind: 'text' } & Section)
  | { kind: 'packages'; id: string; h2: string; lead: string; only?: string[] };

export interface PageContent {
  slug: string; // '' = Startseite, sonst z. B. 'dj-villach'
  title: string; // max. 60 Zeichen
  description: string; // max. 155 Zeichen
  h1: string;
  kicker: string;
  intro: string[]; // erster Absatz enthält das Haupt-Keyword
  sections: SectionItem[];
  faq: Faq[];
  related: { slug: string; label: string }[]; // 3–4 thematisch passende Seiten
  eventType: string; // Vorbelegung Formular
  ort: string; // Vorbelegung Formular ('' = keiner)
  service?: { name: string; description: string }; // Service-Schema
  breadcrumbLabel: string;
  lastmod: string; // YYYY-MM-DD
  template?: 'default' | 'home' | 'contact';
  image?: { src: string; alt: string; width: number; height: number };
  noSitemap?: boolean;
}
