import type { PageContent } from '../types';

export const villach: PageContent = {
  slug: 'dj-villach',
  title: 'DJ Villach buchen – Hochzeit, Firma, Party | DJ RAPHX',
  description: 'DJ in Villach gesucht? Raphael Taxer aus Feffernitz legt bei Hochzeiten, Firmenfeiern und Partys auf. Technik inklusive. Jetzt Termin anfragen!',
  h1: 'DJ Villach: Hochzeit, Firma, Party',
  kicker: 'Villach · Drautal · Kärnten',
  heroLine: 'Ich wohne flussaufwärts im Drautal. Für Villach heißt das: kurzer Weg, volle Anlage, entspannter Aufbau.',
  breadcrumbLabel: 'DJ Villach',
  lastmod: '2026-10-17',
  eventType: '',
  ort: 'Villach',
  image: 'arme',
  service: {
    name: 'DJ in Villach',
    description: 'DJ-Service für Hochzeiten, Firmenfeiern, Geburtstage und Partys in Villach und Umgebung, inklusive Sound- und Lichttechnik.',
  },
  intro: [
    'Wenn du einen DJ in Villach suchst, habe ich einen kurzen Weg: Ich wohne in Feffernitz im Drautal. Mit Technik und Equipment bin ich schnell vor Ort und kenne die Region aus dem Alltag. Ich bin Raphael Taxer, DJ RAPHX, und lege bei Hochzeiten, Firmenfeiern, Geburtstagen und Partys auf.',
    'Villach ist die größte Stadt Oberkärntens. Entsprechend bunt wird gefeiert: Hochzeiten mit mehreren Generationen, Betriebsfeiern mit gemischter Belegschaft, Geburtstage im Gasthaus oder zu Hause. Musik und Technik stelle ich für jeden Anlass neu zusammen.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'anlaesse',
      h2: 'Was ich in Villach spiele',
      variant: 'split',
      blocks: [
        { h3: 'Hochzeiten', p: 'Vom Empfang bis zur Tanzfläche. Alles zu Ablauf und Technik steht bei [Hochzeits-DJ in Kärnten](/v2/hochzeits-dj-kaernten).' },
        { h3: 'Firmenfeiern', p: 'Weihnachtsfeier, Jubiläum, Sommerfest: Musik, Mikrofon und Licht für Betriebe aus Villach und Umgebung. Mehr unter [DJ für Firmenfeiern in Kärnten](/v2/firmenfeier-dj-kaernten).' },
        { h3: 'Geburtstage', p: 'Ob 30., 50. oder 60.: Die Musik richtet sich nach deinen Gästen. Details bei [DJ für Geburtstage in Kärnten](/v2/geburtstag-dj-kaernten).' },
      ],
    },
    {
      kind: 'text',
      id: 'ablauf',
      h2: 'Von der Anfrage bis zum letzten Song',
      variant: 'steps',
      blocks: [
        { h3: 'Du schreibst mir', p: 'Datum, Anlass, Location in Villach oder Umgebung, ungefähre Gästezahl. Innerhalb von 24 Stunden melde ich mich.' },
        { h3: 'Wir klären die Details', p: 'Im Gespräch geht es um Musik und um die Technik, die deine Location braucht.' },
        { h3: 'Ich liefere', p: 'Am Veranstaltungstag baue ich rechtzeitig auf, mache Soundcheck und bin zur vereinbarten Zeit startklar. Nach der Feier baue ich selbst wieder ab.' },
      ],
    },
    {
      kind: 'text',
      id: 'technik',
      h2: 'Technik für Villacher Locations',
      variant: 'split',
      blocks: [
        { p: 'Saal, Gasthaus, Firmenhalle oder Garten: Die Technik muss zum Raum passen. Zu jedem Paket gehört eine professionelle Soundanlage mit Licht. Für Reden kommt ein Mikrofon dazu, bei großen Veranstaltungen Funkmikrofone und Showeffekte.' },
        { p: 'Die Location kenne ich nicht immer vorab. Darum frage ich im Vorgespräch nach Raumgröße, Strom und Aufbauplatz und plane die Anlage danach. [TODO: Typische Villacher Locations nennen, nur wenn dort tatsächlich aufgelegt wurde]' },
      ],
    },
    {
      kind: 'text',
      id: 'musikstil',
      h2: 'Charts, Klassiker, Partyhits',
      variant: 'split',
      blocks: [
        { p: 'Mein Repertoire reicht von aktuellen Charts über zeitlose Klassiker bis zu Schlager und Partyhits. Bei Mottopartys wie Bravo Hits oder Disco-Nacht kann ich die Auswahl stark eingrenzen – beides habe ich in meinem Stammlokal in Feffernitz schon gespielt. Bei gemischten Gästen suche ich die Schnittmenge, die alle auf die Tanzfläche bringt.' },
      ],
    },
    { kind: 'packages', id: 'pakete', h2: 'Pakete für Villach', lead: 'Welches passt, hängt von Anlass, Gästezahl und Dauer ab. Hinweise zur Preisgestaltung findest du unter [DJ Kosten in Kärnten](/v2/preise).' },
    {
      kind: 'text',
      id: 'einsatzgebiet',
      h2: 'Anfahrt rund um Villach',
      variant: 'split',
      blocks: [
        { p: 'Feffernitz liegt im Drautal zwischen Villach und Spittal an der Drau. Für Veranstaltungen in Villach und den Nachbargemeinden ist die Anreise kurz. [TODO: Entfernung/Anfahrtsregelung für Villach bestätigen] Wer woanders feiert, findet bei [DJ in Klagenfurt](/v2/dj-klagenfurt) und [DJ in Spittal an der Drau](/v2/dj-spittal-an-der-drau) weitere Infos.' },
        { p: 'Auch Clubauftritte in der Region sind möglich. Wie das läuft, steht bei [Club-DJ in Kärnten](/v2/club-dj-kaernten).' },
      ],
    },
    {
      kind: 'text',
      id: 'region',
      h2: 'Feiern in Villach: drei Dinge vorab klären',
      variant: 'split',
      blocks: [
        { ul: [
          'Beliebte Termine im Sommer und rund um Feiertage früh sichern.',
          'Bei Feiern im Freien Strom, Überdachung und Lautstärkevorgaben der Gemeinde vorab klären.',
          'In Wohngebieten gelten Ruhezeiten. Wir planen die Spitzenzeit des Abends darauf ein.',
        ] },
      ],
    },
  ],
  faq: [
    { q: 'Wie weit ist es von Feffernitz nach Villach?', a: 'Feffernitz liegt im Drautal zwischen Villach und Spittal an der Drau. Die Anreise ist überschaubar. Fahrtkosten besprechen wir vorab.' },
    { q: 'Spielst du auch kurzfristig in Villach?', a: 'Wenn der Termin frei ist, ja. Der Kalender auf der Startseite zeigt, welche Tage vergeben sind. Oder du fragst direkt per WhatsApp.' },
    { q: 'Ist die Technik inklusive?', a: 'Ja. Bei den Paketen für Feiern sind Soundanlage, Licht sowie Auf- und Abbau dabei.' },
    { q: 'Was kostet ein DJ in Villach?', a: 'Das hängt vom Paket ab. Eine Einordnung findest du auf der Preisseite, ein konkretes Angebot bekommst du nach deiner Anfrage.' },
  ],
  related: [
    { slug: 'hochzeits-dj-kaernten', label: 'Hochzeits-DJ in Kärnten' },
    { slug: 'firmenfeier-dj-kaernten', label: 'DJ für Firmenfeiern in Kärnten' },
    { slug: 'dj-spittal-an-der-drau', label: 'DJ in Spittal an der Drau' },
    { slug: 'preise', label: 'DJ-Pakete und Preise' },
  ],
};
