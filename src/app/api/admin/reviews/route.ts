import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { dbAll, dbRun } from '@/lib/db';

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const reviews = await dbAll<{
    id: number; text: string; author: string; role: string; image_url: string; sort_order: number;
  }>(`SELECT id, text, author, role, image_url, sort_order FROM reviews ORDER BY sort_order ASC, id ASC`);
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const { text, author, role, image_url } = await req.json();
  if (!text || !author) return NextResponse.json({ error: 'Text und Name erforderlich' }, { status: 400 });
  const result = await dbRun(
    `INSERT INTO reviews (text, author, role, image_url, sort_order) VALUES (?, ?, ?, ?, (SELECT COALESCE(MAX(sort_order)+1,0) FROM reviews))`,
    [text, author, role || '', image_url || '']
  );
  return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const { id, text, author, role, image_url, sort_order } = await req.json();
  await dbRun(
    `UPDATE reviews SET text=?, author=?, role=?, image_url=?, sort_order=? WHERE id=?`,
    [text, author, role || '', image_url || '', sort_order ?? 0, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const { id } = await req.json();
  await dbRun(`DELETE FROM reviews WHERE id=?`, [id]);
  return NextResponse.json({ success: true });
}
