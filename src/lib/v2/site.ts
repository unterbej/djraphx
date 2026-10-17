export const ORIGIN = 'https://www.djraphx.at';

export const CONTACT = {
  name: 'DJ RAPHX',
  owner: 'Raphael Taxer',
  street: 'Lina-Domenig Straße 118',
  zip: '9710',
  city: 'Feffernitz',
  phoneDisplay: '+43 660 5459207',
  phoneTel: '+436605459207',
  whatsapp: 'https://wa.me/436605459207',
  email: 'dj.raphx@icloud.com',
  hours: 'Mo – Fr: 7:30 – 18:30 Uhr',
};

export const SOCIAL = [
  { label: 'Instagram', url: 'https://www.instagram.com/dj_raphx/' },
  { label: 'Facebook', url: 'https://www.facebook.com/raphael.taxer.7/' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@dj_raphx' },
];

export const AREAS = ['Kärnten', 'Villach', 'Klagenfurt', 'Spittal an der Drau'];

// Indexierung steuern: Standard noindex, erst mit NEXT_PUBLIC_V2_INDEXABLE="true" index,follow.
export const V2_INDEXABLE = process.env.NEXT_PUBLIC_V2_INDEXABLE === 'true';

export const url = (slug: string) => `${ORIGIN}/v2${slug ? `/${slug}` : ''}`;
export const href = (slug: string) => `/v2${slug ? `/${slug}` : ''}`;

// Pakete: 1:1 von der bestehenden Seite (Block "pricing-cards"). Keine Preise – auf der Seite stehen keine.
export interface Pkg {
  name: string;
  subtitle: string;
  features: string[];
  note: string;
  popular?: boolean;
}

export const PACKAGES: Pkg[] = [
  {
    name: 'Hochzeitspaket',
    subtitle: 'Perfekt für Hochzeiten — von der Trauung bis zur Partynacht',
    features: [
      'Bis zu 8 Stunden DJ Service',
      'Professionelle Soundanlage',
      'Stimmungsvolle Lichttechnik',
      'Persönliches Vorgespräch & Musikwunschliste',
      'Musikalische Begleitung von Empfang bis Hochzeitstanz',
      'Mikrofon für Reden und Ansagen',
      'Aufbau und Abbau inklusive',
    ],
    note: 'Verlängerungsstunden sind nicht im Paketpreis enthalten.',
    popular: true,
  },
  {
    name: 'Basic Paket',
    subtitle: 'Perfekt für Geburtstage und kleinere Events bis 100 Personen',
    features: [
      '4–6 Stunden DJ Service',
      'Professionelle Soundanlage',
      'Basic Lichttechnik',
      'Vorgespräch & Musikwünsche',
      'Aufbau und Abbau inklusive',
    ],
    note: 'Verlängerungsstunden sind nicht im Paketpreis enthalten.',
  },
  {
    name: 'Standardpaket',
    subtitle: 'Perfekt für Geburtstage, Firmenfeiern und Events bis 200 Personen',
    features: [
      '6–8 Stunden DJ Service',
      'Professionelle Soundanlage',
      'Moderne Lichttechnik',
      'Vorgespräch & Musikwünsche',
      'Aufbau und Abbau inklusive',
      'Mikrofon für Reden und Ansagen',
      'Persönliche Musikplanung',
    ],
    note: 'Verlängerungsstunden sind nicht im Paketpreis enthalten.',
  },
  {
    name: 'Premium Paket',
    subtitle: 'Perfekt für große Veranstaltungen ab 200 Personen',
    features: [
      'Große professionelle Soundanlage',
      'Professionelle Lichttechnik',
      'Zusammenarbeit mit Showtechnik-Partnern',
      'Vorgespräch & Musikwünsche',
      'Aufbau und Abbau inklusive',
      'Funkmikrofone',
      'Persönliche Musikplanung',
      'Nebelmaschine & Showeffekte',
    ],
    note: '',
  },
  {
    name: 'Club Paket',
    subtitle: 'Für Club-Auftritte und Nacht-Events',
    features: [
      'DJ-Service nach Anfrage',
      'Open Format',
      'Eigene Set Vorbereitung',
      'Exklusive Übergänge & Mashups',
      'Energieaufbau während des Abends',
      'Event Promotion',
    ],
    note: 'Keine eigene Technik. Nutzung der vorhandenen Clubtechnik.',
  },
];

export const NAV = [
  { slug: 'hochzeits-dj-kaernten', label: 'Hochzeit' },
  { slug: 'firmenfeier-dj-kaernten', label: 'Firmenfeier' },
  { slug: 'geburtstag-dj-kaernten', label: 'Geburtstag' },
  { slug: 'club-dj-kaernten', label: 'Club' },
  { slug: 'preise', label: 'Preise' },
  { slug: 'faq', label: 'FAQ' },
  { slug: 'ueber-mich', label: 'Über mich' },
  { slug: 'kontakt', label: 'Kontakt' },
];
