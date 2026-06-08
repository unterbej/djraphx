import { NextResponse } from 'next/server';
import { dbAll } from '@/lib/db';

export async function GET() {
  try {
    const events = await dbAll<{ date: string; title: string }>(
      `SELECT date, title FROM calendar_events ORDER BY date ASC`
    );
    const eventsMap: Record<string, string> = {};
    for (const e of events) {
      eventsMap[e.date] = e.title;
    }
    return NextResponse.json(eventsMap);
  } catch (err) {
    console.error('Calendar error:', err);
    return NextResponse.json({}, { status: 500 });
  }
}
