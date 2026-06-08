import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { dbAll, dbRun } from '@/lib/db';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }
  const bookings = await dbAll<{
    id: number;
    name: string;
    email: string;
    phone: string;
    event_date: string;
    event_type: string;
    message: string;
    status: string;
    created_at: string;
    notes: string;
  }>(`SELECT * FROM bookings ORDER BY created_at DESC`);
  return NextResponse.json(bookings);
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }
  const { id, status, notes } = await req.json();
  await dbRun(`UPDATE bookings SET status = ?, notes = ? WHERE id = ?`, [status, notes, id]);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }
  const { id } = await req.json();
  await dbRun(`DELETE FROM bookings WHERE id = ?`, [id]);
  return NextResponse.json({ success: true });
}
