import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { getBlocks } from '@/lib/blocks/data';

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const blocks = await getBlocks('home');
  return NextResponse.json(blocks);
}
