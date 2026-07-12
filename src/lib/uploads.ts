import fs from 'fs';
import path from 'path';

export function getUploadsDir(): string {
  const dir = path.join(process.cwd(), 'data', 'uploads');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// Only plain filenames we generated ourselves — no paths, no traversal.
export function isSafeUploadName(name: string): boolean {
  return /^[A-Za-z0-9_-]+\.(webp|jpg|jpeg|png|gif)$/i.test(name);
}
