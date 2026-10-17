import type { PageContent } from '../types';

export const faq: PageContent = {
  slug: 'faq',
  title: 'FAQ: DJ buchen in Kärnten – Antworten | DJ RAPHX',
  description: 'Antworten auf häufige Fragen zur DJ-Buchung in Kärnten: Ablauf, Technik, Musikwünsche, Zahlung und Stornierung. Jetzt informieren und anfragen!',
  h1: 'Häufige Fragen: DJ buchen in Kärnten',
  kicker: 'FAQ',
  breadcrumbLabel: 'FAQ',
  lastmod: '2026-10-17',
  eventType: '',
  ort: '',
  intro: [
    'Du überlegst, einen DJ in Kärnten zu buchen, und hast noch Fragen? Hier beantworte ich die wichtigsten davon: zum Ablauf der Buchung, zur Technik, zu Musikwünschen, zu Zahlung und Stornierung. Wenn deine Frage fehlt, schreib mir gern direkt.',
    'Die Antworten beruhen auf meinen Paketen und meinen AGB. Für konkrete Preise und Termine fragst du bitte an, denn sie hängen von deinem Event ab.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'buchung',
      h2: 'Buchung und Ablauf',
      blocks: [
        { h3: 'Wie buche ich dich?', p: 'Über das Formular, per WhatsApp, Telefon oder E-Mail. Du nennst Datum, Anlass, Ort und Gästezahl. Danach folgen ein Kennenlern-Gespräch und die schriftliche Terminbestätigung.' },
        { h3: 'Wie schnell antwortest du?', p: 'Innerhalb von 24 Stunden. Telefonisch erreichst du mich Montag bis Freitag von 7:30 bis 18:30 Uhr.' },
        { h3: 'Woher weiß ich, ob mein Termin frei ist?', p: 'Auf der Hauptseite gibt es einen Terminkalender, in dem vergebene Tage markiert sind. Verbindlich ist die Bestätigung per Rückmeldung.' },
      ],
    },
    {
      kind: 'text',
      id: 'technik',
      h2: 'Technik und Aufbau',
      blocks: [
        { h3: 'Welche Technik bringst du mit?', p: 'Je nach Paket eine professionelle Soundanlage, Lichttechnik, Mikrofone und bei großen Events Funkmikrofone sowie Nebelmaschine und Showeffekte. Beim Club-Paket nutze ich die Technik des Clubs.' },
        { h3: 'Baust du selbst auf und ab?', p: 'Ja, Aufbau und Abbau sind in den Paketen enthalten.' },
        { h3: 'Was brauchst du von der Location?', p: 'Einen geeigneten Platz für das DJ-Pult, Strom und Zugang für den Aufbau. Die Details klären wir im Vorgespräch.' },
      ],
    },
    {
      kind: 'text',
      id: 'musik',
      h2: 'Musik und Wünsche',
      blocks: [
        { h3: 'Welche Musik spielst du?', p: 'Aktuelle Charts, Klassiker, Partyhits und auf Wunsch Schlager. Im Club spiele ich Open Format mit Mashups und eigenen Übergängen.' },
        { h3: 'Können wir Songs wünschen oder ausschließen?', p: 'Ja. Du bekommst eine Musikwunschliste und kannst No-Gos nennen.' },
        { h3: 'Nimmst du Wünsche von Gästen entgegen?', p: 'Ja, wenn sie zur Stimmung passen. Die Dramaturgie des Abends behalte ich dabei im Blick.' },
      ],
    },
    {
      kind: 'text',
      id: 'zahlung',
      h2: 'Zahlung, Stornierung und Rechtliches',
      blocks: [
        { h3: 'Wie läuft die Zahlung ab?', p: '50 % Anzahlung bei Vertragsabschluss, der Rest spätestens 10 Tage nach der Veranstaltung. Alle Details stehen in den [AGB](/v2/agb).' },
        { h3: 'Kann ich stornieren?', p: 'Ja, bis zwei Wochen vor dem Termin. Bei fristgerechter Stornierung kann die Anzahlung einbehalten werden, bei späterer Stornierung werden 50 % des Betrags fällig.' },
        { h3: 'Was passiert, wenn du ausfällst?', p: 'Bei Ausfall durch unvorhersehbare Ereignisse bemühe ich mich um einen Ersatz.' },
        { h3: 'Was kostet ein DJ?', p: 'Das hängt vom Paket ab. Eine Einordnung findest du auf [DJ Kosten in Kärnten](/v2/preise).' },
      ],
    },
    {
      kind: 'text',
      id: 'region',
      h2: 'Region und Einsatzgebiet',
      blocks: [
        { h3: 'In welchen Orten bist du unterwegs?', p: 'In ganz Kärnten. Zu [Villach](/v2/dj-villach), [Klagenfurt](/v2/dj-klagenfurt) und [Spittal an der Drau](/v2/dj-spittal-an-der-drau) gibt es eigene Seiten.' },
        { h3: 'Für welche Anlässe kann ich dich buchen?', p: 'Für Hochzeiten, Geburtstage, Firmenfeiern, öffentliche Veranstaltungen und Club-Auftritte. Die passenden Seiten sind in der Navigation verlinkt.' },
      ],
    },
  ],
  faq: [
    { q: 'Ist die Anfrage verbindlich?', a: 'Nein, die Anfrage ist unverbindlich. Verbindlich wird es erst mit der schriftlichen Bestätigung.' },
    { q: 'Wie weit im Voraus sollte ich anfragen?', a: 'So früh wie möglich, besonders bei Samstagen und Feiertagen.' },
    { q: 'Spielst du auch spontan?', a: 'Wenn der Termin frei ist, ja. Frag einfach an.' },
  ],
  related: [
    { slug: 'preise', label: 'Preise und Pakete' },
    { slug: 'hochzeits-dj-kaernten', label: 'Hochzeits-DJ in Kärnten' },
    { slug: 'ueber-mich', label: 'Über DJ Raphael Taxer' },
    { slug: 'kontakt', label: 'DJ anfragen' },
  ],
};
