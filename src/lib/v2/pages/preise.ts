import type { PageContent } from '../types';

export const preise: PageContent = {
  slug: 'preise',
  title: 'DJ Kosten & Preise Kärnten – Pakete im Überblick | DJ RAPHX',
  description: 'Was kostet ein DJ in Kärnten? Pakete für Hochzeit, Geburtstag, Firma & Club im Überblick – transparent erklärt. Jetzt Angebot anfragen!',
  h1: 'DJ Kosten in Kärnten: Pakete im Überblick',
  kicker: 'Preise & Pakete',
  heroLine: 'Fünf Pakete, klar benannt. Was drin ist, was extra kostet und welches zu deiner Feier passt.',
  breadcrumbLabel: 'DJ Kosten & Preise',
  lastmod: '2026-10-17',
  eventType: '',
  ort: '',
  image: 'mixerSw',
  service: {
    name: 'DJ-Pakete von DJ RAPHX',
    description: 'Pakete für Hochzeit, Geburtstag, Firmenfeier, große Veranstaltungen und Clubauftritte in Kärnten.',
  },
  intro: [
    'Was kostet ein DJ in Kärnten? Das hängt von Anlass, Dauer, Technik und Entfernung ab. Hier erkläre ich, wie sich meine Pakete zusammensetzen, was sie enthalten und woran du erkennst, welches passt. Konkrete Beträge nenne ich nach deiner Anfrage, damit das Angebot zu deinem Event passt.',
    'Mir ist wichtig, dass du vorher weißt, wofür du zahlst: Musik, Technik, Vorbereitung, Auf- und Abbau. Ohne versteckte Posten.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'preisfaktoren',
      h2: 'Wovon der Preis abhängt',
      variant: 'split',
      blocks: [
        { ul: [
          'Dauer: Die Pakete haben feste Spielzeiten, etwa 4–6, 6–8 oder bis zu 8 Stunden. Verlängerungsstunden sind nicht im Paketpreis enthalten.',
          'Technik: Anlage, Licht und Mikrofone wachsen mit der Veranstaltung. Je größer, desto mehr Technik.',
          'Vorbereitung: Vorgespräch, Wunschliste und Musikplanung kosten Zeit und sind in den Paketen enthalten.',
          'Entfernung: Meine Basis ist Feffernitz. Je weiter der Weg, desto größer der Aufwand für die Anreise. [TODO: Anfahrtsregelung angeben]',
        ] },
        { p: '[TODO: Echte Preise oder Preisspannen je Paket ergänzen, z. B. „ab … €“. Auf der bestehenden Seite stehen keine Preise.]' },
      ],
    },
    { kind: 'packages', id: 'pakete', h2: 'Alle Pakete im Detail', lead: 'Welches passt, entscheiden vor allem Gästezahl und Anlass.' },
    {
      kind: 'text',
      id: 'auswahl',
      h2: 'Welches Paket für welchen Anlass?',
      variant: 'list',
      blocks: [
        { ul: [
          '[Hochzeit](/v2/hochzeits-dj-kaernten): das Hochzeitspaket, bis zu 8 Stunden.',
          '[Geburtstag](/v2/geburtstag-dj-kaernten): Basic bis 100, Standard bis 200 Personen.',
          '[Firmenfeier](/v2/firmenfeier-dj-kaernten): meist Standard, bei großen Betrieben Premium.',
          '[Große Veranstaltung](/v2/oeffentliche-veranstaltungen-dj-kaernten): ab 200 Personen das Premium Paket.',
          '[Club](/v2/club-dj-kaernten): das Club Paket mit Open Format.',
        ] },
      ],
    },
    {
      kind: 'text',
      id: 'zahlung',
      h2: 'Zahlung und Stornierung',
      variant: 'split',
      blocks: [
        { p: 'Die wichtigsten Regeln stehen in meinen [AGB](https://www.djraphx.at/#kontakt) (Footer der Hauptseite). Bei Vertragsabschluss sind 50 % Anzahlung fällig, der Rest spätestens 10 Tage nach der Veranstaltung. Im Preis enthalten sind Vorbereitung, DJ-Dienstleistung sowie gesetzliche und steuerliche Abgaben.' },
        { p: 'Stornieren kannst du bis spätestens zwei Wochen vor dem Termin. Bei fristgerechter Stornierung kann die Anzahlung einbehalten werden, bei späterer Stornierung werden 50 % des Betrags fällig. Fällt der DJ durch unvorhersehbare Ereignisse aus, bemühe ich mich um Ersatz.' },
      ],
    },
    {
      kind: 'text',
      id: 'angebot',
      h2: 'So kommst du zum Angebot',
      variant: 'split',
      blocks: [
        { p: 'Schick mir Datum, Anlass, Ort und Gästezahl. Innerhalb von 24 Stunden melde ich mich, wir besprechen den Ablauf, und ich erstelle ein Angebot. Die Anfrage ist unverbindlich.' },
        { p: 'Vergleichst du Orte? Dann schau bei [DJ Villach](/v2/dj-villach), [DJ Klagenfurt](/v2/dj-klagenfurt) und [DJ Spittal an der Drau](/v2/dj-spittal-an-der-drau) vorbei.' },
      ],
    },
  ],
  faq: [
    { q: 'Was kostet ein DJ für eine Hochzeit in Kärnten?', a: 'Das hängt von Dauer, Technik und Ort ab. Das Hochzeitspaket umfasst bis zu 8 Stunden. Den konkreten Preis nenne ich dir im Angebot.' },
    { q: 'Sind Auf- und Abbau im Preis enthalten?', a: 'Ja, bei den Paketen mit eigener Technik sind Auf- und Abbau inklusive.' },
    { q: 'Was passiert, wenn die Feier länger dauert?', a: 'Dann vereinbaren wir Verlängerungsstunden. Sie sind nicht im Paketpreis enthalten.' },
    { q: 'Wie viel muss ich anzahlen?', a: 'Laut AGB sind es 50 % bei Vertragsabschluss.' },
    { q: 'Bis wann kann ich stornieren?', a: 'Bis zwei Wochen vor dem Termin. Details stehen in den AGB.' },
  ],
  related: [
    { slug: 'hochzeits-dj-kaernten', label: 'Hochzeits-DJ in Kärnten' },
    { slug: 'geburtstag-dj-kaernten', label: 'DJ für Geburtstage in Kärnten' },
    { slug: 'firmenfeier-dj-kaernten', label: 'DJ für Firmenfeiern in Kärnten' },
    { slug: 'faq', label: 'Fragen zur DJ-Buchung' },
  ],
};
