import type { PageContent } from '../types';

export const club: PageContent = {
  slug: 'club-dj-kaernten',
  title: 'Club-DJ Kärnten – Open Format & Clubnächte | DJ RAPHX',
  description: 'Club-DJ in Kärnten: DJ RAPHX spielt Open Format mit Mashups und Energieaufbau. Für Clubs, Bars & Nacht-Events. Jetzt Auftritt anfragen!',
  h1: 'Club-DJ Kärnten: Open Format und volle Tanzflächen',
  kicker: 'Club · Open Format · Kärnten',
  breadcrumbLabel: 'Club-DJ Kärnten',
  lastmod: '2026-10-17',
  eventType: 'Club-Auftritt',
  ort: '',
  service: {
    name: 'Club-DJ in Kärnten',
    description: 'DJ-Auftritte für Clubs, Bars und Nacht-Events in Kärnten: Open-Format-Sets mit eigener Set-Vorbereitung, Übergängen und Mashups.',
  },
  intro: [
    'Als Club-DJ in Kärnten bringe ich Sets mit, die Räume füllen. Ich bin Raphael Taxer, DJ RAPHX, und stehe regelmäßig im Tanzlokal Senita\'s Treff in Feffernitz am Pult. Für Clubs, Bars und Nacht-Events biete ich ein eigenes Club-Paket an, das sich von meinen Hochzeits- und Geburtstagspaketen unterscheidet.',
    'Im Club geht es um Dramaturgie: Wie startet der Abend, wann kommt der erste Peak, wie halte ich die Energie über Stunden? Das plane ich vorab für jedes Set, ohne dabei die Spontaneität zu verlieren, die eine gute Nacht ausmacht.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'ablauf',
      h2: 'Ablauf: Vom Booking bis zum Set',
      blocks: [
        { p: 'Du meldest dich mit Datum, Name des Clubs oder der Location und Art der Veranstaltung. Wir klären Spielzeit, Gage und den Rahmen: Gibt es ein Motto, ein Line-up, eine Bewerbung der Veranstaltung? Die Gage richtet sich nach Anfrage. [TODO: Gagenstruktur festlegen]' },
        { p: 'Danach bereite ich mein Set vor. Ich plane Übergänge, wähle Songs und baue Mashups, damit der Abend einen roten Faden bekommt. Am Veranstaltungstag komme ich rechtzeitig, mache einen Soundcheck an der vorhandenen Technik und stimme mich mit dem Betreiber ab.' },
      ],
    },
    {
      kind: 'text',
      id: 'technik',
      h2: 'Technik: Club-Equipment statt eigener Anlage',
      blocks: [
        { p: 'Beim Club-Paket bringe ich keine eigene Anlage mit, sondern nutze die vorhandene Clubtechnik. Das ist in Clubs üblich und spart Aufwand. Damit ich optimal vorbereitet bin, frage ich vorab nach der Ausstattung am DJ-Pult: Mixer, Player, Monitoring.' },
        { p: 'Falls es keine passende Technik gibt, können wir stattdessen eines meiner Pakete mit eigener Anlage vereinbaren. Das besprechen wir im Erstgespräch.' },
      ],
    },
    {
      kind: 'text',
      id: 'musikstil',
      h2: 'Musikstil: Open Format mit Mashups und Übergängen',
      blocks: [
        { p: 'Open Format heißt: Ich lege mich nicht auf ein Genre fest. Charts, Pop, Dance, Klassiker und Partyhits laufen im Wechsel, je nachdem, was die Tanzfläche gerade braucht. Dazu kommen exklusive Übergänge und Mashups, die ich selbst vorbereite.' },
        { h3: 'Energieaufbau über den Abend', p: 'Zu Beginn spiele ich zugänglichere Songs, um den Raum zu öffnen. Mit steigender Auslastung erhöhe ich Tempo und Intensität. Nach dem Höhepunkt gibt es Raum zum Durchatmen, bevor es in die nächste Runde geht.' },
        { h3: 'Motto-Abende', p: 'Bei Themenabenden wie einer Bravo-Hits-Party, einer Disco- und Schlagernacht oder einer Single-Party passe ich die Auswahl an. Solche Abende habe ich in Feffernitz bereits gespielt.' },
      ],
    },
    { kind: 'packages', id: 'pakete', h2: 'Das Club Paket', lead: 'Für Clubs gibt es ein eigenes Paket. Wie sich die Preise zusammensetzen, steht auf [DJ Preise in Kärnten](/v2/preise).', only: ['Club Paket'] },
    {
      kind: 'text',
      id: 'promotion',
      h2: 'Event-Promotion: Mehr Gäste für deine Nacht',
      blocks: [
        { p: 'Zum Club-Paket gehört Event Promotion. Ich bewerbe meine Auftritte über meine Social-Media-Kanäle auf Instagram, Facebook und TikTok. Wie viel Reichweite das bringt, hängt vom Anlass ab. Ich verspreche keine Besucherzahlen, aber ich teile den Termin aktiv. [TODO: Konkrete Promotion-Leistungen (Posts, Stories, Flyer-Material) benennen]' },
      ],
    },
    {
      kind: 'text',
      id: 'einsatzgebiet',
      h2: 'Einsatzgebiet',
      blocks: [
        { p: 'Mein Stammlokal ist Senita\'s Treff in Feffernitz. Darüber hinaus bin ich in ganz Kärnten buchbar. Für Orte mit eigener Seite schau bei [DJ Villach](/v2/dj-villach), [DJ Klagenfurt](/v2/dj-klagenfurt) und [DJ Spittal an der Drau](/v2/dj-spittal-an-der-drau) vorbei.' },
      ],
    },
  ],
  faq: [
    { q: 'Was bedeutet Open Format?', a: 'Ich spiele nicht nur ein Genre, sondern mische Charts, Pop, Dance, Klassiker und Partyhits – abhängig von der Stimmung im Raum.' },
    { q: 'Bringst du eigene Technik in den Club mit?', a: 'Im Club-Paket nutze ich die vorhandene Clubtechnik. Wenn nötig, können wir ein anderes Paket mit eigener Anlage vereinbaren.' },
    { q: 'Spielst du auch Motto-Partys?', a: 'Ja, zum Beispiel Bravo-Hits-, Disco- oder Schlager-Abende. Solche Formate habe ich in Feffernitz schon gespielt.' },
    { q: 'Wie viel kostet ein Club-Auftritt?', a: 'Die Gage richtet sich nach Anfrage und hängt von Spielzeit und Aufwand ab.' },
  ],
  related: [
    { slug: 'geburtstag-dj-kaernten', label: 'DJ für Geburtstage in Kärnten' },
    { slug: 'oeffentliche-veranstaltungen-dj-kaernten', label: 'DJ für Ball, Stadtfest und Vereinsfeier' },
    { slug: 'ueber-mich', label: 'Über DJ Raphael Taxer' },
    { slug: 'preise', label: 'Pakete und Preise' },
  ],
};
