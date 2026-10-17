import type { PageContent } from '../types';

export const home: PageContent = {
  slug: '',
  template: 'home',
  title: 'DJ Kärnten – Hochzeits-DJ & Event-DJ buchen | DJ RAPHX',
  description: 'DJ Kärnten: Raphael Taxer legt auf Hochzeiten, Firmenfeiern, Geburtstagen & im Club auf. Sound, Licht & Mikrofon inklusive. Jetzt unverbindlich anfragen!',
  h1: 'DJ Kärnten für Hochzeit, Firmenfeier & Party',
  kicker: 'DJ RAPHX · Feffernitz · Kärnten',
  heroLine: 'Ich bin Raphael. Musik, Sound und Licht kommen von mir – damit deine Gäste nicht mehr von der Tanzfläche wollen.',
  breadcrumbLabel: 'Startseite',
  lastmod: '2026-10-17',
  eventType: '',
  ort: '',
  image: 'portrait',
  band: { image: 'controllerSw', quote: 'Eine Playlist spielt Songs. Ein DJ spielt den Abend.' },
  intro: [
    'Du suchst einen DJ in Kärnten? Dann hör kurz zu: Ich bin Raphael Taxer, aufgetreten als DJ RAPHX, und wohne in Feffernitz im Drautal. Von hier aus lege ich bei Hochzeiten, Firmenfeiern, Geburtstagen, Vereinsfesten und im Club auf – überall in Kärnten.',
    'Zu jedem Anlass und zu den wichtigsten Orten gibt es unten eine eigene Seite. Dort steht, wie der Abend abläuft, welche Technik ich mitbringe und was ich spiele. Dann weißt du vor deiner Anfrage schon, was dich erwartet.',
  ],
  sections: [
    {
      kind: 'text',
      id: 'anlaesse',
      h2: 'Wofür du mich buchen kannst',
      variant: 'list',
      blocks: [
        { ul: [
          '[Hochzeits-DJ in Kärnten](/v2/hochzeits-dj-kaernten): vom Sektempfang bis zur letzten Tanzrunde.',
          '[DJ für Firmenfeiern](/v2/firmenfeier-dj-kaernten): Weihnachtsfeier, Jubiläum, Sommerfest.',
          '[DJ für Geburtstage](/v2/geburtstag-dj-kaernten): vom Wohnzimmer bis zum Saal mit 200 Gästen.',
          '[Club-DJ in Kärnten](/v2/club-dj-kaernten): Open Format, Mashups, Energie.',
          '[DJ für Ball, Stadtfest & Vereinsfeier](/v2/oeffentliche-veranstaltungen-dj-kaernten): große Gruppen, große Anlage.',
        ] },
      ],
    },
    {
      kind: 'text',
      id: 'warum',
      h2: 'Warum DJ RAPHX?',
      variant: 'split',
      blocks: [
        { h3: 'Ich höre vorher zu', p: 'Bevor du mich buchst, reden wir über Musik, Ablauf und No-Gos. Ich will wissen, was dir wichtig ist. Und was auf keinen Fall laufen darf.' },
        { h3: 'DJ und Technik aus einer Hand', p: 'Ich komme aus der Elektrotechnik. Soundanlage, Licht und Mikrofon baue ich selbst auf und betreue sie den ganzen Abend. Du hast einen Ansprechpartner, nicht fünf.' },
        { h3: 'Über 120 Veranstaltungen', p: 'So viele habe ich schon gespielt. Vom kleinen Geburtstag bis zur Clubnacht. Regelmäßig stehe ich im Tanzlokal Senita\'s Treff in Feffernitz am Pult.' },
        { h3: 'Klare Ansagen statt Kleingedrucktes', p: 'Leistungen, Ablauf und Zahlung sind vorher geklärt. 50 % Anzahlung bei Vertragsabschluss, der Rest nach der Veranstaltung. Stornieren geht bis zwei Wochen vor dem Termin.' },
      ],
    },
    { kind: 'packages', id: 'pakete', h2: 'Fünf Pakete, ein Anspruch', lead: 'Welches passt, hängt von Anlass und Gästezahl ab. Was sie unterscheidet, steht auf der Seite [DJ Kosten in Kärnten](/v2/preise).' },
    {
      kind: 'text',
      id: 'ablauf',
      h2: 'In drei Schritten zum Termin',
      variant: 'steps',
      blocks: [
        { h3: 'Anfrage schicken', p: 'Formular oder WhatsApp: Datum, Anlass, Ort, ungefähre Gästezahl. Ob dein Tag noch frei ist, siehst du im Kalender weiter unten.' },
        { h3: 'Wir telefonieren', p: 'Ich melde mich innerhalb von 24 Stunden. In einem kurzen Gespräch klären wir Musik, Ablauf und Technik. Und ob wir zusammenpassen.' },
        { h3: 'Termin fixieren', p: 'Passt alles, bestätigen wir schriftlich. Danach bekommst du die Musikwunschliste, und du kannst dich zurücklehnen.' },
      ],
    },
    {
      kind: 'text',
      id: 'einsatzgebiet',
      h2: 'Unterwegs in ganz Kärnten',
      variant: 'split',
      blocks: [
        { p: 'Mein Standort ist Feffernitz im Drautal, zwischen Villach und Spittal an der Drau. Von hier komme ich schnell nach Oberkärnten und in den Raum Villach. Auch nach Klagenfurt und darüber hinaus fahre ich gern.' },
        { ul: [
          '[DJ in Villach](/v2/dj-villach)',
          '[DJ in Klagenfurt](/v2/dj-klagenfurt)',
          '[DJ in Spittal an der Drau](/v2/dj-spittal-an-der-drau)',
        ] },
        { p: 'Feierst du woanders? Frag einfach an. Die Anfahrt klären wir im Gespräch.' },
      ],
    },
  ],
  faq: [
    { q: 'Wie früh sollte ich einen DJ in Kärnten anfragen?', a: 'So früh, wie du dein Datum kennst. Samstage in der Hochzeitssaison sind schnell weg. Kurzfristig geht trotzdem etwas, wenn der Tag frei ist.' },
    { q: 'Ist die Technik im Preis enthalten?', a: 'Ja. Bei den Paketen für Hochzeit, Geburtstag, Firmenfeier und große Veranstaltungen sind Soundanlage, Licht sowie Auf- und Abbau dabei. Im Club nutze ich die Technik des Hauses.' },
    { q: 'Wie schnell bekomme ich eine Antwort?', a: 'Innerhalb von 24 Stunden. Telefonisch erreichst du mich Montag bis Freitag von 7:30 bis 18:30 Uhr, per WhatsApp und E-Mail jederzeit.' },
    { q: 'Kann ich mir Musik wünschen?', a: 'Klar. Du bekommst eine Wunschliste und kannst No-Gos nennen. Spontane Wünsche deiner Gäste nehme ich auf, wenn sie zur Stimmung passen.' },
  ],
  related: [
    { slug: 'hochzeits-dj-kaernten', label: 'Hochzeits-DJ in Kärnten' },
    { slug: 'firmenfeier-dj-kaernten', label: 'DJ für Firmenfeiern in Kärnten' },
    { slug: 'ueber-mich', label: 'Über DJ Raphael Taxer' },
    { slug: 'faq', label: 'Fragen zur DJ-Buchung' },
  ],
};
