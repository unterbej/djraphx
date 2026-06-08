import { NextResponse } from 'next/server';
import { dbAll } from '@/lib/db';

export async function GET() {
  const reviews = await dbAll<{
    id: number; text: string; author: string; role: string; image_url: string; sort_order: number;
  }>(`SELECT id, text, author, role, image_url, sort_order FROM reviews ORDER BY sort_order ASC, id ASC`);
  return NextResponse.json(reviews);
}
