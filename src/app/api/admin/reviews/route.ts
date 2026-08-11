import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { dbAll, dbRun } from '@/lib/db';

function clampRating(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 5;
  return Math.min(5, Math.max(1, Math.round(n)));
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const reviews = await dbAll<{
    id: number; text: string; author: string; role: string; image_url: string; sort_order: number; rating: number;
  }>(`SELECT id, text, author, role, image_url, sort_order, rating FROM reviews ORDER BY sort_order ASC, id ASC`);
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const { text, author, role, image_url, rating } = await req.json();
  if (!text || !author) return NextResponse.json({ error: 'Text und Name erforderlich' }, { status: 400 });
  const result = await dbRun(
    `INSERT INTO reviews (text, author, role, image_url, sort_order, rating) VALUES (?, ?, ?, ?, (SELECT COALESCE(MAX(sort_order)+1,0) FROM reviews), ?)`,
    [text, author, role || '', image_url || '', clampRating(rating)]
  );
  return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const { id, text, author, role, image_url, sort_order, rating } = await req.json();
  await dbRun(
    `UPDATE reviews SET text=?, author=?, role=?, image_url=?, sort_order=?, rating=? WHERE id=?`,
    [text, author, role || '', image_url || '', sort_order ?? 0, clampRating(rating), id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const { id } = await req.json();
  await dbRun(`DELETE FROM reviews WHERE id=?`, [id]);
  return NextResponse.json({ success: true });
}
