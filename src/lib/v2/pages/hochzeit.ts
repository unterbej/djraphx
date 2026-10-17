import type { PageContent } from '../types';

export const hochzeit: PageContent = {
  slug: 'hochzeits-dj-kaernten',
  title: 'Hochzeits-DJ Kärnten buchen – Pakete & Preise | DJ RAPHX',
  description: 'Hochzeits-DJ in Kärnten: Raphael Taxer begleitet euren Tag vom Empfang bis zur Partynacht. Bis zu 8 Stunden, Technik inklusive. Jetzt Termin anfragen!',
  h1: 'Hochzeits-DJ Kärnten: Musik für euren Tag',
  kicker: 'Hochzeit · Kärnten',
  heroLine: 'Ihr heiratet, ich kümmere mich um den Sound. Vom ersten Sektglas bis zur letzten Tanzrunde.',
  breadcrumbLabel: 'Hochzeits-DJ Kärnten',
  lastmod: '2026-10-17',
  eventType: 'Hochzeit',
  ort: '',
  image: 'kopfhoerer',
  band: { image: 'regler', quote: 'Euer Tag hat viele Stimmungen. Die Musik muss jede treffen.' },
  service: {
    name: 'Hochzeits-DJ in Kärnten',
    description: 'DJ-Service für Hochzeiten in Kärnten: Musik von Empfang bis Hochzeitstanz inklusive Soundanlage, Lichttechnik, Mikrofon sowie Auf- und Abbau.',
  },
  intro: [
    'Als Hochzeits-DJ in Kärnten begleite ich euren Tag von der ersten Minute an. Ich bin Raphael Taxer (DJ RAPHX) aus Feffernitz und liefere Musik, Sound, Licht und Mikrofon. Ihr müsst euch um nichts davon kümmern und könnt euch auf das konzentrieren, was zählt: ja sagen und feiern.',
    'Eine Hochzeit hat viele Phasen. Ruhig beim Empfang, festlich beim Essen, emotional beim Hochzeitstanz, ausgelassen danach. Jede braucht eine andere Musik. Genau da setze ich an.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'ablauf',
      h2: 'So begleite ich euren Tag',
      variant: 'steps',
      blocks: [
        { h3: 'Empfang und Sektempfang', p: 'Die Gäste kommen an, gratulieren, stoßen an. Dazu läuft Musik im Hintergrund, die Stimmung macht, aber Gespräche nicht übertönt. Lieblingssongs von euch spiele ich gern ein.' },
        { h3: 'Essen, Reden, Programm', p: 'Beim Essen halte ich mich zurück. Für Reden und Spiele steht ein Mikrofon bereit, die Übergänge laufen sauber. Einspieler wie ein Lied zur Torte oder eine Diashow baue ich ein, wenn ihr mir die Dateien vorab schickt.' },
        { h3: 'Hochzeitstanz', p: 'Den Eröffnungstanz bereiten wir gemeinsam vor. Ihr nennt den Song, ich sorge für Einsatz, Schnitt und Lautstärke. Danach öffne ich die Tanzfläche behutsam.' },
        { h3: 'Party bis in die Nacht', p: 'Jetzt beobachte ich die Tanzfläche und reagiere. Das Hochzeitspaket umfasst bis zu 8 Stunden. Wird es länger, vereinbaren wir Verlängerungsstunden.' },
      ],
    },
    {
      kind: 'text',
      id: 'technik',
      h2: 'Technik, die ihr nicht bemerkt',
      variant: 'split',
      blocks: [
        { p: 'Im Hochzeitspaket sind eine professionelle Soundanlage, stimmungsvolle Lichttechnik und ein Mikrofon für Reden enthalten. Auf- und Abbau übernehme ich. Als Elektrotechniker achte ich auf sichere Installation und saubere Kabelführung.' },
        { h3: 'Passend zur Location', p: 'Ein Festsaal klingt anders als ein Gasthaus oder ein Zelt. Im Vorgespräch frage ich nach Raumgröße, Gästezahl, Stromanschlüssen und Platz fürs Pult. Wenn nötig, schaue ich mir den Raum vorher an. [TODO: Besichtigung vor Ort – kostenlos oder nach Aufwand? Bitte ergänzen]' },
        { h3: 'Licht mit Gefühl', p: 'Bei einer Hochzeit soll das Licht festlich wirken, nicht nach Disko aussehen. Zum Start bleibt es warm und ruhig. Erst auf der Tanzfläche wird es lebendig.' },
      ],
    },
    {
      kind: 'text',
      id: 'musikstil',
      h2: 'Musik für alle Generationen',
      variant: 'split',
      blocks: [
        { p: 'Oma will einen Walzer oder Schlager, die Freunde wollen Charts, und alle zusammen wollen die Klassiker, die jeder mitsingt. Mein Mix besteht aus aktuellen Hits, zeitlosen Klassikern und Partyhits.' },
        { p: 'Vorab füllt ihr eine Wunschliste aus: Was muss laufen? Was nie? Welche Songs bedeuten euch etwas? Daraus plane ich den Abend. Für spontane Wünsche der Gäste bleibt trotzdem Platz.' },
      ],
    },
    { kind: 'packages', id: 'pakete', h2: 'Das Hochzeitspaket – und Alternativen', lead: 'Für Hochzeiten empfehle ich das Hochzeitspaket. Je nach Gästezahl passen auch andere. Mehr dazu auf [DJ Kosten in Kärnten](/v2/preise).', only: ['Hochzeitspaket', 'Standardpaket', 'Premium Paket'] },
    {
      kind: 'text',
      id: 'einsatzgebiet',
      h2: 'Hochzeiten in ganz Kärnten',
      variant: 'split',
      blocks: [
        { p: 'Ich wohne in Feffernitz im Drautal und bin für Hochzeiten in ganz Kärnten buchbar. Besonders gut kenne ich den Raum Villach und Oberkärnten. Feiert ihr in einer dieser Städten, schaut auch bei [DJ in Villach](/v2/dj-villach), [DJ in Klagenfurt](/v2/dj-klagenfurt) und [DJ in Spittal an der Drau](/v2/dj-spittal-an-der-drau) vorbei.' },
        { p: 'Ob Anfahrtskosten anfallen, hängt von der Entfernung ab. [TODO: Anfahrtspauschale / Kilometergeld festlegen] Das klären wir offen im Erstgespräch, bevor ihr euch festlegt.' },
      ],
    },
    {
      kind: 'text',
      id: 'tipps',
      h2: 'Drei Tipps für die Musikplanung',
      variant: 'split',
      blocks: [
        { ul: [
          'Plant den Zeitplan vor: Wann ist das Essen, wann sind Reden, wann startet die Tanzfläche? Je klarer er ist, desto besser sitzt die Musik.',
          'Wenige Muss-Songs, den Rest dem Gespür überlassen. Eine endlose Liste nimmt dem Abend die Luft.',
          'Klärt früh, bis wann gefeiert werden darf. Lärmschutzzeiten bestimmen, wann die Party ihren Höhepunkt haben kann.',
        ] },
      ],
    },
  ],
  faq: [
    { q: 'Wie lange spielt der Hochzeits-DJ?', a: 'Das Hochzeitspaket enthält bis zu 8 Stunden. Wird die Feier länger, können Verlängerungsstunden dazugebucht werden. Sie sind nicht im Paketpreis enthalten.' },
    { q: 'Spielst du auch beim Sektempfang?', a: 'Ja. Die Begleitung reicht vom Empfang bis zum Hochzeitstanz. Bei einer Feier im Freien klären wir vorher Strom und Aufbau.' },
    { q: 'Können wir Songs wünschen und verbieten?', a: 'Beides. Ihr bekommt eine Wunschliste und könnt No-Gos angeben.' },
    { q: 'Brauchen wir extra Technik für die Reden?', a: 'Nein, ein Mikrofon für Reden und Ansagen ist im Hochzeitspaket enthalten.' },
    { q: 'Wie läuft die Zahlung?', a: 'Laut meinen AGB sind 50 % bei Vertragsabschluss fällig, der Rest spätestens 10 Tage nach der Hochzeit.' },
  ],
  related: [
    { slug: 'preise', label: 'Preise und Pakete im Überblick' },
    { slug: 'dj-villach', label: 'DJ in Villach für Hochzeit und Party' },
    { slug: 'geburtstag-dj-kaernten', label: 'DJ für Geburtstage in Kärnten' },
    { slug: 'faq', label: 'Fragen zur DJ-Buchung' },
  ],
};
