import type { PageContent } from '../types';

export const faq: PageContent = {
  slug: 'faq',
  title: 'FAQ: DJ buchen in Kärnten – Antworten | DJ RAPHX',
  description: 'Antworten auf häufige Fragen zur DJ-Buchung in Kärnten: Ablauf, Technik, Musikwünsche, Zahlung und Stornierung. Jetzt informieren und anfragen!',
  h1: 'Häufige Fragen: DJ buchen in Kärnten',
  kicker: 'FAQ',
  heroLine: 'Ablauf, Technik, Musik, Zahlung. Alles, was du vor der Anfrage wissen willst, kurz beantwortet.',
  breadcrumbLabel: 'FAQ',
  lastmod: '2026-10-17',
  eventType: '',
  ort: '',
  image: 'kopfhoerer',
  intro: [
    'Du überlegst, einen DJ in Kärnten zu buchen, und hast noch Fragen? Hier beantworte ich die wichtigsten: zu Buchung, Technik, Musikwünschen, Zahlung und Stornierung. Fehlt deine Frage, schreib mir direkt.',
    'Die Antworten beruhen auf meinen Paketen und meinen AGB. Konkrete Preise und Termine bekommst du über die Anfrage, denn sie hängen von deinem Event ab.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'buchung',
      h2: 'Buchung und Ablauf',
      variant: 'split',
      blocks: [
        { h3: 'Wie buche ich dich?', p: 'Über das Formular, per WhatsApp, Telefon oder E-Mail. Du nennst Datum, Anlass, Ort und Gästezahl. Dann folgen ein Gespräch und die schriftliche Terminbestätigung.' },
        { h3: 'Wie schnell antwortest du?', p: 'Innerhalb von 24 Stunden. Telefonisch erreichst du mich Montag bis Freitag von 7:30 bis 18:30 Uhr.' },
        { h3: 'Woher weiß ich, ob mein Termin frei ist?', p: 'Auf der [Startseite](/v2#kalender) zeigt ein Kalender die vergebenen Tage. Verbindlich ist meine Bestätigung.' },
      ],
    },
    {
      kind: 'text',
      id: 'technik',
      h2: 'Technik und Aufbau',
      variant: 'split',
      blocks: [
        { h3: 'Welche Technik bringst du mit?', p: 'Je nach Paket eine professionelle Soundanlage, Lichttechnik und Mikrofone. Bei großen Events Funkmikrofone sowie Nebelmaschine und Showeffekte. Im Club nutze ich die Technik des Clubs.' },
        { h3: 'Baust du selbst auf und ab?', p: 'Ja, Auf- und Abbau sind in den Paketen enthalten.' },
        { h3: 'Was brauchst du von der Location?', p: 'Einen Platz fürs Pult, Strom und Zugang zum Aufbau. Den Rest klären wir im Vorgespräch.' },
      ],
    },
    {
      kind: 'text',
      id: 'musik',
      h2: 'Musik und Wünsche',
      variant: 'split',
      blocks: [
        { h3: 'Was spielst du?', p: 'Aktuelle Charts, Klassiker, Partyhits, auf Wunsch Schlager. Im Club Open Format mit Mashups und eigenen Übergängen.' },
        { h3: 'Können wir Songs wünschen oder ausschließen?', p: 'Ja. Du bekommst eine Wunschliste und kannst No-Gos nennen.' },
        { h3: 'Nimmst du Wünsche von Gästen auf?', p: 'Ja, wenn sie zur Stimmung passen. Den Spannungsbogen des Abends behalte ich dabei im Blick.' },
      ],
    },
    {
      kind: 'text',
      id: 'zahlung',
      h2: 'Zahlung, Stornierung, Rechtliches',
      variant: 'split',
      blocks: [
        { h3: 'Wie läuft die Zahlung?', p: '50 % Anzahlung bei Vertragsabschluss, der Rest spätestens 10 Tage nach der Veranstaltung. Alles Weitere steht in den [AGB](https://www.djraphx.at/#kontakt) im Footer der Hauptseite.' },
        { h3: 'Kann ich stornieren?', p: 'Ja, bis zwei Wochen vor dem Termin. Bei fristgerechter Stornierung kann die Anzahlung einbehalten werden, bei späterer werden 50 % des Betrags fällig.' },
        { h3: 'Was, wenn du ausfällst?', p: 'Bei Ausfall durch unvorhersehbare Ereignisse bemühe ich mich um Ersatz.' },
        { h3: 'Was kostet ein DJ?', p: 'Das hängt vom Paket ab. Eine Einordnung findest du bei [DJ Kosten in Kärnten](/v2/preise).' },
      ],
    },
    {
      kind: 'text',
      id: 'region',
      h2: 'Region und Anlässe',
      variant: 'split',
      blocks: [
        { h3: 'Wo bist du unterwegs?', p: 'In ganz Kärnten. Zu [Villach](/v2/dj-villach), [Klagenfurt](/v2/dj-klagenfurt) und [Spittal an der Drau](/v2/dj-spittal-an-der-drau) gibt es eigene Seiten.' },
        { h3: 'Für welche Anlässe kann ich dich buchen?', p: 'Für Hochzeiten, Geburtstage, Firmenfeiern, öffentliche Veranstaltungen und Club-Auftritte. Die Seiten dazu findest du in der Navigation.' },
      ],
    },
  ],
  faq: [
    { q: 'Ist die Anfrage verbindlich?', a: 'Nein. Verbindlich wird es erst mit der schriftlichen Bestätigung.' },
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
