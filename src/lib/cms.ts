import { dbAll, dbRun } from './db';

export interface CmsContent {
  [key: string]: string;
}

export async function getCmsContent(): Promise<CmsContent> {
  const rows = await dbAll<{ key: string; value: string }>(`SELECT key, value FROM cms_content`);
  const content: CmsContent = {};
  for (const row of rows) {
    content[row.key] = row.value;
  }
  return content;
}

export async function updateCmsContent(key: string, value: string): Promise<void> {
  await dbRun(
    `INSERT INTO cms_content (key, value, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
    [key, value]
  );
}
