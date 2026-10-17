import type { PageContent } from '../types';

export const kontakt: PageContent = {
  slug: 'kontakt',
  template: 'contact',
  title: 'DJ anfragen – Kontakt & Termin | DJ RAPHX',
  description: 'DJ RAPHX anfragen: Formular, WhatsApp, Telefon oder E-Mail. Antwort innerhalb von 24 Stunden. Jetzt Wunschtermin für dein Event senden!',
  h1: 'DJ anfragen: Kontakt und Wunschtermin',
  kicker: 'Kontakt & Buchung',
  heroLine: 'Datum, Anlass, Ort – mehr brauche ich fürs Erste nicht. Ich melde mich innerhalb von 24 Stunden.',
  breadcrumbLabel: 'Kontakt',
  lastmod: '2026-10-17',
  eventType: '',
  ort: '',
  image: 'smartphone',
  intro: [
    'Du willst einen DJ in Kärnten anfragen? Dann bist du hier richtig. Schick mir über das Formular Wunschdatum, Anlass und Ort, oder schreib mir direkt per WhatsApp. Ich melde mich innerhalb von 24 Stunden persönlich.',
    'Je mehr ich über dein Event weiß, desto gezielter kann ich antworten. Unten steht, welche Angaben helfen, wie es danach weitergeht und wie du mich erreichst.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'angaben',
      h2: 'Diese Angaben helfen mir',
      variant: 'split',
      blocks: [
        { ul: [
          'Wunschtermin und, wenn schon bekannt, Beginn und Ende der Feier',
          'Art des Events: Hochzeit, Geburtstag, Firmenfeier, öffentliche Veranstaltung oder Club',
          'Ort und, wenn möglich, Name der Location',
          'Ungefähre Gästezahl',
          'Musikwünsche, No-Gos und Besonderheiten wie Reden, Einspieler oder Überraschungen',
        ] },
        { p: 'Du musst noch nicht alles wissen. Manches klären wir im Gespräch. Wichtig ist mir vor allem, dass ich verstehe, was für ein Abend dir vorschwebt: ruhig und festlich, ausgelassen und laut, oder irgendwo dazwischen. Mit diesem Bild im Kopf kann ich dir sofort sagen, welches Paket passt und worauf wir bei der Technik achten müssen.' },
      ],
    },
    {
      kind: 'text',
      id: 'anlaesse',
      h2: 'Wofür du anfragen kannst',
      variant: 'list',
      blocks: [
        { ul: [
          '[Hochzeits-DJ in Kärnten](/v2/hochzeits-dj-kaernten): bis zu 8 Stunden von Empfang bis Partynacht.',
          '[DJ für Geburtstage](/v2/geburtstag-dj-kaernten): Feiern bis 100 oder 200 Gäste.',
          '[DJ für Firmenfeiern](/v2/firmenfeier-dj-kaernten): Musik, Mikrofon und Licht aus einer Hand.',
          '[DJ für Ball, Stadtfest und Vereinsfeier](/v2/oeffentliche-veranstaltungen-dj-kaernten): große Anlage für große Gruppen.',
          '[Club-DJ in Kärnten](/v2/club-dj-kaernten): Open Format mit Mashups.',
        ] },
      ],
    },
    {
      kind: 'text',
      id: 'ablauf',
      h2: 'Was nach deiner Anfrage passiert',
      variant: 'steps',
      blocks: [
        { h3: 'Rückmeldung in 24 Stunden', p: 'Ich prüfe, ob dein Termin frei ist, und melde mich telefonisch oder schriftlich.' },
        { h3: 'Kennenlern-Gespräch', p: 'Wir besprechen Event, Wünsche und Vorstellungen. Gemeinsam finden wir heraus, ob ich der passende DJ bin.' },
        { h3: 'Termin fixieren', p: 'Passt alles, bestätigen wir den Termin schriftlich. Den Rest erledige ich.' },
      ],
    },
    {
      kind: 'text',
      id: 'erreichbarkeit',
      h2: 'So erreichst du mich',
      variant: 'split',
      blocks: [
        { p: 'Telefonisch bin ich Montag bis Freitag von 7:30 bis 18:30 Uhr unter +43 660 5459207 erreichbar. Schreiben kannst du jederzeit per WhatsApp oder an dj.raphx@icloud.com. Meine Adresse: DJ RAPHX, Raphael Taxer, Lina-Domenig Straße 118, 9710 Feffernitz, Österreich.' },
        { p: 'Willst du dich zuerst informieren? Dann helfen [Preise und Pakete](/v2/preise), [häufige Fragen](/v2/faq) und [Über mich](/v2/ueber-mich).' },
      ],
    },
    {
      kind: 'text',
      id: 'region',
      h2: 'Einsatzgebiet und Datenschutz',
      variant: 'split',
      blocks: [
        { p: 'Ich bin in ganz Kärnten unterwegs. Mehr zu den Städten findest du bei [DJ Villach](/v2/dj-villach), [DJ Klagenfurt](/v2/dj-klagenfurt) und [DJ Spittal an der Drau](/v2/dj-spittal-an-der-drau). Für Hochzeiten empfehle ich [Hochzeits-DJ Kärnten](/v2/hochzeits-dj-kaernten).' },
        { p: 'Mit dem Absenden des Formulars erklärst du dich mit der Verarbeitung deiner Daten zur Bearbeitung der Anfrage einverstanden. Die Datenschutzrichtlinie steht im Footer der [Hauptseite](https://www.djraphx.at/#kontakt).' },
      ],
    },
  ],
  faq: [
    { q: 'Ist die Anfrage verbindlich?', a: 'Nein. Verbindlich wird es erst mit der schriftlichen Terminbestätigung.' },
    { q: 'Wie schnell meldest du dich?', a: 'Innerhalb von 24 Stunden.' },
    { q: 'Kann ich auch per WhatsApp anfragen?', a: 'Ja. Der WhatsApp-Button öffnet direkt eine Nachricht an mich.' },
  ],
  related: [
    { slug: 'preise', label: 'Pakete und Preise' },
    { slug: 'faq', label: 'Fragen zur DJ-Buchung' },
    { slug: 'hochzeits-dj-kaernten', label: 'Hochzeits-DJ in Kärnten' },
    { slug: 'ueber-mich', label: 'Über DJ Raphael Taxer' },
  ],
};
