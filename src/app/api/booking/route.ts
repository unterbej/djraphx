import { NextRequest, NextResponse } from 'next/server';
import { dbRun, dbGet } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, eventDate, eventType, message } = body;

    if (!name || !email || !eventDate || !eventType) {
      return NextResponse.json({ error: 'Fehlende Pflichtfelder' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail' }, { status: 400 });
    }

    const dateObj = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateObj < today) {
      return NextResponse.json({ error: 'Datum muss in der Zukunft liegen' }, { status: 400 });
    }

    // Check if date is already booked
    const existing = await dbGet<{ id: number }>(
      `SELECT id FROM calendar_events WHERE date = ?`,
      [eventDate]
    );
    if (existing) {
      return NextResponse.json({ error: 'Dieser Termin ist bereits ausgebucht' }, { status: 409 });
    }

    const result = await dbRun(
      `INSERT INTO bookings (name, email, phone, event_date, event_type, message) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, phone || '', eventDate, eventType, message || '']
    );

    return NextResponse.json({ success: true, id: Number(result.lastInsertRowid) });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: 'Serverfehler' }, { status: 500 });
  }
}
