import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { getBlock, updateBlockConfig } from '@/lib/blocks/data';

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const { id } = await ctx.params;
  const block = await getBlock(Number(id));
  if (!block) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 });

  const { config } = await req.json();
  if (config === undefined) return NextResponse.json({ error: 'config erforderlich' }, { status: 400 });

  await updateBlockConfig(Number(id), config);
  return NextResponse.json({ success: true });
}
