import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { dbAll, dbRun } from '@/lib/db';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }
  const events = await dbAll<{ id: number; date: string; title: string }>(
    `SELECT id, date, title FROM calendar_events ORDER BY date ASC`
  );
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }
  const { date, title } = await req.json();
  if (!date || !title) {
    return NextResponse.json({ error: 'Datum und Titel erforderlich' }, { status: 400 });
  }
  try {
    const result = await dbRun(
      `INSERT INTO calendar_events (date, title) VALUES (?, ?)`,
      [date, title]
    );
    return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
  } catch {
    return NextResponse.json({ error: 'Datum bereits vorhanden' }, { status: 409 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }
  const { id, date, title } = await req.json();
  await dbRun(`UPDATE calendar_events SET date = ?, title = ? WHERE id = ?`, [date, title, id]);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }
  const { id } = await req.json();
  await dbRun(`DELETE FROM calendar_events WHERE id = ?`, [id]);
  return NextResponse.json({ success: true });
}
