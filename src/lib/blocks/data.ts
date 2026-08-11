import { dbAll, dbGet, dbRun } from '@/lib/db';

export interface BlockRow {
  id: number;
  page: string;
  type: string;
  sort_order: number;
  visible: number;
  locked: number;
  config: string;
}

export async function getBlocks(page = 'home'): Promise<BlockRow[]> {
  return dbAll<BlockRow>(
    `SELECT id, page, type, sort_order, visible, locked, config FROM blocks WHERE page = ? ORDER BY sort_order ASC, id ASC`,
    [page]
  );
}

export async function getBlock(id: number): Promise<BlockRow | undefined> {
  return dbGet<BlockRow>(`SELECT id, page, type, sort_order, visible, locked, config FROM blocks WHERE id = ?`, [id]);
}

export async function updateBlockConfig(id: number, config: unknown): Promise<void> {
  await dbRun(`UPDATE blocks SET config = ?, updated_at = datetime('now') WHERE id = ?`, [JSON.stringify(config), id]);
}
