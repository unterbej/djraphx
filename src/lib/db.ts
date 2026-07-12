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
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  await db.execute(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    author TEXT NOT NULL,
    role TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  )`);

  // Seed one default review if table is empty
  const existing = await db.execute(`SELECT COUNT(*) as cnt FROM reviews`);
  if ((existing.rows[0][0] as number) === 0) {
    await db.execute({
      sql: `INSERT INTO reviews (text, author, role, sort_order) VALUES (?, ?, ?, ?)`,
      args: [
        "Wir sind sehr zufrieden mit DJ Raphael Taxer (RAPHX)! Er ist unser DJ im Tanzlokal Senita's Treff in Feffernitz und sorgt jedes Mal für eine großartige Stimmung. Die Musikauswahl ist immer hervorragend und perfekt auf unsere Gäste abgestimmt. Wir empfehlen ihn sehr gerne weiter.",
        'Senita Vejzovic',
        "Inhaberin des Lokals Senita's Treff in Feffernitz",
        0,
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
    ['hero_subtitle', 'Professioneller DJ für Geburtstage, Firmenevents, Öffentliche Veranstaltungen und Club-Auftritte — in Kärnten und Umgebung.'],
    ['hero_quote', '"Unvergessliche Nächte, beste Unterhaltung und volle Tanzflächen garantiert."'],
    ['hero_stats_events', '120+'],
    ['hero_stats_genres', '8'],
    ['hero_stats_available', '24/7'],
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

export async function dbRun(sql: string, args: (string | number | null)[] = []): Promise<{ lastInsertRowid: number | bigint; rowsAffected: number }> {
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
