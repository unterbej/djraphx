import type { PageContent } from '../types';

export const klagenfurt: PageContent = {
  slug: 'dj-klagenfurt',
  title: 'DJ Klagenfurt buchen – Events & Feiern | DJ RAPHX',
  description: 'DJ in Klagenfurt buchen: Raphael Taxer legt auf Hochzeiten, Firmenevents und Geburtstagen auf. Sound, Licht, Mikrofon inklusive. Jetzt anfragen!',
  h1: 'DJ Klagenfurt: Events und Feiern',
  kicker: 'Klagenfurt · Kärnten',
  heroLine: 'Landeshauptstadt, großer Saal, gemischtes Publikum? Ich bringe Anlage, Licht und den richtigen Instinkt mit.',
  breadcrumbLabel: 'DJ Klagenfurt',
  lastmod: '2026-10-17',
  eventType: '',
  ort: 'Klagenfurt',
  image: 'amController',
  service: {
    name: 'DJ in Klagenfurt',
    description: 'DJ-Service für Hochzeiten, Firmenevents, Geburtstage und Feiern in Klagenfurt und Umgebung, inklusive Sound- und Lichttechnik.',
  },
  intro: [
    'Du planst eine Feier in der Landeshauptstadt und brauchst einen DJ in Klagenfurt? Ich bin Raphael Taxer, DJ RAPHX, und wohne in Feffernitz im Drautal. Für Veranstaltungen in Klagenfurt und im Zentralraum fahre ich gern die Strecke. Anlage und Aufbau kommen mit mir.',
    'Klagenfurt ist Verwaltungs-, Studenten- und Wirtschaftsstadt zugleich. Das macht die Feiern vielfältig: Hochzeiten im großen Stil, Firmenfeiern von Betrieben und Institutionen, Geburtstage im Freundeskreis. Musik und Technik stimme ich aufs jeweilige Publikum ab.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'anlaesse',
      h2: 'Anlässe in Klagenfurt',
      variant: 'split',
      blocks: [
        { h3: 'Firmenevents und Jubiläen', p: 'Viele Unternehmen, viele Betriebsfeiern. Ich sorge für Hintergrundmusik beim Empfang, Mikrofon für Ansprachen und später für Stimmung auf der Tanzfläche. Der Ablauf steht bei [DJ für Firmenfeiern in Kärnten](/v2/firmenfeier-dj-kaernten).' },
        { h3: 'Hochzeiten im Zentralraum', p: 'Für euren Tag gibt es das Hochzeitspaket mit bis zu 8 Stunden. Mehr bei [Hochzeits-DJ Kärnten](/v2/hochzeits-dj-kaernten).' },
        { h3: 'Geburtstage und Partys', p: 'Von der Wohnung bis zum Saal: Je nach Gästezahl passt Basic oder Standard. Siehe [DJ für Geburtstage in Kärnten](/v2/geburtstag-dj-kaernten).' },
      ],
    },
    {
      kind: 'text',
      id: 'ablauf',
      h2: 'So läuft eine Buchung für Klagenfurt',
      variant: 'steps',
      blocks: [
        { h3: 'Anfrage', p: 'Datum, Anlass, Location, ungefähre Gästezahl. Innerhalb von 24 Stunden bekommst du eine persönliche Antwort.' },
        { h3: 'Gespräch', p: 'Wir klären Musikwünsche, Zeitplan und technische Voraussetzungen.' },
        { h3: 'Veranstaltungstag', p: 'Weil ich nicht aus Klagenfurt anreise, plane ich mehr Puffer für Anfahrt und Aufbau ein. Ich bin rechtzeitig da, mache den Soundcheck und halte Rücksprache mit dir oder dem Veranstalter.' },
      ],
    },
    {
      kind: 'text',
      id: 'technik',
      h2: 'Sound, Licht, Mikrofon',
      variant: 'split',
      blocks: [
        { p: 'Je nach Paket bringe ich Soundanlage, Lichttechnik und Mikrofon mit. Bei größeren Veranstaltungen arbeite ich mit Showtechnik-Partnern zusammen, etwa mit Dobesch Showtechnik. Das Premium Paket enthält außerdem Funkmikrofone sowie Nebelmaschine und Showeffekte.' },
        { p: 'Für die Planung zählen Raumgröße, Strom und Aufbauzeiten. In Innenstadt-Locations sind Zufahrt und Ladezeiten oft knapp. Das besprechen wir vorab. [TODO: Beispiele für Klagenfurter Locations nur ergänzen, wenn dort schon aufgelegt wurde]' },
      ],
    },
    {
      kind: 'text',
      id: 'musikstil',
      h2: 'Musik, die zum Publikum passt',
      variant: 'split',
      blocks: [
        { p: 'Keine starre Playlist. Ich reagiere auf die Gäste: aktuelle Charts, bekannte Klassiker, Partyhits, auf Wunsch Schlager oder Open Format. Bei Firmenfeiern halte ich die Lautstärke anfangs niedrig, damit man sich unterhalten kann. Erst wenn die Tanzfläche voll wird, drehe ich auf.' },
      ],
    },
    { kind: 'packages', id: 'pakete', h2: 'Pakete für Klagenfurt', lead: 'Alle Pakete gelten auch für Klagenfurt. Preise und Hinweise zur Anfahrt stehen bei [DJ Preise in Kärnten](/v2/preise).' },
    {
      kind: 'text',
      id: 'einsatzgebiet',
      h2: 'Einsatzgebiet und Anfahrt',
      variant: 'split',
      blocks: [
        { p: 'Meine Basis ist Feffernitz. Klagenfurt liegt im östlichen Teil meines Einsatzgebiets. [TODO: Anfahrtsregelung für Klagenfurt festlegen] Bist du unsicher, ob sich der Weg lohnt, frag einfach unverbindlich an.' },
        { p: 'Näher an meinem Wohnort liegen [DJ Villach](/v2/dj-villach) und [DJ Spittal an der Drau](/v2/dj-spittal-an-der-drau). Für Clubnächte gibt es [Club-DJ Kärnten](/v2/club-dj-kaernten).' },
      ],
    },
    {
      kind: 'text',
      id: 'tipps',
      h2: 'Checkliste für deine Feier',
      variant: 'split',
      blocks: [
        { ul: [
          'Gästezahl und Raumgröße vorab nennen, damit die richtige Anlage eingeplant wird.',
          'Auf- und Abbauzeiten mit dem Veranstaltungsort abstimmen.',
          'Ansprachen und Programmpunkte in den Zeitplan schreiben.',
          'Musikwunschliste und No-Go-Liste mitschicken.',
        ] },
      ],
    },
  ],
  faq: [
    { q: 'Fährst du für Veranstaltungen nach Klagenfurt?', a: 'Ja, Klagenfurt gehört zu meinem Einsatzgebiet. Die Anfahrt besprechen wir bei der Anfrage.' },
    { q: 'Kann ich in Klagenfurt auch einen Club-DJ buchen?', a: 'Für Clubabende gibt es das Club Paket mit Open-Format-Sets. Mehr steht auf der Seite zum Club-DJ.' },
    { q: 'Wie plane ich die Technik für einen Saal?', a: 'Nenn mir Raumgröße und Gästezahl, dann schlage ich die passende Anlage vor.' },
    { q: 'Wie schnell bekomme ich ein Angebot?', a: 'Ich melde mich innerhalb von 24 Stunden persönlich.' },
  ],
  related: [
    { slug: 'firmenfeier-dj-kaernten', label: 'DJ für Firmenfeiern in Kärnten' },
    { slug: 'hochzeits-dj-kaernten', label: 'Hochzeits-DJ in Kärnten' },
    { slug: 'dj-villach', label: 'DJ in Villach' },
    { slug: 'kontakt', label: 'DJ anfragen' },
  ],
};
