import { NextResponse } from 'next/server';
import { dbAll } from '@/lib/db';

export async function GET() {
  const items = await dbAll<{ id: number; filename: string; caption: string; sort_order: number }>(
    `SELECT id, filename, caption, sort_order FROM gallery ORDER BY sort_order ASC, id ASC`
  );
  return NextResponse.json(items.map(i => ({ id: i.id, url: `/api/uploads/${i.filename}`, caption: i.caption })));
}
