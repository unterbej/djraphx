import { NextRequest, NextResponse } from 'next/server';
import { dbGet } from '@/lib/db';

export async function GET(_req: NextRequest, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  if (!/^[A-Za-z0-9_-]+\.webp$/.test(name)) {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 });
  }

  const row = await dbGet<{ data: ArrayBuffer | Uint8Array | null }>(
    `SELECT data FROM gallery WHERE filename = ?`,
    [name]
  );
  if (!row?.data) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 });

  const bytes = row.data instanceof Uint8Array ? row.data : new Uint8Array(row.data);
  const body = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'image/webp',
      // Filenames are unique per upload, so content never changes for a given URL.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
