import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getUploadsDir, isSafeUploadName } from '@/lib/uploads';

const MIME: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
};

export async function GET(_req: NextRequest, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  if (!isSafeUploadName(name)) return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 });

  try {
    const data = await fs.readFile(path.join(getUploadsDir(), name));
    return new NextResponse(new Uint8Array(data), {
      headers: {
        'Content-Type': MIME[path.extname(name).toLowerCase()] || 'application/octet-stream',
        // Filenames are unique per upload, so content never changes for a given URL.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 });
  }
}
