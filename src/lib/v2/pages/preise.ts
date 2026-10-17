import type { PageContent } from '../types';

export const preise: PageContent = {
  slug: 'preise',
  title: 'DJ Kosten & Preise Kärnten – Pakete im Überblick | DJ RAPHX',
  description: 'Was kostet ein DJ in Kärnten? Pakete für Hochzeit, Geburtstag, Firma & Club im Überblick – transparent erklärt. Jetzt Angebot anfragen!',
  h1: 'DJ Kosten in Kärnten: Pakete und Preise im Überblick',
  kicker: 'Preise & Pakete',
  breadcrumbLabel: 'DJ Kosten & Preise',
  lastmod: '2026-10-17',
  eventType: '',
  ort: '',
  service: {
    name: 'DJ-Pakete von DJ RAPHX',
    description: 'Pakete für Hochzeit, Geburtstag, Firmenfeier, große Veranstaltungen und Clubauftritte in Kärnten.',
  },
  intro: [
    'Was kostet ein DJ in Kärnten? Das hängt von Anlass, Dauer, Technik und Entfernung ab. Auf dieser Seite erkläre ich, wie sich meine Pakete zusammensetzen, was sie enthalten und woran du erkennst, welches zu deiner Feier passt. Konkrete Beträge nenne ich dir nach deiner Anfrage, damit das Angebot zu deinem Event passt.',
    'Mir ist wichtig, dass du vorab weißt, wofür du bezahlst: Musik, Technik, Vorbereitung, Auf- und Abbau. Hier bekommst du eine ehrliche Einordnung ohne versteckte Posten.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'preisfaktoren',
      h2: 'Wovon der Preis eines DJs abhängt',
      blocks: [
        { ul: [
          'Dauer: Die Pakete umfassen feste Spielzeiten, etwa 4–6, 6–8 oder bis zu 8 Stunden. Verlängerungsstunden sind nicht im Paketpreis enthalten.',
          'Technik: Soundanlage, Licht und Mikrofone unterscheiden sich je nach Größe der Veranstaltung. Je größer die Veranstaltung, desto mehr Technik wird gebraucht.',
          'Vorbereitung: Persönliches Vorgespräch, Musikwunschliste und Musikplanung kosten Zeit und sind in den Paketen enthalten.',
          'Entfernung: Meine Basis ist Feffernitz. Je weiter der Weg, desto höher kann der Aufwand für Anreise sein. [TODO: Anfahrtsregelung angeben]',
        ] },
        { p: '[TODO: Echte Preise oder Preisspannen je Paket ergänzen, z. B. „ab … €“. Auf der bestehenden Seite stehen keine Preise.]' },
      ],
    },
    { kind: 'packages', id: 'pakete', h2: 'Alle Pakete im Detail', lead: 'Diese fünf Pakete biete ich an. Welches passt, hängt vor allem von Gästezahl und Anlass ab.' },
    {
      kind: 'text',
      id: 'auswahl',
      h2: 'Welches Paket passt zu welchem Anlass?',
      blocks: [
        { h3: 'Hochzeit', p: 'Für Hochzeiten gibt es das Hochzeitspaket mit bis zu 8 Stunden. Mehr dazu auf der Seite [Hochzeits-DJ Kärnten](/v2/hochzeits-dj-kaernten).' },
        { h3: 'Geburtstag und private Feier', p: 'Bis 100 Personen reicht das Basic Paket, bis 200 Personen das Standardpaket. Siehe [DJ für Geburtstage](/v2/geburtstag-dj-kaernten).' },
        { h3: 'Firmenfeier', p: 'Meist passt das Standardpaket, bei großen Betrieben das Premium Paket. Siehe [DJ für Firmenfeiern](/v2/firmenfeier-dj-kaernten).' },
        { h3: 'Große Veranstaltung', p: 'Ab 200 Personen ist das Premium Paket sinnvoll. Siehe [DJ für Ball, Stadtfest und Vereinsfeier](/v2/oeffentliche-veranstaltungen-dj-kaernten).' },
        { h3: 'Club', p: 'Für Clubs gibt es ein eigenes Paket mit Open Format. Siehe [Club-DJ Kärnten](/v2/club-dj-kaernten).' },
      ],
    },
    {
      kind: 'text',
      id: 'zahlung',
      h2: 'Zahlung und Stornierung nach AGB',
      blocks: [
        { p: 'Die wichtigsten Regeln stehen in meinen [AGB](/v2/agb). Bei Vertragsabschluss ist eine Anzahlung von 50 % fällig, der Restbetrag spätestens 10 Tage nach der Veranstaltung. Im vereinbarten Preis sind Vorbereitung der Veranstaltung, die DJ-Dienstleistung sowie gesetzliche und steuerliche Abgaben enthalten.' },
        { p: 'Eine Stornierung ist bis spätestens zwei Wochen vor dem Veranstaltungstermin möglich. Bei fristgerechter Stornierung kann die Anzahlung einbehalten werden, bei späterer Stornierung werden 50 % des Betrags fällig. Bei Ausfall durch unvorhersehbare Ereignisse bemühe ich mich um Ersatz.' },
      ],
    },
    {
      kind: 'text',
      id: 'angebot',
      h2: 'So kommst du zu einem Angebot',
      blocks: [
        { p: 'Schicke mir deine Anfrage mit Datum, Anlass, Ort und Gästezahl. Innerhalb von 24 Stunden melde ich mich bei dir, wir besprechen den Ablauf und ich erstelle ein Angebot. Die Anfrage ist unverbindlich.' },
        { p: 'Wenn du Orte vergleichst, siehe auch die Seiten [DJ Villach](/v2/dj-villach), [DJ Klagenfurt](/v2/dj-klagenfurt) und [DJ Spittal an der Drau](/v2/dj-spittal-an-der-drau).' },
      ],
    },
  ],
  faq: [
    { q: 'Was kostet ein DJ für eine Hochzeit in Kärnten?', a: 'Das hängt von Dauer, Technik und Ort ab. Das Hochzeitspaket umfasst bis zu 8 Stunden. Den konkreten Preis nenne ich dir im Angebot.' },
    { q: 'Sind Auf- und Abbau im Preis enthalten?', a: 'Ja, bei den Paketen mit eigener Technik sind Aufbau und Abbau inklusive.' },
    { q: 'Was passiert, wenn die Feier länger dauert?', a: 'Verlängerungsstunden können vereinbart werden. Sie sind nicht im Paketpreis enthalten.' },
    { q: 'Wie viel muss ich anzahlen?', a: 'Laut AGB sind es 50 % bei Vertragsabschluss.' },
    { q: 'Bis wann kann ich stornieren?', a: 'Bis zwei Wochen vor dem Termin. Details stehen in den AGB.' },
  ],
  related: [
    { slug: 'hochzeits-dj-kaernten', label: 'Hochzeits-DJ in Kärnten' },
    { slug: 'geburtstag-dj-kaernten', label: 'DJ für Geburtstage in Kärnten' },
    { slug: 'firmenfeier-dj-kaernten', label: 'DJ für Firmenfeiern in Kärnten' },
    { slug: 'faq', label: 'Häufige Fragen zur DJ-Buchung' },
  ],
};
