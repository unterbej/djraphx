import type { PageContent } from '../types';

export const club: PageContent = {
  slug: 'club-dj-kaernten',
  title: 'Club-DJ Kärnten – Open Format & Clubnächte | DJ RAPHX',
  description: 'Club-DJ in Kärnten: DJ RAPHX spielt Open Format mit Mashups und Energieaufbau. Für Clubs, Bars & Nacht-Events. Jetzt Auftritt anfragen!',
  h1: 'Club-DJ Kärnten: Open Format, volle Tanzfläche',
  kicker: 'Club · Open Format · Kärnten',
  heroLine: 'Wenn der erste Beat sitzt, beginnt die Nacht erst richtig. Sets, die aufbauen. Übergänge, die man nicht hört.',
  breadcrumbLabel: 'Club-DJ Kärnten',
  lastmod: '2026-10-17',
  eventType: 'Club-Auftritt',
  ort: '',
  image: 'mixerSw',
  band: { image: 'tattooSw', quote: 'Ein guter Abend hat einen Spannungsbogen.' },
  service: {
    name: 'Club-DJ in Kärnten',
    description: 'DJ-Auftritte für Clubs, Bars und Nacht-Events in Kärnten: Open-Format-Sets mit eigener Set-Vorbereitung, Übergängen und Mashups.',
  },
  intro: [
    'Als Club-DJ in Kärnten bringe ich Sets mit, die Räume füllen. Ich bin Raphael Taxer, DJ RAPHX, und stehe regelmäßig im Tanzlokal Senita\'s Treff in Feffernitz am Pult. Für Clubs, Bars und Nacht-Events gibt es ein eigenes Club Paket. Es unterscheidet sich klar von meinen Hochzeits- und Geburtstagspaketen.',
    'Im Club geht es um Dramaturgie: Wie startet der Abend? Wann kommt der erste Peak? Wie halte ich die Energie über Stunden? Das plane ich vorab für jedes Set. Und lasse trotzdem Platz für den Moment, der eine Nacht ausmacht.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'ablauf',
      h2: 'Vom Booking bis zum Set',
      variant: 'steps',
      blocks: [
        { h3: 'Du meldest dich', p: 'Mit Datum, Name des Clubs oder der Location und Art des Abends. Wir klären Spielzeit, Gage und Rahmen: Motto, Line-up, Bewerbung. Die Gage richtet sich nach Anfrage. [TODO: Gagenstruktur festlegen]' },
        { h3: 'Ich bereite vor', p: 'Ich plane Übergänge, wähle Songs und baue Mashups, damit der Abend einen roten Faden bekommt.' },
        { h3: 'Ich lege auf', p: 'Ich komme rechtzeitig, mache Soundcheck an der vorhandenen Technik und stimme mich mit dem Betreiber ab.' },
      ],
    },
    {
      kind: 'text',
      id: 'technik',
      h2: 'Club-Equipment statt eigener Anlage',
      variant: 'split',
      blocks: [
        { p: 'Beim Club Paket bringe ich keine eigene Anlage mit, sondern nutze die Technik des Clubs. Das ist üblich und spart Aufwand. Damit ich gut vorbereitet bin, frage ich vorab nach der Ausstattung am Pult: Mixer, Player, Monitoring.' },
        { p: 'Gibt es keine passende Technik, vereinbaren wir stattdessen eines meiner Pakete mit eigener Anlage. Das klären wir im Erstgespräch.' },
      ],
    },
    {
      kind: 'text',
      id: 'musikstil',
      h2: 'Open Format: Mashups und Übergänge',
      variant: 'split',
      blocks: [
        { p: 'Open Format heißt: Ich lege mich nicht auf ein Genre fest. Charts, Pop, Dance, Klassiker und Partyhits wechseln sich ab, je nachdem, was die Tanzfläche braucht. Dazu kommen Übergänge und Mashups, die ich selbst vorbereite.' },
        { h3: 'Energie über den Abend', p: 'Am Anfang spiele ich zugänglichere Songs und öffne den Raum. Mit voller Fläche steigere ich Tempo und Intensität. Nach dem Höhepunkt gibt es Luft zum Atmen, bevor die nächste Runde startet.' },
        { h3: 'Motto-Abende', p: 'Bravo Hits, Disco- und Schlagernacht, Single-Party: Bei Themenabenden passe ich die Auswahl an. Solche Abende habe ich in Feffernitz schon gespielt.' },
      ],
    },
    { kind: 'packages', id: 'pakete', h2: 'Das Club Paket', lead: 'Für Clubs gibt es ein eigenes Paket. Wie sich Preise zusammensetzen, steht bei [DJ Preise in Kärnten](/v2/preise).', only: ['Club Paket'] },
    {
      kind: 'text',
      id: 'promotion',
      h2: 'Event-Promotion für deine Nacht',
      variant: 'split',
      blocks: [
        { p: 'Zum Club Paket gehört Event Promotion. Ich teile meine Auftritte über Instagram, Facebook und TikTok. Wie viel Reichweite das bringt, hängt vom Anlass ab. Besucherzahlen verspreche ich nicht, aber ich bewerbe den Termin aktiv. [TODO: Konkrete Promotion-Leistungen (Posts, Stories, Flyer-Material) benennen]' },
      ],
    },
    {
      kind: 'text',
      id: 'einsatzgebiet',
      h2: 'Einsatzgebiet',
      variant: 'split',
      blocks: [
        { p: 'Mein Stammlokal ist Senita\'s Treff in Feffernitz. Darüber hinaus bin ich in ganz Kärnten buchbar. Für einzelne Orte schau bei [DJ Villach](/v2/dj-villach), [DJ Klagenfurt](/v2/dj-klagenfurt) und [DJ Spittal an der Drau](/v2/dj-spittal-an-der-drau) vorbei.' },
      ],
    },
  ],
  faq: [
    { q: 'Was bedeutet Open Format?', a: 'Ich spiele nicht nur ein Genre, sondern mische Charts, Pop, Dance, Klassiker und Partyhits – je nach Stimmung im Raum.' },
    { q: 'Bringst du eigene Technik in den Club mit?', a: 'Im Club Paket nutze ich die vorhandene Clubtechnik. Wenn nötig, vereinbaren wir ein anderes Paket mit eigener Anlage.' },
    { q: 'Spielst du auch Motto-Partys?', a: 'Ja, zum Beispiel Bravo Hits, Disco oder Schlager. Solche Formate habe ich in Feffernitz schon gespielt.' },
    { q: 'Wie viel kostet ein Club-Auftritt?', a: 'Die Gage richtet sich nach Anfrage und hängt von Spielzeit und Aufwand ab.' },
  ],
  related: [
    { slug: 'geburtstag-dj-kaernten', label: 'DJ für Geburtstage in Kärnten' },
    { slug: 'oeffentliche-veranstaltungen-dj-kaernten', label: 'DJ für Ball, Stadtfest und Vereinsfeier' },
    { slug: 'ueber-mich', label: 'Über DJ Raphael Taxer' },
    { slug: 'preise', label: 'Pakete und Preise' },
  ],
};
