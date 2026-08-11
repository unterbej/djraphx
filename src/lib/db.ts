import { createClient, type Client } from '@libsql/client';
import path from 'path';

let client: Client | null = null;
let initialized = false;

export function getDb(): Client {
  if (!client) {
    const tursoUrl = process.env.TURSO_DATABASE_URL;
    const tursoToken = process.env.TURSO_AUTH_TOKEN;
    if (tursoUrl && tursoToken) {
      client = createClient({ url: tursoUrl, authToken: tursoToken });
    } else {
      // local dev: file-based SQLite
      const fs = require('fs');
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      client = createClient({ url: `file:${path.join(dataDir, 'djraphx.db')}` });
    }
  }
  return client;
}

export async function ensureInit(): Promise<void> {
  if (initialized) return;
  initialized = true;
  const db = getDb();

  await db.execute(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    event_date TEXT NOT NULL,
    event_type TEXT NOT NULL,
    message TEXT DEFAULT '',
    status TEXT DEFAULT 'new',
    created_at TEXT DEFAULT (datetime('now')),
    notes TEXT DEFAULT ''
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS calendar_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS cms_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL,
    updated_at TEXT DEFAULT (datetime('now'))
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS admin_sessions (
    id TEXT PRIMARY KEY,
    created_at TEXT DEFAULT (datetime('now')),
    expires_at TEXT NOT NULL
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    caption TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    data BLOB
  )`);

  // Migration for tables created before the blob column existed
  try {
    await db.execute(`ALTER TABLE gallery ADD COLUMN data BLOB`);
  } catch {
    // column already exists
  }

  await db.execute(`CREATE TABLE IF NOT EXISTS blocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page TEXT NOT NULL DEFAULT 'home',
    type TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    visible INTEGER NOT NULL DEFAULT 1,
    locked INTEGER NOT NULL DEFAULT 0,
    config TEXT NOT NULL DEFAULT '{}',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL UNIQUE,
    width INTEGER,
    height INTEGER,
    bytes INTEGER,
    alt TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    data BLOB NOT NULL
  )`);

  // Seed the hero, marquee, and feature-grid blocks reproducing today's hardcoded content, once.
  const existingHero = await db.execute(`SELECT COUNT(*) as cnt FROM blocks WHERE page = 'home' AND type = 'hero'`);
  if ((existingHero.rows[0][0] as number) === 0) {
    const heroConfig = {
      eyebrow: 'DJ · Kärnten · Österreich',
      title: 'Dein DJ für stilvolle & unvergessliche Events',
      subtitle: 'Professioneller DJ für Hochzeiten, Geburtstage, Firmenevents, Öffentliche Veranstaltungen und Club-Auftritte — in Kärnten und Umgebung.',
      quote: '"Unvergessliche Nächte, beste Unterhaltung und volle Tanzflächen garantiert."',
      statEvents: '120+',
      statSatisfaction: '100%',
      statResponse: '<24h',
      image: '/portrait-hero.png',
      imageAlt: 'DJ RAPHX mit Kopfhörern',
      imageBadge: 'DJ RAPHX · Kärnten',
    };
    await db.execute({
      sql: `INSERT INTO blocks (page, type, sort_order, visible, locked, config) VALUES ('home', 'hero', 0, 1, 1, ?)`,
      args: [JSON.stringify(heroConfig)],
    });
  }

  const existingMarquee = await db.execute(`SELECT COUNT(*) as cnt FROM blocks WHERE page = 'home' AND type = 'marquee'`);
  if ((existingMarquee.rows[0][0] as number) === 0) {
    const marqueeConfig = {
      text: 'Feiern beginnt mit der richtigen Musik · Erinnerungen fürs Leben statt gewöhnlicher Abende · Emotionen, die bleiben. Musik, die verbindet · Mehr Stimmung. Mehr Emotion. Mehr Party · Nicht einfach feiern – erleben · Eure Nacht. Eure Musik. Eure Erinnerungen ·',
    };
    await db.execute({
      sql: `INSERT INTO blocks (page, type, sort_order, visible, locked, config) VALUES ('home', 'marquee', 1, 1, 0, ?)`,
      args: [JSON.stringify(marqueeConfig)],
    });
  }

  const existingFeatures = await db.execute(`SELECT COUNT(*) as cnt FROM blocks WHERE page = 'home' AND type = 'feature-grid'`);
  if ((existingFeatures.rows[0][0] as number) === 0) {
    const featureConfig = {
      eyebrow: 'Warum du DJ RAPHX buchen solltest?',
      title: { prefix: 'Weil deine Feier keine', highlight: 'Standard-Playlist', suffix: 'verdient.' },
      lead: 'Ich spiele nicht einfach Songs ab. Ich beobachte die Tanzfläche, gehe auf deine Gäste ein und passe die Musik genau an die Stimmung des Abends an.',
      items: [
        { title: 'Persönlich statt 08/15', body: 'Vor deinem Event sprechen wir über Musik, Ablauf, Wünsche und No-Gos. So weiß ich schon vor dem ersten Song, was dir wichtig ist.' },
        { title: 'DJ & Technik aus einer Hand', body: 'Durch meinen technischen Background bekommst du nicht nur Musik, sondern auch zuverlässigen Sound, Licht und einen professionellen Aufbau.' },
        { title: 'Entspannt feiern', body: 'Klare Absprachen, zuverlässige Vorbereitung und ein DJ, der den Abend im Blick behält, damit du deine eigene Feier genießen kannst.' },
      ],
      closingText: 'Am Ende zählt nur eines: Eine volle Tanzfläche, glückliche Gäste und ein Abend, an den man sich gerne erinnert.',
    };
    await db.execute({
      sql: `INSERT INTO blocks (page, type, sort_order, visible, locked, config) VALUES ('home', 'feature-grid', 2, 1, 0, ?)`,
      args: [JSON.stringify(featureConfig)],
    });
  }

  // Seed the pricing-cards block reproducing today's hardcoded packages, once.
  const existingBlocks = await db.execute(`SELECT COUNT(*) as cnt FROM blocks WHERE page = 'home' AND type = 'pricing-cards'`);
  if ((existingBlocks.rows[0][0] as number) === 0) {
    const pricingConfig = {
      eyebrow: 'Meine DJ-Angebote',
      title: 'Das passende Paket für dich',
      lead: 'Von der Hochzeit bis zur großen öffentlichen Veranstaltung — transparent und fair.',
      packages: [
        {
          badge: '💍 Für euren großen Tag',
          name: 'Hochzeitspaket',
          subtitle: 'Perfekt für Hochzeiten — von der Trauung bis zur Partynacht',
          features: [
            'Bis zu 8 Stunden DJ Service',
            'Professionelle Soundanlage',
            'Stimmungsvolle Lichttechnik',
            'Persönliches Vorgespräch & Musikwunschliste',
            'Musikalische Begleitung von Empfang bis Hochzeitstanz',
            'Mikrofon für Reden und Ansagen',
            'Aufbau und Abbau inklusive',
          ],
          note: 'Verlängerungsstunden sind nicht im Paketpreis enthalten.',
          popular: true,
          ctaLabel: 'Jetzt anfragen',
        },
        {
          badge: '',
          name: 'Basic Paket',
          subtitle: 'Perfekt für Geburtstage und kleinere Events bis 100 Personen',
          features: [
            '4–6 Stunden DJ Service',
            'Professionelle Soundanlage',
            'Basic Lichttechnik',
            'Vorgespräch & Musikwünsche',
            'Aufbau und Abbau inklusive',
          ],
          note: 'Verlängerungsstunden sind nicht im Paketpreis enthalten.',
          popular: false,
          ctaLabel: 'Jetzt anfragen',
        },
        {
          badge: '',
          name: 'Standardpaket',
          subtitle: 'Perfekt für Geburtstage, Firmenfeiern und Events bis 200 Personen',
          features: [
            '6–8 Stunden DJ Service',
            'Professionelle Soundanlage',
            'Moderne Lichttechnik',
            'Vorgespräch & Musikwünsche',
            'Aufbau und Abbau inklusive',
            'Mikrofon für Reden und Ansagen',
            'Persönliche Musikplanung',
          ],
          note: 'Verlängerungsstunden sind nicht im Paketpreis enthalten.',
          popular: false,
          ctaLabel: 'Jetzt anfragen',
        },
        {
          badge: '',
          name: 'Premium Paket',
          subtitle: 'Perfekt für große Veranstaltungen ab 200 Personen',
          features: [
            'Große professionelle Soundanlage',
            'Professionelle Lichttechnik',
            'Zusammenarbeit mit Showtechnik-Partnern',
            'Vorgespräch & Musikwünsche',
            'Aufbau und Abbau inklusive',
            'Funkmikrofone',
            'Persönliche Musikplanung',
            'Nebelmaschine & Showeffekte',
          ],
          note: '',
          popular: false,
          ctaLabel: 'Jetzt anfragen',
        },
        {
          badge: '',
          name: 'Club Paket',
          subtitle: 'Für Club-Auftritte und Nacht-Events',
          features: [
            'DJ-Service nach Anfrage',
            'Open Format',
            'Eigene Set Vorbereitung',
            'Exklusive Übergänge & Mashups',
            'Energieaufbau während des Abends',
            'Event Promotion',
          ],
          note: 'Keine eigene Technik. Nutzung der vorhandenen Clubtechnik.',
          popular: false,
          ctaLabel: 'Jetzt anfragen',
        },
      ],
    };
    await db.execute({
      sql: `INSERT INTO blocks (page, type, sort_order, visible, locked, config) VALUES ('home', 'pricing-cards', 3, 1, 0, ?)`,
      args: [JSON.stringify(pricingConfig)],
    });
  }

  const existingServices = await db.execute(`SELECT COUNT(*) as cnt FROM blocks WHERE page = 'home' AND type = 'service-cards'`);
  if ((existingServices.rows[0][0] as number) === 0) {
    const serviceConfig = {
      eyebrow: 'Services',
      title: { prefix: 'Ich bin Dein DJ für', highlight: 'Dein Event', suffix: '' },
      lead: 'Vom Geburtstag über Firmenevents bis zur Clubnacht: Ich sorge mit individuell abgestimmten Sets für die Musik, die zu deinem Event und deinen Gästen passt.',
      items: [
        { categoryLabel: 'Hochzeiten', artVariant: 'wedding', title: 'Hochzeiten', body: 'Eure Hochzeit verdient den richtigen Sound für jeden Moment. Vom stilvollen Empfang über den Hochzeitstanz bis zur ausgelassenen Party begleite ich euren besonderen Tag musikalisch mit viel Gespür für Stimmung, Gäste und den perfekten Zeitpunkt für den nächsten Song.' },
        { categoryLabel: 'Firmenevents', artVariant: 'event', title: 'Firmenevents', body: 'Die richtige Musik macht den Unterschied. Mit Gefühl für Rhythmus, einem Gespür für Menschen und der Fähigkeit, die Stimmung zu lesen, entsteht eine Atmosphäre, die zu eurem Event passt. Professionell, flexibel und immer abgestimmt auf Anlass und Publikum.' },
        { categoryLabel: 'Geburtstage', artVariant: 'bday', title: 'Geburtstage & private Feiern', body: 'Bei Geburtstagen und privaten Feiern sorge ich als DJ für die passende Stimmung. Vom entspannten Start bis zur vollen Tanzfläche. Mit aktuellen Charts, zeitlosen Klassikern und mitreißenden Partyhits entsteht ein Musikmix, der zu deinen Gästen und deinem Anlass passt.' },
        { categoryLabel: 'Öffentliche Events', artVariant: 'public', title: 'Öffentliche Veranstaltungen', body: 'Ob Stadtfest, Vereinsfeier, Ball oder öffentliche Veranstaltung — die Musik entscheidet mit über die Stimmung. Mit einem vielseitigen Mix, sicherem Gespür für das Publikum und der passenden Energie begleite ich Veranstaltungen jeder Größe und bringe Menschen auf die Tanzfläche.' },
        { categoryLabel: 'Club Auftritte', artVariant: 'club', title: 'Club-Auftritte', body: 'Wenn der erste Beat einsetzt, beginnt die Nacht erst richtig. Mit energiegeladenen Sets, treibenden Sounds und dem richtigen Gespür für den Dancefloor sorge ich für volle Tanzflächen und Nächte, die in Erinnerung bleiben.' },
      ],
    };
    await db.execute({
      sql: `INSERT INTO blocks (page, type, sort_order, visible, locked, config) VALUES ('home', 'service-cards', 3, 1, 0, ?)`,
      args: [JSON.stringify(serviceConfig)],
    });
  }

  const existingQualities = await db.execute(`SELECT COUNT(*) as cnt FROM blocks WHERE page = 'home' AND type = 'quality-grid'`);
  if ((existingQualities.rows[0][0] as number) === 0) {
    const qualityConfig = {
      eyebrow: 'Was macht Raphael besonders?',
      title: { prefix: 'Der erste Eindruck ist', highlight: 'das Wichtigste.', suffix: '' },
      items: [
        { icon: 'clipboard', title: 'Professionelle Vorbereitung', body: 'Jedes Event wird individuell geplant, damit Musik, Ablauf und Stimmung perfekt zusammenpassen.' },
        { icon: 'pulse', title: 'Gespür für Stimmung', body: 'Die richtige Musik läuft genau im passenden Moment und sorgt für eine volle Tanzfläche.' },
        { icon: 'music', title: 'Individuelle Musikauswahl', body: 'Die Musik wird passend zu Gästen, Altersgruppe und Art des Events ausgewählt.' },
        { icon: 'clock', title: 'Zuverlässigkeit', body: 'Pünktlichkeit, Organisation und professionelles Arbeiten sorgen für einen entspannten Abend.' },
        { icon: 'signal', title: 'Hochwertige Technik', body: 'Professionelle Technik sorgt für sauberen Klang, starke Stimmung und reibungslosen Ablauf.' },
        { icon: 'heart', title: 'Leidenschaft für Musik', body: 'Musik ist für mich mehr als Arbeit — meine Leidenschaft steckt dahinter und macht jedes Event einzigartig.' },
      ],
    };
    await db.execute({
      sql: `INSERT INTO blocks (page, type, sort_order, visible, locked, config) VALUES ('home', 'quality-grid', 4, 1, 0, ?)`,
      args: [JSON.stringify(qualityConfig)],
    });
  }

  // One-time fixup: pricing-cards was seeded at sort_order 0/3 before other blocks existed.
  await db.execute(`UPDATE blocks SET sort_order = 5 WHERE page = 'home' AND type = 'pricing-cards' AND sort_order IN (0, 3, 4)`);

  await db.execute(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    author TEXT NOT NULL,
    role TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    rating INTEGER DEFAULT 5
  )`);

  // Migration for tables created before the rating column existed
  try {
    await db.execute(`ALTER TABLE reviews ADD COLUMN rating INTEGER DEFAULT 5`);
  } catch {
    // column already exists
  }

  // Seed one default review if table is empty
  const existing = await db.execute(`SELECT COUNT(*) as cnt FROM reviews`);
  if ((existing.rows[0][0] as number) === 0) {
    await db.execute({
      sql: `INSERT INTO reviews (text, author, role, sort_order, rating) VALUES (?, ?, ?, ?, ?)`,
      args: [
        "Wir sind sehr zufrieden mit DJ Raphael Taxer (RAPHX)! Er ist unser DJ im Tanzlokal Senita's Treff in Feffernitz und sorgt jedes Mal für eine großartige Stimmung. Die Musikauswahl ist immer hervorragend und perfekt auf unsere Gäste abgestimmt. Wir empfehlen ihn sehr gerne weiter.",
        'Senita Vejzovic',
        "Inhaberin des Lokals Senita's Treff in Feffernitz",
        0,
        5,
      ],
    });
  }

  // Default calendar events
  const defaultEvents: [string, string][] = [
    ['2026-03-28', "Disco Hits & Schlager Party – Senita's Treff"],
    ['2026-04-18', "Bravo Hits Party – Senita's Treff"],
    ['2026-05-09', "Single's Party – Senita's Treff"],
    ['2026-05-15', 'Tanzkurs Zechgemeinschaft Feffernitz'],
    ['2026-05-16', "Bravo Hits Party 2.0 – Senita's Treff"],
    ['2026-05-24', 'Privat ausgebucht'],
    ['2026-06-06', "DJ Night – Senita's Treff"],
    ['2026-07-03', 'Feffernitzer Jahreskirchtag'],
    ['2026-07-18', 'Privat ausgebucht'],
    ['2026-07-25', 'Privat ausgebucht'],
    ['2026-08-15', "10 Jahre Senita – Senita's Treff"],
    ['2026-09-12', 'Privat ausgebucht'],
    ['2026-10-03', "Event im Senita's Treff"],
    ['2026-10-17', "Event im Senita's Treff"],
    ['2026-10-24', 'Privat ausgebucht'],
    ['2026-10-30', 'Privat ausgebucht'],
    ['2026-11-07', "Event im Senita's Treff"],
    ['2026-11-14', "Event im Senita's Treff"],
    ['2026-11-21', 'Privat ausgebucht'],
    ['2026-11-28', 'Privat ausgebucht'],
    ['2026-12-12', "Event im Senita's Treff"],
    ['2026-12-25', "Xmas Party – Senita's Treff"],
    ['2026-12-26', 'Privat ausgebucht'],
    ['2026-12-31', 'Privat ausgebucht'],
  ];

  for (const [date, title] of defaultEvents) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO calendar_events (date, title) VALUES (?, ?)`,
      args: [date, title],
    });
  }

  // Default CMS content
  const defaultContent: [string, string][] = [
    ['hero_title', 'Dein DJ für stilvolle & unvergessliche Events'],
    ['hero_subtitle', 'Professioneller DJ für Hochzeiten, Geburtstage, Firmenevents, Öffentliche Veranstaltungen und Club-Auftritte — in Kärnten und Umgebung.'],
    ['hero_quote', '"Unvergessliche Nächte, beste Unterhaltung und volle Tanzflächen garantiert."'],
    ['hero_stats_events', '120+'],
    ['hero_stats_genres', '100%'],
    ['hero_stats_available', '<24h'],
    ['about_text1', 'Musik begleitet mich bereits seit meiner Kindheit und war für mich schon immer mehr als nur Unterhaltung. Schon früh entwickelte ich eine große Leidenschaft für verschiedene Musikrichtungen und brachte mir später selbst Instrumente wie Klavier und Gitarre bei. Dabei wurde mir bewusst, welche Kraft Musik besitzt und wie sehr sie Menschen verbinden kann.'],
    ['about_text2', 'Mein beruflicher Weg führte mich zunächst in die Elektrotechnik. Mit der Zeit merkte ich jedoch, dass mich dieser Beruf allein nicht vollständig erfüllt. Im Jahr 2026 gründete ich schließlich mein Kleinunternehmen — meine Leidenschaft zum Beruf.'],
    ['review_text', 'Wir sind sehr zufrieden mit DJ Raphael Taxer (RAPHX)! Er ist unser DJ im Tanzlokal Senita\'s Treff in Feffernitz und sorgt jedes Mal für eine großartige Stimmung. Die Musikauswahl ist immer hervorragend und perfekt auf unsere Gäste abgestimmt. Wir empfehlen ihn sehr gerne weiter.'],
    ['review_author', 'Senita Vejzovic'],
    ['review_role', "Inhaberin des Lokals Senita's Treff in Feffernitz"],
    ['contact_email', 'dj.raphx@icloud.com'],
    ['contact_phone', '+43 660 5459207'],
    ['contact_address', 'Lina-Domenig Straße 118\n9710 Feffernitz, Österreich'],
    ['contact_hours', 'Mo – Fr: 7:30 – 18:30 Uhr'],
    ['feat1_title', 'Angepasste Musikgestaltung'],
    ['feat1_body', 'Jedes Event ist einzigartig. Raphael geht auf eure persönlichen Wünsche ein und sorgt mit dem perfekten Musikmix für die perfekte Stimmung.'],
    ['feat2_title', 'Professionelle Planung & Ausführung'],
    ['feat2_body', 'Raphael ist zuverlässig und stets arrangiert — von der ersten Besprechung bis zum letzten Song. Er bereitet sich optimal auf das Event vor und setzt alles reibungslos um.'],
    ['feat3_title', 'Unvergessliche Abende & echte Emotionen'],
    ['feat3_body', 'Mit den mitreißendsten Partyhits, den größten Klassikern und euren persönlichen Musikwünschen schafft er die perfekte Atmosphäre für ein einzigartiges Erlebnis.'],
    ['why_quote', '"Ohne die richtige Musik ist eine Veranstaltung einfach nicht das Wahre."'],
    ['why_text1', 'Du planst ein Event, bei dem alles perfekt geplant und umgesetzt ist. Der entscheidende Punkt dabei ist die Musik. Reicht eine Playlist wirklich aus? Wer kümmert sich um die Musik während der Feier? Was passiert bei technischen Problemen oder spontanen Änderungen im Ablauf?'],
    ['why_text2', 'Eine Band oder Blaskapelle ist oft sehr teuer und sprengt schnell das Budget. Eine selbst erstellte Playlist wirkt zuerst wie eine einfache Lösung — doch wer geht auf die Gäste ein? Die beste Lösung ist ein professioneller und flexibler DJ.'],
    ['marquee_text', 'Feiern beginnt mit der richtigen Musik · Erinnerungen fürs Leben statt gewöhnlicher Abende · Emotionen, die bleiben. Musik, die verbindet · Mehr Stimmung. Mehr Emotion. Mehr Party · Nicht einfach feiern – erleben · Eure Nacht. Eure Musik. Eure Erinnerungen ·'],
  ];

  for (const [key, value] of defaultContent) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO cms_content (key, value) VALUES (?, ?)`,
      args: [key, value],
    });
  }
}

export async function dbRun(sql: string, args: (string | number | null | Uint8Array)[] = []): Promise<{ lastInsertRowid: number | bigint; rowsAffected: number }> {
  await ensureInit();
  const result = await getDb().execute({ sql, args });
  return { lastInsertRowid: result.lastInsertRowid ?? 0, rowsAffected: result.rowsAffected };
}

export async function dbGet<T>(sql: string, args: (string | number | null)[] = []): Promise<T | undefined> {
  await ensureInit();
  const result = await getDb().execute({ sql, args });
  if (result.rows.length === 0) return undefined;
  return Object.fromEntries(
    result.columns.map((col, i) => [col, result.rows[0][i]])
  ) as T;
}

export async function dbAll<T>(sql: string, args: (string | number | null)[] = []): Promise<T[]> {
  await ensureInit();
  const result = await getDb().execute({ sql, args });
  return result.rows.map(row =>
    Object.fromEntries(result.columns.map((col, i) => [col, row[i]])) as T
  );
}
