import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import crypto from 'crypto';
import { isAdminAuthenticated } from '@/lib/auth';
import { dbAll, dbRun } from '@/lib/db';

const MAX_FILE_BYTES = 20 * 1024 * 1024;

export async function GET() {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const items = await dbAll<{ id: number; filename: string; caption: string; sort_order: number }>(
    `SELECT id, filename, caption, sort_order FROM gallery ORDER BY sort_order ASC, id ASC`
  );
  return NextResponse.json(items.map(i => ({ ...i, url: `/api/uploads/${i.filename}` })));
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });

  const formData = await req.formData();
  const files = formData.getAll('files').filter((f): f is File => f instanceof File);
  const caption = (formData.get('caption') as string) || '';
  if (files.length === 0) return NextResponse.json({ error: 'Keine Dateien erhalten' }, { status: 400 });

  const created: { id: number; filename: string }[] = [];

  for (const file of files) {
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: `"${file.name}" ist kein Bild.` }, { status: 400 });
    }
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: `"${file.name}" ist zu groß (max. 20 MB).` }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let processed: Buffer;
    try {
      processed = await sharp(buffer)
        .rotate()
        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
    } catch {
      return NextResponse.json({ error: `"${file.name}" konnte nicht verarbeitet werden.` }, { status: 400 });
    }

    // Image bytes live in the database — the deployment filesystem (Vercel) is read-only.
    const filename = `g_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.webp`;
    const result = await dbRun(
      `INSERT INTO gallery (filename, caption, sort_order, data) VALUES (?, ?, (SELECT COALESCE(MAX(sort_order)+1,0) FROM gallery), ?)`,
      [filename, caption, new Uint8Array(processed)]
    );
    created.push({ id: Number(result.lastInsertRowid), filename });
  }

  return NextResponse.json({ success: true, created });
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const { id, caption, sort_order } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID erforderlich' }, { status: 400 });
  await dbRun(`UPDATE gallery SET caption=?, sort_order=? WHERE id=?`, [caption ?? '', sort_order ?? 0, id]);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: 'ID erforderlich' }, { status: 400 });
  await dbRun(`DELETE FROM gallery WHERE id=?`, [id]);
  return NextResponse.json({ success: true });
}
