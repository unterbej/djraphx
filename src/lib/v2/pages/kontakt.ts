import type { PageContent } from '../types';

export const kontakt: PageContent = {
  slug: 'kontakt',
  template: 'contact',
  title: 'DJ anfragen – Kontakt & Termin | DJ RAPHX',
  description: 'DJ RAPHX anfragen: Formular, WhatsApp, Telefon oder E-Mail. Antwort innerhalb von 24 Stunden. Jetzt Wunschtermin für dein Event senden!',
  h1: 'DJ anfragen: Kontakt und Wunschtermin',
  kicker: 'Kontakt & Buchung',
  breadcrumbLabel: 'Kontakt',
  lastmod: '2026-10-17',
  eventType: '',
  ort: '',
  intro: [
    'Du möchtest einen DJ in Kärnten anfragen? Dann bist du hier richtig. Schick mir über das Formular dein Wunschdatum, den Anlass und den Ort, oder schreib mir direkt per WhatsApp. Ich melde mich innerhalb von 24 Stunden persönlich bei dir.',
    'Je mehr ich über dein Event weiß, desto gezielter kann ich antworten. Auf dieser Seite findest du, welche Angaben hilfreich sind, wie die Buchung abläuft und wie du mich erreichst.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'angaben',
      h2: 'Diese Angaben helfen mir bei deiner Anfrage',
      blocks: [
        { ul: [
          'Wunschtermin und – wenn schon bekannt – Beginn und Ende der Feier',
          'Art des Events: Hochzeit, Geburtstag, Firmenfeier, öffentliche Veranstaltung oder Club',
          'Ort und, wenn möglich, Name der Location',
          'Ungefähre Gästezahl',
          'Musikwünsche, No-Gos und Besonderheiten wie Reden, Einspieler oder Überraschungen',
        ] },
        { p: 'Du musst noch nicht alles wissen. Manches klären wir gemeinsam im Gespräch.' },
      ],
    },
    {
      kind: 'text',
      id: 'ablauf',
      h2: 'Ablauf nach deiner Anfrage',
      blocks: [
        { h3: '1. Rückmeldung innerhalb von 24 Stunden', p: 'Ich prüfe, ob dein Termin frei ist, und melde mich telefonisch oder schriftlich.' },
        { h3: '2. Kennenlern-Gespräch', p: 'Wir besprechen dein Event, deine Wünsche und Vorstellungen. Gemeinsam finden wir heraus, ob ich der passende DJ bin.' },
        { h3: '3. Termin fixieren', p: 'Passt alles, bestätigen wir den Termin schriftlich. Danach kannst du dich entspannen und dich auf dein Event freuen.' },
      ],
    },
    {
      kind: 'text',
      id: 'anlaesse',
      h2: 'Für welche Anlässe du anfragen kannst',
      blocks: [
        { p: 'Ich lege bei Hochzeiten, Geburtstagen, Firmenfeiern, öffentlichen Veranstaltungen und in Clubs auf. Wenn du dir noch nicht sicher bist, welches Paket passt, nenne mir einfach Anlass und Gästezahl. Ich empfehle dir dann die passende Variante.' },
        { ul: [
          '[Hochzeits-DJ in Kärnten](/v2/hochzeits-dj-kaernten) – bis zu 8 Stunden von Empfang bis Partynacht',
          '[DJ für Geburtstage](/v2/geburtstag-dj-kaernten) – Feiern bis 100 oder 200 Gäste',
          '[DJ für Firmenfeiern](/v2/firmenfeier-dj-kaernten) – Musik, Mikrofon und Licht aus einer Hand',
          '[DJ für Ball, Stadtfest und Vereinsfeier](/v2/oeffentliche-veranstaltungen-dj-kaernten) – große Anlage für große Gruppen',
          '[Club-DJ in Kärnten](/v2/club-dj-kaernten) – Open Format mit Mashups',
        ] },
        { p: 'Der Terminkalender auf der Hauptseite zeigt dir vorab, welche Tage bereits vergeben sind. Ein freier Tag ist allerdings erst mit meiner Bestätigung reserviert.' },
      ],
    },
    {
      kind: 'text',
      id: 'erreichbarkeit',
      h2: 'So erreichst du mich',
      blocks: [
        { p: 'Telefonisch bin ich Montag bis Freitag von 7:30 bis 18:30 Uhr unter +43 660 5459207 erreichbar. Schreiben kannst du mir jederzeit per WhatsApp oder an dj.raphx@icloud.com. Meine Adresse: DJ RAPHX, Raphael Taxer, Lina-Domenig Straße 118, 9710 Feffernitz, Österreich.' },
        { p: 'Wenn du dich erst informieren willst, helfen dir die Seiten [Preise und Pakete](/v2/preise), [häufige Fragen](/v2/faq) und [Über mich](/v2/ueber-mich).' },
      ],
    },
    {
      kind: 'text',
      id: 'region',
      h2: 'Einsatzgebiet',
      blocks: [
        { p: 'Ich bin in ganz Kärnten unterwegs. Mehr zu den Städten findest du bei [DJ Villach](/v2/dj-villach), [DJ Klagenfurt](/v2/dj-klagenfurt) und [DJ Spittal an der Drau](/v2/dj-spittal-an-der-drau). Für Hochzeiten empfehle ich die Seite [Hochzeits-DJ Kärnten](/v2/hochzeits-dj-kaernten).' },
        { p: 'Mit dem Absenden des Formulars erklärst du dich mit der Verarbeitung deiner Daten zur Bearbeitung der Anfrage einverstanden. Mehr dazu in der [Datenschutzerklärung](/v2/datenschutz).' },
      ],
    },
  ],
  faq: [
    { q: 'Ist die Anfrage verbindlich?', a: 'Nein. Die Anfrage ist unverbindlich, verbindlich wird es erst mit der schriftlichen Terminbestätigung.' },
    { q: 'Wie schnell melde ich mich?', a: 'Innerhalb von 24 Stunden.' },
    { q: 'Kann ich auch per WhatsApp anfragen?', a: 'Ja, der WhatsApp-Button führt direkt zu einer Nachricht an mich.' },
  ],
  related: [
    { slug: 'preise', label: 'Pakete und Preise' },
    { slug: 'faq', label: 'Häufige Fragen zur DJ-Buchung' },
    { slug: 'hochzeits-dj-kaernten', label: 'Hochzeits-DJ in Kärnten' },
    { slug: 'ueber-mich', label: 'Über DJ Raphael Taxer' },
  ],
};
