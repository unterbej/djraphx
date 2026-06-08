import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { dbRun, dbGet } from './db';
import crypto from 'crypto';

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('raphx2026admin', 10);

export async function verifyPassword(password: string): Promise<boolean> {
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export async function createSession(): Promise<string> {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  await dbRun(
    `INSERT INTO admin_sessions (id, expires_at) VALUES (?, ?)`,
    [sessionId, expiresAt]
  );
  return sessionId;
}

export async function validateSession(sessionId: string): Promise<boolean> {
  const session = await dbGet<{ id: string; expires_at: string }>(
    `SELECT id, expires_at FROM admin_sessions WHERE id = ?`,
    [sessionId]
  );
  if (!session) return false;
  if (new Date(session.expires_at) < new Date()) {
    await dbRun(`DELETE FROM admin_sessions WHERE id = ?`, [sessionId]);
    return false;
  }
  return true;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await dbRun(`DELETE FROM admin_sessions WHERE id = ?`, [sessionId]);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('admin_session')?.value;
  if (!sessionId) return false;
  return validateSession(sessionId);
}
