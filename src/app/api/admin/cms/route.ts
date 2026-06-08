import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth';
import { getCmsContent, updateCmsContent } from '@/lib/cms';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }
  const content = await getCmsContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }
  const updates: Record<string, string> = await req.json();
  for (const [key, value] of Object.entries(updates)) {
    await updateCmsContent(key, value);
  }
  return NextResponse.json({ success: true });
}
