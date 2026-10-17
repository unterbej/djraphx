import { notFound } from 'next/navigation';

// Unbekannte /v2/-Pfade zeigen die v2-eigene 404-Seite (mit v2-Layout).
export default function CatchAll() {
  notFound();
}
