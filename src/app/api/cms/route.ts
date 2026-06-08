import { NextResponse } from 'next/server';
import { getCmsContent } from '@/lib/cms';

export async function GET() {
  try {
    const content = await getCmsContent();
    return NextResponse.json(content);
  } catch (err) {
    console.error('CMS error:', err);
    return NextResponse.json({}, { status: 500 });
  }
}
